/// <reference types="vite/client" />

declare module "gsap-trial/SplitText" {
	export class SplitText {
		chars: Element[];
		words: Element[];
		constructor(
			target: string | Element | Array<string | Element>,
			vars?: Record<string, unknown>
		);
		revert(): void;
	}
}

interface ImportMetaEnv {
	readonly VITE_FORMSPREE_ENDPOINT?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
