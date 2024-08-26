export {}

declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}

declare global {
    interface Window {
        API: string
        LOCAL_API: string
        CEF: boolean
        HOME: string
        LIST_MANUALS: string[]
        TIMEOUT: number
        IS_DEV: boolean
        TIME_RECORD_SECONDS: number
    }
}
