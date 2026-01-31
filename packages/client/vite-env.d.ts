/// <reference types="vite/client" />

declare global {
    interface ImportMetaEnv {
        VITE_WS_SERVER_HOST: string
        VITE_WS_SERVER_PORT: number
        VITE_WS_SERVER_URL: string
        VITE_ENABLE_WEBSOCKET: boolean
        VITE_DEV_MODE: boolean
    }
}