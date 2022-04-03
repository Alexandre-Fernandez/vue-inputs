const plugin = require("tailwindcss/plugin")
const headerHeight = 56

module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		colors: {
			transparent: "transparent",
			white: "#fff",
			black: "#000",
			primary: {
				100: "#040c4e",
				75: "#4B5563",
				50: "#7E82A3",
				25: "#BBBDCE",
				15: "#D3D5DF",
				5: "#E0E0E7",
			},
			secondary: "#828282",
			brand: {
				primary: "#502EBF",
				secondary: "#8A37BF",
				tertiary: "#FF4B0E",
			},
			"nav-black": "#040C4E",
			neutral: {
				0: "#F9F9F9",
				100: "#F3F4F6",
				200: "#E5E7EB",
				300: "#D1D5DB",
				150: "#F0E3F5",
				400: "#9CA3AF",
				500: "#6B7280",
				600: "#4B5563",
				700: "#374151",
				800: "#1F2937",
				900: "#111827",
			},
			danger: {
				300: "#F87171",
				500: "#EF4444",
				700: "#B91C1C",
				900: "#7f1D1D",
			},
			success: {
				300: "#86EFAC",
				500: "#22C55E",
				700: "#15803D",
				900: "#14532D",
			},
		},
		fontFamily: {
			sans: ["Rustica", "sans-serif"],
		},
		extend: {
			spacing: {
				header: `${headerHeight}px`,
				"no-header": `calc(100vh - ${headerHeight}px)`,
			},
			borderRadius: {
				button: "40px",
			},
			boxShadow: {
				sidebarIcon: "0px 2px 8px 0px rgba(80, 46, 191, 0.3)",
			},
			backgroundImage: {
				"check-box": "url('@/assets/img/icons/checkbox.svg')",
				"check-box-checked":
					"url('@/assets/img/icons/checkbox-checked.svg')",
				"purple-radiant": "url('@/assets/img/background.png')",
			},
		},
		screens: {
			"all-screens": "0px",
			sm: "620px",
			md: "1440px",
			lg: "2000px",
		},
	},
	plugins: [
		plugin(function ({ addVariant }) {
			addVariant("input", ["& input", "& textarea"])
		}),
	],
}

// module.exports = {
//   content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
