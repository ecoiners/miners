# react native x clone 
# nativewind -> tailwind css

# setup projects and install package
1. npx create-expo-app@latest mobile
2. npm i nativewind react-native-reanimated@3.17.4 react-native-safe-area-context@5.4.0
3. npm i -D tailwindcss@3.4.17 prettier-plugin-tailwindcss@0.5.11
4. npx tailwindcss init

# root folder add >> tailwind.config.js
module.exports = {
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {}
	},
	plugins: [
		
	]
};

# root folder add >> global.css
@tailwind base;
@tailwind components;
@tailwind utilities;

# root folder add >> babel.config.js
module.exports = function (api) {
	api.cache(true);
	return {
		presets: [
			["babel-preset-expo", {jsxImportSource: "nativewind"}],
			"nativewind/babel",
		],
	}
};

# root folder add >> metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, {
	input: "./global.css",
});

// import global.css in app/_layout.tsx >> import "../global.css";

# modify app.json
{
	"expo": {
		"web": {
			"bundler": "metro"
		}
	}
}

# typescript (optionals) root add >> nativewind-env.d.ts
/// <reference types="nativewind/types" /> 


# package install
- npm install @clerk/clerk-expo
- npm install expo-secure-store








