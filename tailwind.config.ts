import type { Config } from "tailwindcss";

// DaisyUI v4 works with Tailwind v3
// eslint-disable-next-line @typescript-eslint/no-var-requires
const daisyui = require("daisyui");

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {},
	},
	plugins: [daisyui],
};

export default config;


