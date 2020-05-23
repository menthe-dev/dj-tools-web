import { FileNode } from "~/lib/fs/fileNode"
import { FsarFile } from "~/lib/formats/fsar/file"
import { FsNode } from "~/lib/fs/node"
import { FsarFileDefinition } from "~/lib/formats/fsar/entry"

export class FsarNode extends FileNode {
    fsar: FsarFile
}

export class FsarEntryNode extends FsNode {
    container: FsarNode
    definition: FsarFileDefinition
}