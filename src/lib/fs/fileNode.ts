import { FsNode } from "~/lib/fs/node"
import { FileSystemFileHandle } from "~/lib/nativefs/handle"

export class FileNode extends FsNode {
    file: FileSystemFileHandle
}