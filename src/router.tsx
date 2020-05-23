import * as React from "react"
import { Route, Switch } from "react-router"
import { HomePage } from "~/pages/home"
import { BrowserPage } from "~/pages/browser"
import { PlayerPage } from "~/pages/player"
import { ViewerPage } from "~/pages/viewer"
import { LocalePage } from "~/pages/locale"
import { SettingsPage } from "~/pages/settings"

type RouteKeys =
    | "home"
    | "browser"
    | "player"
    | "viewer"
    | "locale"
    | "settings"

type RouterRoute = {
    path: string,
    exact: boolean,
    component: React.ComponentType

}

export const routes: {[key in RouteKeys]: RouterRoute} = {
    home: {
        path: "/",
        exact: true,
        component: HomePage
    },
    browser: {
        path: "/browser",
        exact: true,
        component: BrowserPage
    },
    player: {
        path: "/player",
        exact: true,
        component: PlayerPage
    },
    viewer: {
        path: "/viewer",
        exact: true,
        component: ViewerPage
    },
    locale: {
        path: "/locale",
        exact: true,
        component: LocalePage
    },
    settings: {
        path: "/settings",
        exact: true,
        component: SettingsPage
    }
}

const generateRoutes = () => {
    const children = []
    for (let key in routes) {
        const route: RouterRoute = routes[key]
        children.push(
            <Route key={key} path={route.path} exact={route.exact} component={route.component}/>
        )
    }
    return children
}

export function Routes() {
    return (
        <Switch>
            { ...generateRoutes() }
        </Switch>
    )
}