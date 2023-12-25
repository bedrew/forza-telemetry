import http from 'http'
import { WebSocketServer } from 'ws'
import { FORZA_DATA_OUT_PORT, ForzaProvider } from './Forza/Provider/ForzaProvider'
import { ForzaData } from './Forza/Entity/ForzaData'
import Express from 'express'
import path from 'path'
import { networkInterfaces } from 'os'


class Application {

    public clients: {[id: number]: any } = {}
    public server = http.createServer()
    public wsServer = new WebSocketServer({ server: this.server })
    public express = Express()

    public publish(data: string) {
        for (const userId in this.clients) {
            const client = this.clients[userId]
            if (client.readyState === 1) {
                client.send(JSON.stringify(data))
            }
        }
    }

    public async localip() {
        const nets = networkInterfaces()
        const ipAdrr = [] // Or just '{}', an empty object
        for (const name of Object.keys(nets)) {
            const hardware = nets[name]
            if (!hardware) {
                continue
            }
            for (const net of hardware) {
                // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
                // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
                const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
                if (net.family === familyV4Value && !net.internal) {
                    ipAdrr.push(net.address)
                }
            }
        }
        const result: string[] = []
        for (const item of ipAdrr) {
            result.push(`http://${item}:${this.settings.webServerPort}`)
        }
        return result
    }

    public constructor(
        protected settings: { webSocketPort: number, webServerPort: number },
    ) {
        this.express.use(Express.static('client'))
        this.express.get('*', (req, res) => {
            res.sendFile(path.resolve(path.join('./', 'client', 'index.html')))
        })
        this.express.listen(this.settings.webServerPort, async () => {
            console.log('Hello!')
            console.log('Telemetry runs on this addresses')
            for (const item of await this.localip()) {
                console.log(item)
            }
        })
        this.server.listen(this.settings.webSocketPort)
        this.wsServer.on('connection', (connection) =>
            this.clients[new Date().getTime()] = connection as any,
        )
        new ForzaProvider({
            port: FORZA_DATA_OUT_PORT,
            host: 'localhost',
            callback: (data:ForzaData)=> {
                if (data.IsRaceOn()) {
                    this.publish(JSON.stringify(data.toJSON()))
                }
            },
        })
    }
}

new Application({ webSocketPort: 8000, webServerPort: 7000 })