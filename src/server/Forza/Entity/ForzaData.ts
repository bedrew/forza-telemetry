import { DataParser } from '../Data/DataParser'

const SLED_PACKET_LENGTH = 232 // FM7
const DASH_PACKET_LENGTH = 311 // FM7
const FH4_PACKET_LENGTH = 324 // FH4
const FM8_PACKET_LENGTH = 331 // FM8

export class ForzaData {

    public data: Buffer

    public constructor(data: Buffer) {
        this.data = data
    }

    public get bufferOffset() {
        switch (this.data.length) {
            case SLED_PACKET_LENGTH: // FM7 sled
                return 0
            case DASH_PACKET_LENGTH: // FM7 dash
                return 0
            case FH4_PACKET_LENGTH: // FH4
                return 12
            case FM8_PACKET_LENGTH: // FM8 dash
                return 0
            default:
                return 0
        }
    }

    public toJSON() {
        const result:any = {}
        for (const key in this) {
            if (![ 'data', 'bufferOffset', 'constructor', 'constructor', 'toJSON' ].includes(key)) {
                result[key] = (this as any)[key]()
            }
        }
        return result
    }

    // sled
    public IsRaceOn() {
        return DataParser.GetSingle(this.data, 0) > 0
    }
    public TimestampMs() { return DataParser.GetUInt32(this.data, 4) }
    public EngineMaxRpm() { return DataParser.GetSingle(this.data, 8) }
    public EngineIdleRpm() { return DataParser.GetSingle(this.data, 12) }
    public CurrentEngineRpm() { return DataParser.GetSingle(this.data, 16) }
    public AccelerationX() { return DataParser.GetSingle(this.data, 20) }
    public AccelerationY() { return DataParser.GetSingle(this.data, 24) }
    public AccelerationZ() { return DataParser.GetSingle(this.data, 28) }
    public VelocityX() { return DataParser.GetSingle(this.data, 32) }
    public VelocityY() { return DataParser.GetSingle(this.data, 36) }
    public VelocityZ() { return DataParser.GetSingle(this.data, 40) }
    public AngularVelocityX() { return DataParser.GetSingle(this.data, 44) }
    public AngularVelocityY() { return DataParser.GetSingle(this.data, 48) }
    public AngularVelocityZ() { return DataParser.GetSingle(this.data, 52) }
    public Yaw() { return DataParser.GetSingle(this.data, 56) }
    public Pitch() { return DataParser.GetSingle(this.data, 60) }
    public Roll() { return DataParser.GetSingle(this.data, 64) }
    public NormSuspensionTravelFl() { return DataParser.GetSingle(this.data, 68) }
    public NormSuspensionTravelFr() { return DataParser.GetSingle(this.data, 72) }
    public NormSuspensionTravelRl() { return DataParser.GetSingle(this.data, 76) }
    public NormSuspensionTravelRr() { return DataParser.GetSingle(this.data, 80) }
    public TireSlipRatioFl() { return DataParser.GetSingle(this.data, 84) }
    public TireSlipRatioFr() { return DataParser.GetSingle(this.data, 88) }
    public TireSlipRatioRl() { return DataParser.GetSingle(this.data, 92) }
    public TireSlipRatioRr() { return DataParser.GetSingle(this.data, 96) }
    public WheelRotationSpeedFl() { return DataParser.GetSingle(this.data, 100) }
    public WheelRotationSpeedFr() { return DataParser.GetSingle(this.data, 104) }
    public WheelRotationSpeedRl() { return DataParser.GetSingle(this.data, 108) }
    public WheelRotationSpeedRr() { return DataParser.GetSingle(this.data, 112) }
    public WheelOnRumbleStripFl() { return DataParser.GetSingle(this.data, 116) }
    public WheelOnRumbleStripFr() { return DataParser.GetSingle(this.data, 120) }
    public WheelOnRumbleStripRl() { return DataParser.GetSingle(this.data, 124) }
    public WheelOnRumbleStripRr() { return DataParser.GetSingle(this.data, 128) }
    public WheelInPuddleFl() { return DataParser.GetSingle(this.data, 132) }
    public WheelInPuddleFr() { return DataParser.GetSingle(this.data, 136) }
    public WheelInPuddleRl() { return DataParser.GetSingle(this.data, 140) }
    public WheelInPuddleRr() { return DataParser.GetSingle(this.data, 144) }
    public SurfaceRumbleFl() { return DataParser.GetSingle(this.data, 148) }
    public SurfaceRumbleFr() { return DataParser.GetSingle(this.data, 152) }
    public SurfaceRumbleRl() { return DataParser.GetSingle(this.data, 156) }
    public SurfaceRumbleRr() { return DataParser.GetSingle(this.data, 160) }
    public TireSlipAngleFl() { return DataParser.GetSingle(this.data, 164) }
    public TireSlipAngleFr() { return DataParser.GetSingle(this.data, 168) }
    public TireSlipAngleRl() { return DataParser.GetSingle(this.data, 172) }
    public TireSlipAngleRr() { return DataParser.GetSingle(this.data, 176) }
    public TireCombinedSlipFl() { return DataParser.GetSingle(this.data, 180) }
    public TireCombinedSlipFr() { return DataParser.GetSingle(this.data, 184) }
    public TireCombinedSlipRl() { return DataParser.GetSingle(this.data, 188) }
    public TireCombinedSlipRr() { return DataParser.GetSingle(this.data, 192) }
    public SuspensionTravelMetersFl() { return DataParser.GetSingle(this.data, 196) }
    public SuspensionTravelMetersFr() { return DataParser.GetSingle(this.data, 200) }
    public SuspensionTravelMetersRl() { return DataParser.GetSingle(this.data, 204) }
    public SuspensionTravelMetersRr() { return DataParser.GetSingle(this.data, 208) }
    public CarOrdinal() { return DataParser.GetUInt8(this.data, 212) }
    public CarClass() { return DataParser.GetUInt8(this.data, 216) }
    public CarPerformanceIndex() { return DataParser.GetUInt8(this.data, 220) }
    public DriveTrain() { return DataParser.GetUInt8(this.data, 224) }
    public NumCylinders() { return DataParser.GetUInt8(this.data, 228) }

    // dash
    public PositionX() { return DataParser.GetSingle(this.data, 232 + this.bufferOffset) }
    public PositionY() { return DataParser.GetSingle(this.data, 236 + this.bufferOffset) }
    public PositionZ() { return DataParser.GetSingle(this.data, 240 + this.bufferOffset) }
    public Speed() { return DataParser.GetSingle(this.data, 244 + this.bufferOffset) }
    public Power() { return DataParser.GetSingle(this.data, 248 + this.bufferOffset) }
    public Torque() { return DataParser.GetSingle(this.data, 252 + this.bufferOffset) }
    public TireTempFl() { return DataParser.GetSingle(this.data, 256 + this.bufferOffset) }
    public TireTempFr() { return DataParser.GetSingle(this.data, 260 + this.bufferOffset) }
    public TireTempRl() { return DataParser.GetSingle(this.data, 264 + this.bufferOffset) }
    public TireTempRr() { return DataParser.GetSingle(this.data, 268 + this.bufferOffset) }
    public Boost() { return DataParser.GetSingle(this.data, 272 + this.bufferOffset) }
    public Fuel() { return DataParser.GetSingle(this.data, 276 + this.bufferOffset) }
    public Distance() { return DataParser.GetSingle(this.data, 280 + this.bufferOffset) }
    public BestLapTime() { return DataParser.GetSingle(this.data, 284 + this.bufferOffset) }
    public LastLapTime() { return DataParser.GetSingle(this.data, 288 + this.bufferOffset) }
    public CurrentLapTime() { return DataParser.GetSingle(this.data, 292 + this.bufferOffset) }
    public CurrentRaceTime() { return DataParser.GetSingle(this.data, 296 + this.bufferOffset) }
    public Lap() { return DataParser.GetUInt16(this.data, 300 + this.bufferOffset) }
    public RacePosition() { return DataParser.GetUInt8(this.data, 302 + this.bufferOffset) }
    public Accelerator() { return DataParser.GetUInt8(this.data, 303 + this.bufferOffset) }
    public Brake() { return DataParser.GetUInt8(this.data, 304 + this.bufferOffset) }
    public Clutch() { return DataParser.GetUInt8(this.data, 305 + this.bufferOffset) }
    public Handbrake() { return DataParser.GetUInt8(this.data, 306 + this.bufferOffset) }
    public Gear() { return DataParser.GetUInt8(this.data, 307 + this.bufferOffset) }
    public Steer() { return DataParser.GetInt8(this.data, 308 + this.bufferOffset) }
    public NormalDrivingLine() { return DataParser.GetUInt8(this.data, 309 + this.bufferOffset) }
    public NormalAiBrakeDifference() { return DataParser.GetUInt8(this.data, 310 + this.bufferOffset) }

}
