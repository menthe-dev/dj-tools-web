import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom"
import { Routes } from "./router"
import theme from "~/theme"
import { hasNativeFs } from "~/utils/hasNativeFs"
import { FileSystemHandle } from "~/lib/nativefs/handle"

declare global {
    interface Window {
        chooseFileSystemEntries: (options?: { type: "open-file" | "save-file" | "open-directory" }) => Promise<FileSystemHandle>
    }
}

const App = () => {
    if (!hasNativeFs()) {
        return <>
            <h1>Hold on there cowboy</h1>
            <p>
                You have to enable the Native Filesystem flag first. <br />
                <code>chrome://flags/#native-file-system-api</code> <br />
                (Chrome only, sorry Firefox users 😔, I don't make the rules)
            </p>
        </>
    }

    return (
        <>
            <Router>
                <Routes />
            </Router>
        </>
    )
};

theme.apply()
render(<App />, document.getElementById("app"));
