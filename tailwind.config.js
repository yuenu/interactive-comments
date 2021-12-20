module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				gray: {
					light: "hsl(223, 19%, 93%)",
					lighter: "hsl(228, 33%, 97%)",
				},
				blue: {
					dark: "hsl(211, 10%, 45%)",
					darker: "hsl(212, 24%, 26%)",
					bg: "hsl(239, 57%, 85%)",
				},
				red: {
					pale: "hsl(357, 100%, 86%)",
					soft: "hsl(358, 79%, 66%)",
				},
				primary: "hsl(238, 40%, 52%)",
			},
		},
	},
	plugins: [],
};
