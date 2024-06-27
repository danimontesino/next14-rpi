import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/theme'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['var(--font-raleway)'],
        lora: ['var(--font-lora)'],
      },
      keyframes: {
        'cube-animation': {
          '50%': {
            transform: 'translateY(1rem)',
          },
        },
        'color-animation': {
          '0%': { color: 'hsl(var(--alp-foreground))' },
          '50%': { color: 'hsl(var(--alp-primary))' },
          '100%': { color: 'hsl(var(--alp-foreground))' },
        },
      },
      animation: {
        color: 'color-animation 4.5s ease infinite',
        cube: 'cube-animation 6s ease-in-out infinite',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      prefix: 'alp',
      addCommonColors: false,
      defaultTheme: 'light',
      defaultExtendTheme: 'light',
      layout: {
        radius: {
          medium: '8px',
        },
      },
      themes: {
        light: {
          colors: {
            background: '#FFFFFF',
            foreground: {
              DEFAULT: '#191919',
              400: '#979797',
              500: '#585858',
              600: '#191919',
            },
            divider: {
              DEFAULT: '#EFECEC',
              400: '#AFA4A4',
              500: '#6F6262',
            },
            focus: '#FABF7D',
            default: '#CA714B',
            primary: {
              DEFAULT: '#CA714B',
              foreground: '#FFFFFF',
              300: '#CBA485',
            },
            secondary: {
              DEFAULT: '#FABF7D',
              foreground: '#FFFFFF',
            },
            success: {
              DEFAULT: '#FFD6A8',
              foreground: '#191919',
            },
            warning: {
              DEFAULT: '#FFE8A8',
              foreground: '#191919',
            },
            danger: {
              DEFAULT: '#964630',
              foreground: '#FFFFFF',
            },
          },
        },
        dark: {
          colors: {
            background: '#191919',
            foreground: '#FFFFFF',
            divider: '#CBA485',
            focus: '#FABF7D',
            default: '#CA714B',
            primary: {
              DEFAULT: '#CA714B',
              300: '#CBA485',
            },
            secondary: '#FABF7D',
            success: '#FFD6A8',
            warning: '#FFE8A8',
            danger: '#964630',
          },
        },
      },
    }),
    require('./plugins/animationDelay'),
    require('tailwindcss-animated'),
  ],
}
export default config
