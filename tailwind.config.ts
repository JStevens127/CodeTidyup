import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui'],
                serif: ['ui-serif', 'Georgia'],
                mono: ['ui-monospace', 'SFMono-Regular']
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
            },
            colors: {
                textPrimary: 'rgba(0, 0, 0, 0.87)',
                textSecondary: 'rgba(0, 0, 0, 0.6)',
                textDisabled: 'rgba(0, 0, 0, 0.38)',
                divider: 'rgba(0, 0, 0, 0.08)',
                hover: 'rgba(0, 0, 0, 0.04)'
            }
        }
    },
    plugins: []
}
export default config
