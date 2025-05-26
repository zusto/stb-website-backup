/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ZOHO_CLIENT_ID: string
  readonly VITE_ZOHO_CLIENT_SECRET: string
  readonly VITE_ZOHO_REFRESH_TOKEN: string
  // ... other env variables
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}