import { Serializable } from "~/lib/serializable"
import { readNullTerminatedString } from "~/utils/string"

enum Offsets {
    Path = 0x000,
    Size = 0x100,
    CompressedSize = 0x108,
    BaseOffset = 0x110,
    Compression = 0x118,
    Unknown = 0x11C
}

export enum FsarCompression {
    Uncompressed,
    Compressed
}

export class FsarFileDefinition extends Serializable {
    public path: string
    public size: { uncompressed: number, compressed: number }
    public offset: number
    public compression: FsarCompression

    public static readonly SIZE = 0x120

    public deserialize(data: Uint8Array): void {
        // Size integrity check.
        if (data.byteLength < FsarFileDefinition.SIZE) {
            throw new Error(`File definition is too small. Expected a minimum size of 0x${FsarFileDefinition.SIZE} bytes, got 0x${data.byteLength.toString(16)}`)
        }

        // Read path as null-terminated string.
        const path = readNullTerminatedString(data.subarray(Offsets.Path, 0x100))

        // Create DataView class to aid in extracting data.
        const view = new DataView(data, 0x0, FsarFileDefinition.SIZE)

        // Fetch all other values.
        const size = view.getUint32(Offsets.Size + 4)
        const compressedSize = view.getUint32(Offsets.CompressedSize + 4)
        const baseOffset = view.getUint32(Offsets.BaseOffset + 4)
        const compression = <FsarCompression> view.getUint32(Offsets.Compression)

        // Write values to class instance.
        this.path = path
        this.size = {
            uncompressed: size,
            compressed: compressedSize
        }
        this.offset = baseOffset
        this.compression = compression
    }

    serialize(): Uint8Array {
        return undefined;
    }

}