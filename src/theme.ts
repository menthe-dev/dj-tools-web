type Tokens =
    | "accent"
    | "text"
    | "secondary-text"

    | "button-primary-text"
    | "button-primary-background"
    | "button-primary-shadow"
    | "button-primary-textShadow"
    | "button-default-text"
    | "button-default-background"
    | "button-default-shadow"
    | "button-default-textShadow"
    | "button-warning-text"
    | "button-warning-background"
    | "button-warning-shadow"
    | "button-warning-textShadow"
    | "button-danger-text"
    | "button-danger-background"
    | "button-danger-shadow"
    | "button-danger-textShadow"

type Theme = {[token in Tokens]: string}
type Themes = "light"

class ThemeManager {
    private _colors = {
        mintGreen: "#14f0aa",
        darkGrey: "#666",
        white: "#fff",
        pinkish: "#ff6ba1"
    }

    constructor() {
    }

    private _themes: {[theme in Themes]: Theme} = {
        "light": {
            "accent": "#14f0aa",
            "text": "#666",
            "secondary-text": "#666",

            "button-default-text": this._colors.darkGrey,
            "button-default-background": this._colors.white,
            "button-default-shadow": "0px 2px 14px -6px rgba(0, 0, 0, 0.25)",
            "button-default-textShadow": "0px 2px 6px rgba(0, 0, 0, 0.17)",

            "button-primary-text": this._colors.white,
            "button-primary-background": this._colors.mintGreen,
            "button-primary-shadow": "0px 2px 14px -6px rgba(0, 184, 125, 0.8)",
            "button-primary-textShadow": "0px 2px 6px rgba(0, 0, 0, 0.17)",

            "button-warning-text": this._colors.pinkish,
            "button-warning-background": this._colors.white,
            "button-warning-shadow": "0px 2px 14px -6px rgba(0, 0, 0, 0.25)",
            "button-warning-textShadow": "0px 2px 6px rgba(0, 0, 0, 0.17)",

            "button-danger-text": this._colors.white,
            "button-danger-background": this._colors.pinkish,
            "button-danger-shadow": "0px 2px 14px -6px rgba(187, 53, 102, 0.8)",
            "button-danger-textShadow": "0px 2px 6px rgba(0, 0, 0, 0.17)",
        }
    }

    private _theme: Themes = "light"

    apply() {
        const theme: Theme = this._themes[this._theme]
        const root: HTMLElement = document.querySelector("#app")

        for (const key in theme) {
            if (theme.hasOwnProperty(key)) {
                root.style.setProperty("--" + key, theme[key])
            }
        }
    }

    get(token: string | Tokens) {
        return `var(--${token})`
    }
}

const theme = new ThemeManager()
export default theme;