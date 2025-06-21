# 技術スタック仕様書

## 概要
Ghoona Camp（朝活アプリ）の技術スタック仕様書です。本アプリケーションは、モダンな技術スタックを使用してスケーラブルで保守性の高いWebアプリケーションとして構築されています。

---

## アーキテクチャ概要

### システム構成
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Next.js)     │◄──►│   (FastAPI)     │◄──►│  (PostgreSQL)   │
│   Port: 3000    │    │   Port: 8000    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vercel        │    │   Railway       │    │   Supabase      │
│   (Hosting)     │    │   (Hosting)     │    │   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 外部サービス統合
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Clerk         │    │   Discord       │    │   OpenAI        │
│   (認証)        │    │   (Bot/連携)    │    │   (AI機能)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## フロントエンド技術スタック

### コアフレームワーク
- **Next.js**: 15.3.2
  - App Router使用
  - Server Components
  - ファイルベースルーティング
  - 静的生成 + サーバーサイドレンダリング

### 言語・開発環境
- **TypeScript**: ^5
- **Node.js**: ^20
- **npm**: package-lock.json v3

### UIライブラリ・スタイリング
```json
{
  "@radix-ui/react-*": "各種コンポーネント",
  "tailwindcss": "^4",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.3.0"
}
```

#### Radix UIコンポーネント
- `react-accordion`: アコーディオン
- `react-avatar`: アバター表示
- `react-checkbox`: チェックボックス
- `react-dialog`: モーダル・ダイアログ
- `react-menubar`: メニューバー
- `react-navigation-menu`: ナビゲーション
- `react-popover`: ポップオーバー
- `react-progress`: プログレスバー
- `react-radio-group`: ラジオボタングループ
- `react-scroll-area`: スクロール領域
- `react-select`: セレクトボックス
- `react-slider`: スライダー
- `react-switch`: スイッチ

### 認証・セキュリティ
- **Clerk**: @clerk/nextjs@6.19.1
  - ユーザー認証・セッション管理
  - OAuth統合 (Discord等)
  - 自動ルート保護

### データ可視化・UI
```json
{
  "chart.js": "^4.4.9",
  "react-chartjs-2": "^5.3.0",
  "react-day-picker": "^8.10.1",
  "date-fns": "^3.6.0",
  "lucide-react": "^0.511.0",
  "react-icons": "^5.5.0"
}
```

### データベース連携
- **Supabase**: @supabase/supabase-js@2.49.4
  - PostgreSQLクライアント
  - リアルタイム機能
  - ストレージ機能

### 開発ツール
```json
{
  "eslint": "^9",
  "eslint-config-next": "15.3.2",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19"
}
```

---

## バックエンド技術スタック

### コアフレームワーク
- **FastAPI**: 0.109.2
  - 高速なPython Webフレームワーク
  - 自動API仕様生成 (Swagger/OpenAPI)
  - 型安全性 (Pydantic)
  - 非同期サポート

### Webサーバー・ASGI
- **Uvicorn**: 0.27.1
  - ASGI サーバー
  - 高性能・軽量
  - Hot reload対応

### データベース・ORM
```python
sqlalchemy==2.0.27
alembic==1.13.1  # マイグレーション
```

#### SQLAlchemy設定
- **ORM**: SQLAlchemy 2.0系
- **データベース**: PostgreSQL
- **マイグレーション**: Alembic
- **接続管理**: セッション管理パターン

### 認証・セキュリティ
```python
python-jose==3.3.0    # JWT処理
passlib==1.7.4        # パスワードハッシュ化
```

### 外部API・通信
```python
httpx>=0.24,<0.26        # HTTP クライアント
requests==2.31.0        # HTTP ライブラリ
python-multipart==0.0.9 # ファイルアップロード
```

### 外部サービス統合
```python
supabase==2.3.4         # Supabase Python SDK
discord.py==2.3.2       # Discord Bot SDK
openai                   # OpenAI API (ビジョン設定機能)
```

### 設定管理
```python
python-dotenv==1.0.1    # 環境変数管理
pydantic==1.10.13       # データバリデーション
```

### デプロイメント・インフラ
- **Railway**: バックエンドホスティング
- **Procfile**: プロセス定義
- **railway.toml**: Railway設定ファイル

---

## データベース技術仕様

### データベース管理システム
- **PostgreSQL**: (Supabase managed)
- **ORM**: SQLAlchemy 2.0.27
- **マイグレーション**: Alembic 1.13.1

### データベース設計原則
- **正規化**: 第3正規形まで適用
- **論理削除**: 重要なデータの物理削除回避
- **UUID使用**: 分散システム対応のID生成
- **タイムスタンプ**: 作成・更新日時の自動管理

### パフォーマンス最適化
- **インデックス**: 検索頻度の高いカラムにインデックス設定
- **外部キー制約**: データ整合性保証
- **カスケード削除**: 関連データの自動削除
- **接続プール**: 効率的なDB接続管理

---

## 開発・デプロイメント環境

### 開発環境
```json
{
  "frontend_dev": "npm run dev (Next.js Turbopack)",
  "backend_dev": "uvicorn app.main:app --reload",
  "database_dev": "Supabase local development"
}
```

### ビルド・デプロイ
```json
{
  "frontend_build": "next build",
  "frontend_deploy": "Vercel",
  "backend_deploy": "Railway",
  "database": "Supabase (Production)"
}
```

### 環境変数管理
#### フロントエンド
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

#### バックエンド
```bash
DATABASE_URL
SUPABASE_URL
SUPABASE_KEY
DISCORD_BOT_TOKEN
OPENAI_API_KEY
FRONTEND_URL
```

---

## API設計・通信

### RESTful API設計
```
GET    /api/v1/users/count           # ユーザー数取得
GET    /api/v1/dashboard/summary/    # ダッシュボード要約
POST   /api/v1/morning-events/       # 朝活イベント作成
PUT    /api/v1/profiles/{id}         # プロフィール更新
DELETE /api/v1/monthly-goals/{id}    # 月間目標削除
```

### CORS設定
```python
allowed_origins = [
    "http://localhost:3000",  # 開発環境
    os.getenv("FRONTEND_URL") # 本番環境
]
```

### データ形式
- **Request/Response**: JSON
- **エラーレスポンス**: HTTP status code + エラーメッセージ
- **バリデーション**: Pydantic schemas

---

## セキュリティ・認証

### 認証システム
- **認証プロバイダー**: Clerk
- **認証方式**: JWT (JSON Web Token)
- **セッション管理**: Clerk managed

### ルート保護
```typescript
// middleware.ts
export default clerkMiddleware(
  (auth, request) => {
    const publicRoutes = ["/", "/sign-in(.*)", "/sign-up(.*)"];
    if (!publicRoutes.includes(request.nextUrl.pathname)) {
      auth().protect();
    }
  }
);
```

### API セキュリティ
- **CORS**: オリジン制限
- **Rate Limiting**: (今後実装予定)
- **Input Validation**: Pydantic schemas
- **SQL Injection Prevention**: SQLAlchemy ORM使用

---

## パフォーマンス・最適化

### フロントエンド最適化
- **Code Splitting**: Next.js自動コード分割
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: webpack-bundle-analyzer
- **Static Generation**: 静的ページの事前生成

### バックエンド最適化
- **非同期処理**: FastAPI async/await
- **データベース最適化**: 効率的なクエリ設計
- **キャッシュ**: (今後実装予定)
- **CDN**: 静的アセットの配信最適化

### モニタリング・ログ
- **ヘルスチェック**: `/api/v1/health`
- **ルーティング確認**: 起動時のルート一覧出力
- **エラーログ**: (今後実装予定)

---

## 今後の技術改善予定

### スケーラビリティ
1. **キャッシュシステム**: Redis導入
2. **データベース最適化**: インデックス最適化・クエリ最適化
3. **API Rate Limiting**: レート制限機能
4. **CDN**: 静的アセット配信最適化

### 開発体験
1. **CI/CD**: GitHub Actions導入
2. **テスト**: Jest (Frontend) + pytest (Backend)
3. **コード品質**: Prettier, Black, mypy
4. **API ドキュメント**: Swagger UI 改善

### セキュリティ強化
1. **CSP**: Content Security Policy
2. **HTTPS**: 全通信のHTTPS化
3. **セキュリティヘッダー**: セキュリティヘッダー追加
4. **脆弱性スキャン**: 定期的なセキュリティチェック

### 運用・監視
1. **ログ集約**: 構造化ログ + ログ集約システム
2. **メトリクス**: アプリケーションメトリクス収集
3. **アラート**: エラー・パフォーマンス監視
4. **バックアップ**: データベースバックアップ戦略

---

## プロジェクト構成・ファイル構造

### フロントエンド構成
```
frontend/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # 共通コンポーネント
│   ├── feature/          # 機能別コンポーネント
│   ├── hooks/            # カスタムフック
│   ├── lib/              # ユーティリティ
│   └── services/         # API通信サービス
├── public/               # 静的アセット
├── package.json          # 依存関係管理
└── tailwind.config.ts    # Tailwind設定
```

### バックエンド構成
```
backend/
├── app/
│   ├── api/              # API エンドポイント
│   ├── database/         # データベース関連
│   ├── schemas/          # Pydantic スキーマ
│   ├── services/         # ビジネスロジック
│   └── utils/            # ユーティリティ
├── requirements.txt      # Python依存関係
├── alembic.ini           # マイグレーション設定
└── railway.toml          # デプロイ設定
```

この技術スタックにより、モダンで保守性が高く、スケーラブルなWebアプリケーションを実現しています。