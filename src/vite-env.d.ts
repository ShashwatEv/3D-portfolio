/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_FORMSPREE_ENDPOINT?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
