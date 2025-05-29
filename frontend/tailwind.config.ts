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
    },
  },
  plugins: [],
}

export default config 

// 背景色（Background）
// background: メインの背景色
// background-foreground: 背景上のテキスト色
// セカンダリー（Secondary）
// secondary: 補助的な要素の背景色
// secondary-foreground: セカンダリー要素上のテキスト色
// ミュート（Muted）
// muted: 控えめな要素の背景色
// muted-foreground: 控えめなテキスト色
// ボーダーと入力
// border: 境界線の色
// input: 入力フィールドの背景色
// リンク
// link: リンクの色
// link-foreground: ホバー時のリンク色
// 状態を示す色
// success: 成功状態を示す色
// warning: 警告状態を示す色
// destructive: エラーや削除などの危険な操作を示す色
// UIコンポーネント用
// card: カードの背景色
// popover: ポップオーバーの背景色