# Ghoona Camp - 朝活コミュニティプラットフォーム

朝活を通じて自己成長とコミュニティ形成を支援するWebアプリケーションです。

## 🌅 概要

Ghoona Campは、早起きと朝活を習慣化したい人々のためのコミュニティプラットフォームです。Discord連携による出席管理、ティアシステムによるゲーミフィケーション、AI支援によるビジョン設定など、朝活を継続するための機能を提供します。

### 主な機能

- 📊 **ダッシュボード**: 個人の朝活統計と進捗管理
- 🎯 **月間目標設定**: 毎月の目標設定と管理
- 🏆 **ティアシステム**: 朝活レベルに応じたランク付け
- 👥 **ライバル機能**: 他ユーザーとの競争とモチベーション向上
- 📅 **イベント管理**: 朝活イベントの作成・参加
- 🤖 **AI ビジョン設定**: OpenAI GPTによる目標設定支援
- 💬 **Discord連携**: 自動出席管理とコミュニティ活動
- 📈 **ランキング**: 月間・総合・連続出席ランキング

## 🛠 技術スタック

### フロントエンド
- **Framework**: Next.js 15.3.2 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Authentication**: Clerk
- **State Management**: React Hooks + Context API
- **Architecture**: Feature-based Architecture

### バックエンド
- **Framework**: FastAPI 0.109.2
- **Language**: Python 3.11
- **Database**: PostgreSQL (Supabase)
- **ORM**: SQLAlchemy 2.0.27
- **Authentication**: Clerk + Discord OAuth2
- **Validation**: Pydantic
- **External APIs**: OpenAI GPT, Discord API

### インフラ・ツール
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel (Frontend) + Railway (Backend)
- **External Services**: Discord, OpenAI

## 📁 プロジェクト構造

```
gc_platform_5/
├── frontend/                    # Next.js フロントエンド
│   ├── src/
│   │   ├── app/                # App Router ページ
│   │   ├── components/         # 再利用可能コンポーネント
│   │   ├── feature/           # 機能別コンポーネント
│   │   └── hooks/             # カスタムフック
├── backend/                    # FastAPI バックエンド
│   ├── app/
│   │   ├── api/v1/           # API エンドポイント
│   │   ├── database/         # データベース関連
│   │   ├── services/         # ビジネスロジック
│   │   └── schemas/          # Pydantic スキーマ
├── supabase/                   # データベース SQL
├── docs/                       # プロジェクト文書
└── README.md
```

## 🚀 セットアップ

### 前提条件

- Node.js 18.0+
- Python 3.11+
- PostgreSQL (Supabase)
- Discord Developer Account
- OpenAI API Key

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd gc_platform_5
```

### 2. バックエンドセットアップ

```bash
cd backend

# 仮想環境の作成
python3.11 -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate   # Windows

# 依存関係のインストール
pip install -r requirements.txt

# 環境変数の設定
cp .env.example .env
# .envファイルを編集して必要な値を設定
```

#### 環境変数 (.env)

```env
# Database
DATABASE_URL=postgresql://postgres:[password]@[host]:[port]/postgres

# Discord Settings
DISCORD_BOT_TOKEN=your_discord_bot_token
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
DISCORD_REDIRECT_URI=http://localhost:3000/setting/discord-setting/callback

# OpenAI
OPENAI_API_KEY=your_openai_api_key
```

### 3. データベースセットアップ

Supabaseプロジェクトを作成し、SQL Editorで以下を順次実行：

```bash
# 1. テーブル作成
cat supabase/01_create_tables.sql
# → Supabase SQL Editor にコピー&ペーストして実行

# 2. ダミーデータ挿入
cat supabase/02_insert_dummy_data.sql
# → Supabase SQL Editor にコピー&ペーストして実行
```

### 4. フロントエンドセットアップ

```bash
cd frontend

# 依存関係のインストール
npm install

# 環境変数の設定
cp .env.example .env.local
# .env.localファイルを編集
```

#### フロントエンド環境変数 (.env.local)

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

### 5. アプリケーション起動

#### バックエンド起動
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### フロントエンド起動
```bash
cd frontend
npm run dev
```

## 📱 アクセス

- **フロントエンド**: http://localhost:3000
- **バックエンドAPI**: http://localhost:8000
- **API ドキュメント**: http://localhost:8000/docs

## 🎮 使用方法

### 1. アカウント作成・ログイン
- Clerk認証システムでアカウント作成
- Discord連携で朝活チャンネルに参加

### 2. プロフィール設定
- 基本情報、興味・関心、スキルの設定
- AI支援によるビジョン設定

### 3. 朝活参加
- 毎朝6時にDiscordチャンネルに参加
- 自動的に出席が記録される

### 4. 目標・進捗管理
- 月間目標の設定
- ダッシュボードで進捗確認
- ランキングでモチベーション維持

## 📊 データベース設計

### 主要テーブル

- **users**: ユーザー基本情報
- **profiles**: 詳細プロフィール
- **tiers**: ティア・ランクシステム
- **morning_events**: 朝活イベント
- **attendances**: 出席記録
- **monthly_goals**: 月間目標

詳細は [database_specification.md](./docs/database_specification.md) を参照

## 🔌 API仕様

RESTful APIとして設計され、以下の主要エンドポイントを提供：

- `/api/v1/users/*` - ユーザー管理
- `/api/v1/profiles/*` - プロフィール管理
- `/api/v1/morning_events/*` - イベント管理
- `/api/v1/attendance/*` - 出席管理
- `/api/v1/dashboard/*` - ダッシュボード

詳細は [api_specification.md](./docs/api_specification.md) を参照

## 🧪 テスト

```bash
# バックエンドテスト
cd backend
pytest

# フロントエンドテスト
cd frontend
npm test
```

## 📦 デプロイ

### Vercel (フロントエンド)
```bash
cd frontend
npm run build
vercel --prod
```

### Railway (バックエンド)
```bash
cd backend
# railway.toml設定済み
railway up
```

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📝 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

## 👥 開発チーム

- **プロジェクトオーナー**: Ghoona Camp Team
- **技術責任者**: [Your Name]

## 📞 サポート

- **Issues**: GitHub Issues でバグ報告・機能要望
- **Discord**: [コミュニティサーバー]
- **Email**: support@ghoona.camp

## 🔄 更新履歴

### v1.0.0 (2025-01-20)
- 初回リリース
- 基本的な朝活管理機能
- Discord連携
- ティアシステム
- AI ビジョン設定

---

**朝活で人生を変えよう！** 🌅✨