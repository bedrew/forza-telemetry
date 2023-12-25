import http from 'http'
import { WebSocketServer } from 'ws'
import { FORZA_DATA_OUT_PORT, ForzaProvider } from './Forza/Provider/ForzaProvider'
import { ForzaData } from './Forza/Entity/ForzaData'

class Application {

    public clients: {[id: number]: WebSocket } = {}
    public server = http.createServer()
    public wsServer = new WebSocketServer({ server: this.server })

    public publish(data: string) {
        for (const userId in this.clients) {
            const client = this.clients[userId]
            if (client.readyState === 1) {
                client.send(JSON.stringify(data))
            }
        }
    }

    public constructor({ port }: {port: number}) {
        this.server.listen(port, () => {
            console.log(`WebSocket server is running on port ${port}`)
        })
        this.wsServer.on('connection', (connection) =>
            this.clients[new Date().getTime()] = connection as any,
        )
        new ForzaProvider({
            port: FORZA_DATA_OUT_PORT,
            host: 'localhost',
            callback: (data:ForzaData)=> {
                console.log(data.IsRaceOn())
                if (data.IsRaceOn()) {
                    this.publish(JSON.stringify(data.toJSON()))
                }
            },
        })
    }
}

new Application({ port: 8000 })