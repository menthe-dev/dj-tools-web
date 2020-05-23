import { Serializable } from "~/lib/serializable"

enum Offsets {
    Magic = 0x0,
    Version = 0x4,
    DataOffset = 0x8,
    EntryCount = 0xC,
    Buffer = 0x10
}

export class FsarHeader extends Serializable {
    public magic: string
    public version: number
    public dataOffset: number
    public entryCount: number

    public static readonly SIZE = 0x20
    public static readonly MAGIC_SIZE = 0x4
    public static readonly VALID_MAGICS = [
        "FSAR"
    ]

    /**
     * Deserializes a Freestyle Archive header.
     * @param data An array containing the FSAr header.
     */
    deserialize(data: Uint8Array): void {
        // Size integrity check.
        if (data.byteLength < FsarHeader.SIZE) {
            throw new Error(`Header is too small. Expected a minimum size of 0x${FsarHeader.SIZE} bytes, got 0x${data.byteLength.toString(16)}`)
        }

        // Fetch and compare magic value.
        const magic: string = String.fromCharCode(...Array.from(data.subarray(Offsets.Magic, FsarHeader.MAGIC_SIZE)))
        if (!FsarHeader.VALID_MAGICS.includes(magic)) {
            throw new Error(`${magic} is not a valid or supported Freestyle Archive magic value`)
        }

        // Create DataView class to aid in extracting data.
        const view = new DataView(data, 0x0, FsarHeader.SIZE)

        // Fetch all important values.
        const version = view.getUint32(Offsets.Version)
        const dataOffset = view.getUint32(Offsets.DataOffset)
        const entryCount = view.getUint32(Offsets.EntryCount)

        // Buffer integrity check
        let bufferValue = 0
        for (let offset = Offsets.Buffer; offset < FsarHeader.SIZE; offset ++) {
            bufferValue = view.getUint8(offset)
            if (bufferValue != 0x78) {
                throw new Error(`Unsupported buffer found at offset 0x${offset.toString(16)}. Value expected: 0x78, got 0x${bufferValue.toString(16)}`)
            }
        }

        // Write values to class instance.
        this.magic = magic
        this.version = version
        this.dataOffset = dataOffset
        this.entryCount = entryCount
    }

    /**
     * Serializes the Freestyle Archive header back to its original data format.
     */
    serialize(): Uint8Array {
        // Create data array of 0x20 bytes.
        const data = new Uint8Array(FsarHeader.SIZE)

        // Create a view for better access.
        const view = new DataView(data)

        // Write magic.
        for (let charIndex = 0; charIndex < FsarHeader.MAGIC_SIZE; charIndex++) {
            view.setUint8(Offsets.Magic + charIndex, this.magic.charCodeAt(charIndex) || 0)
        }

        // Write other values.
        view.setUint32(Offsets.Version, this.version)
        view.setUint32(Offsets.DataOffset, this.dataOffset)
        view.setUint32(Offsets.EntryCount, this.entryCount)

        // Write buffer.
        for (let offset = Offsets.Buffer; offset < FsarHeader.SIZE; offset++) {
            view.setUint8(offset, 0x78)
        }

        return data
    }
}