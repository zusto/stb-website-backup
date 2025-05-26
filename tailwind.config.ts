
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	safelist: [/bg-radialSunny/, /bg-grain/, /from-\[#FFD447\]/, /via-\[#FFEFE2\]/],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			contrast: {
				'105': '1.05',
			},
			brightness: {
				'95': '.95',
			},
			saturate: {
				'105': '1.05',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// New and updated Gen Z color scheme focused on orange and yellow tones
				sunny: {
					yellow: {
						DEFAULT: "#FFD600", // Bright yellow
						light: "#FFF0A0",   // Light yellow
						pale: "#FFFBEB",    // Very light yellow
						dark: "#FFA800"     // Darker yellow/gold
					},
					orange: {
						DEFAULT: "#FF7A00", // Vibrant orange
						light: "#FFA64D",   // Light orange
						pale: "#FFF1E6",    // Very light orange
						dark: "#E05F00"     // Dark orange
					},
					white: "#FFFFFF",
					cream: "#FFFAF0",
					peach: "#FFE0B2"
				},
				midnight: "#1A1A2E"
			},
			fontFamily: {
				sans: ["'Poppins'", "sans-serif"],
				display: ["'Fredoka One'", "cursive"],
				handwritten: ["'Caveat'", "cursive"],
				script: ["'Caveat'", "cursive"],
				body: ["'Poppins'", "sans-serif"]
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				xl: '1rem',
				'2xl': '1.5rem',
				'3xl': '2rem',
				'4xl': '3rem'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'bounce-subtle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'pulse-gentle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'wiggle': {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
				'pulse-gentle': 'pulse-gentle 2s ease-in-out infinite',
				'spin-slow': 'spin-slow 12s linear infinite',
				'wiggle': 'wiggle 1s ease-in-out infinite'
			},
			backgroundImage: {
				'sunny-gradient': "linear-gradient(135deg, #FFD600 0%, #FF7A00 100%)",
				'sunny-soft': "linear-gradient(135deg, #FFFBEB 0%, #FFF1E6 100%)",
				'sunny-glow': "radial-gradient(circle, rgba(255, 214, 0, 0.4) 0%, rgba(255, 122, 0, 0.1) 70%)",
				'sunny-rays': "repeating-conic-gradient(from 0deg, #FFD600 0deg 10deg, transparent 10deg 15deg)",
				'film-grain': "url('https://grainy-gradients.vercel.app/noise.svg')",
				'radialSunny': "radial-gradient(ellipse at center, var(--tw-gradient-stops))"
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
