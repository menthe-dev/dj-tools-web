import { FsNode } from "~/lib/fs/node"
import { FileSystemDirectoryHandle } from "~/lib/nativefs/handle"

export class Navigator {
    root: FsNode
    path: FsNode[]

    private constructor() {

    }

    static fromDirectoryHandle(handle: FileSystemDirectoryHandle) {
        const nav = new Navigator()



        return nav
    }

    get current() {
        if (this.path.length === 0) {
            return this.root;
        }
        else {
            return this.path[this.path.length - 1]
        }
    }

    get pathNames() {
        return this.path.map(node => node.name)
    }
}