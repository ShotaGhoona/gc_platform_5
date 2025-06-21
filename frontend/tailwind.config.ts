import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: "class",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/feature/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        
        // ヘッダー色
        'header-bg': "hsl(var(--header-bg))",
        'header-text': "hsl(var(--header-text))",
        'header-text-secondary': "hsl(var(--header-text-secondary))",
        'header-text-muted': "hsl(var(--header-text-muted))",
        'header-border': "hsl(var(--header-border))",
        'header-hover': "hsl(var(--header-hover))",
        'header-avatar-border': "hsl(var(--header-avatar-border))",
        
        // サイドバー色
        'sidebar-bg': "hsl(var(--sidebar))",
        'sidebar-text': "hsl(var(--sidebar-text))",
        'sidebar-border': "hsl(var(--sidebar-border))",
        'sidebar-hover': "hsl(var(--sidebar-hover))",
        'sidebar-active': "hsl(var(--sidebar-active))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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