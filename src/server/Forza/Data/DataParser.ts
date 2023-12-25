export class DataParser {

    public static GetSingle(bytes: Buffer, index:number) {
        return bytes.readFloatLE(index)
        // return BitConverter.ToSingle(bytes, index);
    }

    public static GetUInt16(bytes: Buffer, index:number) {
        return bytes.readUInt16LE(index)
        // return BitConverter.ToUInt16(bytes, index);
    }

    public static GetUInt32(bytes: Buffer, index:number) {
        return bytes.readUInt32LE(index)
        // return BitConverter.ToUInt32(bytes, index)
    }

    public static GetUInt8(bytes: Buffer, index:number) {
        return bytes.readUInt8(index)
        // /  return bytes[index];
    }

    public static GetInt8(bytes: Buffer, index:number) {
        return bytes.readInt8(index)
        //  return Convert.ToInt16((sbyte)bytes[index]);
    }

    private static byteCheck(bytes: number[], index:number, byteCount:number) {
        if (index + byteCount <= bytes.length) {
            return
        }
        throw new Error('Not enough bytes in this array')
    }
}

