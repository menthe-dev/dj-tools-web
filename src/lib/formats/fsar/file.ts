import { FsarHeader } from "~/lib/formats/fsar/header"
import { FsarFileDefinition } from "~/lib/formats/fsar/entry"

enum Offsets {
    Header = 0x0,
    Definitions = 0x20
}

export class FsarFile {
    private _file: File
    public header: FsarHeader
    public definitions: FsarFileDefinition[]

    static async from(file: File): Promise<FsarFile> {
        const fsar = new FsarFile()
        fsar._file = file;

        // Size check before reading header.
        if (file.size < FsarHeader.SIZE) {
            // Todo: Write error message for FSAr header size
            throw new Error("header")
        }

        // Read the FSAr header.
        fsar.header = new FsarHeader()
        fsar.header.deserialize(new Uint8Array(await file.slice().arrayBuffer()))

        // Size check before reading entries.
        const definitionSize = FsarFileDefinition.SIZE * fsar.header.entryCount
        if (file.size < (Offsets.Definitions + definitionSize)) {
            // Todo: Write error message for FSAr definition size
            throw new Error("definitions")
        }

        const definitionSlice = new Uint8Array(await file.slice(Offsets.Definitions, Offsets.Definitions + definitionSize, "application/octet-stream").arrayBuffer())

        fsar.definitions = []
        for (let definitionIndex = 0; definitionIndex < fsar.header.entryCount; definitionIndex ++) {
            const offset: number = Offsets.Definitions + definitionIndex * FsarFileDefinition.SIZE

            const definition = new FsarFileDefinition()
            definition.deserialize(definitionSlice.slice(offset, offset + FsarFileDefinition.SIZE))

            fsar.definitions.push(definition)
        }

        return fsar
    }


}