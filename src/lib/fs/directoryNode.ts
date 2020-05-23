import { FsNode } from "~/lib/fs/node"
import { FileSystemDirectoryHandle } from "~/lib/nativefs/handle"

export class DirectoryNode extends FsNode {
    directory: FileSystemDirectoryHandle

    static async from(handle: FileSystemDirectoryHandle): Promise<DirectoryNode> {
        const node = new DirectoryNode()
        node.name = handle.name

        const entries = await handle.getEntries()

        return node
    }
}