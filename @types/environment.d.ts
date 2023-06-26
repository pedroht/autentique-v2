export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTENTIQUE_TOKEN: string
      AUTENTIQUE_URL: string
      AUTENTIQUE_DEV_MODE: 'true' | 'false'
      AUTENTIQUE_FOLDER_ID: string
    }
  }
}
