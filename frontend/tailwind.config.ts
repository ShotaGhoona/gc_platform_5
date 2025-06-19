import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        background: 'var(--background)',
        'background-foreground': 'var(--foreground)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        link: 'var(--link)',
        'link-foreground': 'var(--link-foreground)',
        success: 'var(--success)',
        'success-foreground': 'var(--success-foreground)',
        warning: 'var(--warning)',
        'warning-foreground': 'var(--warning-foreground)',
        destructive: 'var(--destructive)',
        'destructive-foreground': 'var(--destructive-foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        popover: 'var(--popover)',
        'popover-foreground': 'var(--popover-foreground)',
      },
      keyframes: {
        "slide-in-from-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-out-to-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        "slide-in-from-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-out-to-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "slide-in-from-bottom": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-out-to-bottom": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
        "slide-in-from-top": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-out-to-top": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },
        "fade-in-0": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out-0": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "animate-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "animate-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "slide-in-from-right": "slide-in-from-right 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-out-to-right": "slide-out-to-right 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-in-from-left": "slide-in-from-left 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-out-to-left": "slide-out-to-left 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-in-from-bottom": "slide-in-from-bottom 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-out-to-bottom": "slide-out-to-bottom 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-in-from-top": "slide-in-from-top 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-out-to-top": "slide-out-to-top 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in-0": "fade-in-0 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-out-0": "fade-out-0 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        "animate-in": "animate-in 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        "animate-out": "animate-out 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
}

export default config
