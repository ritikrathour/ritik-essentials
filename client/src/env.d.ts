interface ImportMetaEnv {
  VITE_NODE_ENV: any;
  readonly VITE_BASE_URL_DEVELOPMENT: string;
  readonly VITE_BASE_URL_PRODUCTION: string;
  readonly VITE_NODE_ENV: string;
  readonly VITE_BACKENDURI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
