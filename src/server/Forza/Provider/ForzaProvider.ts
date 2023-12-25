import dgram from 'node:dgram'
import { ForzaData } from '../Entity/ForzaData'

export const FORZA_DATA_OUT_PORT = 5300
export const FORZA_HOST_PORT = 5200

export class ForzaProvider {

    public udp = dgram.createSocket('udp4')

    public constructor(
        { port, host, callback }: { port: number, host: string, callback: (msg: ForzaData, rinfo: any) => void },
    ) {
        this.udp.on('error', (err) => {
            console.error(`server error:\n${err.stack}`)
            this.udp.close()
        })
        this.udp.on('message', (msg, rinfo) => {
            if (!this.checkConfig(msg.length)) {
                console.log('check forza setup')
                return
            }
            callback(new ForzaData(msg), rinfo)
        })
        this.udp.bind(port, host)
    }

    public checkConfig(bufferLength:number) {
        switch (bufferLength) {
            case 232: // FM7 sled
                return false
            case 311: // FM7 dash
                return true
            case 324: // FH4
                return true
            case 331: // FM8 dash
                return true
            default:
                return false
        }
    }

}
