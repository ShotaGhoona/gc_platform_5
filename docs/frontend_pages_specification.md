# フロントエンドページ仕様書

## 概要
Ghoona Camp（朝活アプリ）のフロントエンドページ仕様書です。本アプリケーションは、朝活コミュニティの運営と参加者のエンゲージメント向上を目的としたWebアプリケーションです。

## 技術仕様
- **フレームワーク**: Next.js 15.3.2 (App Router)
- **認証**: Clerk (@clerk/nextjs@6.19.1)
- **スタイリング**: Tailwind CSS v4
- **UI ライブラリ**: Radix UI
- **言語**: TypeScript
- **画像**: SVG + JPG/PNG
- **アーキテクチャ**: Feature-based + Component-driven

---

## ページ一覧

### 1. メインページ (`/`)
**ファイル**: `src/app/page.tsx`

#### 目的と役割
- 未認証ユーザー向けサービス紹介ランディングページ
- 認証済みユーザーの自動ダッシュボードリダイレクト
- 新規登録促進のCTAページ

#### 主要機能
- Clerk認証状態による自動リダイレクト (`userId` → `/dashboard`)
- サービス価値提案とコミュニティ紹介
- 3つの特徴紹介（朝活・有益情報・仲間）
- 参加者数表示（1000人）
- 日本地図によるコミュニティ規模感演出

#### UI構成
- **ヘッダー**: ロゴ + キャッチフレーズ「朝から今日から人生を豊かに」
- **メインコンテンツ**: サービス説明 + ヒーローイラスト
- **特徴カード**: 3枚の機能紹介カード
- **CTA**: 「今すぐはじめる」ボタン → `/sign-in`

#### スタイリング
- グラデーション背景: `from-[#ABBDD8] to-[#DFBEC4]`
- レスポンシブデザイン (md:breakpoint)
- ドロップシャドウ効果
- カード型UI (白背景 + 透明度)

#### 技術実装
```typescript
export const dynamic = 'force-dynamic';
const { userId } = await auth();
if (userId) { redirect("/dashboard"); }
```

---

### 2. 認証ページ

#### 2.1 サインインページ (`/sign-in`)
**ファイル**: `src/app/(auth)/sign-in/[[...rest]]/page.tsx`

#### 2.2 サインアップページ (`/sign-up`)
**ファイル**: `src/app/(auth)/sign-up/[[...rest]]/page.tsx`

#### 共通仕様
- **認証システム**: Clerk統合
- **ルート保護**: middleware.tsによる自動リダイレクト
- **レイアウト**: 2分割 (ブランディング50% + フォーム50%)
- **背景画像**: sign-in-bg.jpg / sign-up-bg.jpg
- **ブランディング要素**: ロゴ + "welcome to GhoonaCamp"

#### 認証フロー
1. 未認証ユーザー → 認証ページ表示
2. 認証成功 → `/dashboard`にリダイレクト
3. 認証済みアクセス → `/dashboard`に自動リダイレクト

#### Clerkコンポーネント
- `<SignIn />` / `<SignUp />`
- キャッチオールルート `[[...rest]]` でClerk内部ルーティング対応
- `ClerkProvider`でアプリ全体をラップ

---

### 3. Homeグループページ

#### 3.1 ホームページ (`/home`)
**ファイル**: `src/app/(home)/home/page.tsx`
**コンポーネント**: `src/feature/home/home/display/index.tsx`

##### 目的と役割
- ウェルカムページ・エントリーポイント
- 朝活コミュニティへの導入と動機付け
- "Kick-Start the Day, Ghoona-Style"

##### 主要機能
- **Hero Section**: 
  - 大型日付表示 (`text-9xl`)
  - ユーザーティア画像の重ね合わせ表示
  - グラデーション背景による温かみ演出
- **Member Section**:
  - コミュニティメンバー数表示
  - 日本地図によるコミュニティ規模感
- **お知らせ機能**:
  - システムお知らせ一覧
  - タグ付きお知らせ
  - サイドピーク詳細表示

##### 使用hooks・サービス
- `useMainSubTierThumbnails`: ティア情報取得
- `useUserCount`: メンバー数取得  
- `useSystemNoticeList/Detail`: お知らせ取得

##### API連携
```
GET /api/v1/members/count
GET /api/v1/system-notices/
GET /api/v1/system-notices/${noticeId}
```

#### 3.2 ダッシュボードページ (`/dashboard`)
**ファイル**: `src/app/(home)/dashboard/page.tsx`
**コンポーネント**: `src/feature/home/dashboard/display/index.tsx`

##### 目的と役割
- 詳細な分析・管理画面
- ユーザー活動データの可視化と分析
- "Track, Adapt, Triumph"

##### 主要機能
- **Vision Container**: ユーザービジョン表示
- **Dashboard Cards**: 5つのKPI指標
  - 前月比較機能
  - データドリブンな改善指標
- **分析機能**:
  - 週次/月次分析切り替え
  - 日付範囲選択
  - リアルタイム参加者表示
- **コミュニティ機能**:
  - ティアカード表示
  - ランキング表示
  - プロフィール詳細ポップアップ

##### 使用hooks・サービス
- `useDashboardSummary`: KPI指標データ取得
- `usePopUp`: モーダル制御
- `useUser` (Clerk): 認証ユーザー情報

##### API連携
```
GET /api/v1/dashboard/summary/?user=${userId}
GET /api/v1/members/detail/${userId}
```

---

### 4. 共通レイアウト

#### 4.1 サイドバー (`src/components/display/sidebar.tsx`)
- **レスポンシブ幅**: `w-[64px]` → `hover:w-[200px]`
- **アニメーション**: `transition-all duration-300`
- **ナビゲーション**: 3グループ (Home, Morning, Information)
- **アクティブ状態**: パス一致でアクセントカラー表示

#### 4.2 ヘッダー (`src/components/display/header.tsx`)
- **高さ**: `h-[45px]`
- **機能**: ページタイトル・ユーザープロフィール・ドロップダウンメニュー
- **レスポンシブ**: モバイル対応メニュー

---

### 5. Morningグループページ (6ページ)

#### 5.1 朝活イベント管理 (`/morning-event`)
**ファイル**: `src/app/(morning)/morning-event/page.tsx`
**コンポーネント**: `src/feature/morning/morningEvent/display/index.tsx`

##### 目的と役割
- 朝活イベントの作成、編集、閲覧、参加管理
- ユーザーが朝活イベントを主催したり、他のユーザーのイベントに参加できる中核機能

##### 主要機能とUI構成
- **ビュー切り替え**: ギャラリービューとカレンダービューの2つの表示形式
- **月次フィルタ**: 年月を指定してイベントを絞り込み表示
- **イベント作成**: 新規イベント作成ボタンとモーダル
- **サイドピーク**: イベント詳細をサイドパネルで表示
- **プロフィール表示**: 参加者のプロフィールをポップアップで表示

##### 使用コンポーネント
- `MorningEventGalleryView`: グリッド形式のイベント一覧表示
- `MorningEventCalendarView`: カレンダー形式のイベント表示
- `AddMorningEventModal`: イベント作成モーダル
- `EditMorningEventModal`: イベント編集モーダル
- `ViewSelect`: ビュー切り替えコンポーネント

##### API連携
```
POST /api/v1/morning-events/    # イベント作成
GET  /api/v1/morning-events/    # イベント一覧取得
PUT  /api/v1/morning-events/{id}  # イベント更新
```

#### 5.2 月間目標管理 (`/monthly-goal`)
**ファイル**: `src/app/(morning)/monthly-goal/page.tsx`
**コンポーネント**: `src/feature/morning/monthlyGoal/display/index.tsx`

##### 目的と役割
- 月次の目標設定とフィードバック管理
- 前月、当月、来月の3カラム表示で目標の継続性を視覚化

##### 主要機能とUI構成
- **3カラムレイアウト**: 左（前月）、中央（当月）、右（来月）の時系列表示
- **目標追加**: 選択した月の目標を追加
- **フィードバック記入**: 目標に対する振り返りを記入
- **月次ナビゲーション**: 月を変更して異なる期間の目標を表示

##### 使用コンポーネント
- `GoalColumn`: 月別の目標一覧表示コンポーネント
- `EditGoalPopUpChildren`: 目標編集モーダル
- `EditFbPopUpChildren`: フィードバック編集モーダル

##### API連携
```
GET  /api/v1/monthly-goals/     # 月間目標一覧取得
POST /api/v1/monthly-goals/     # 目標作成
PUT  /api/v1/monthly-goals/{id} # 目標更新
DELETE /api/v1/monthly-goals/{id} # 目標削除
```

#### 5.3 ティアカード表示 (`/tier-card`)
**ファイル**: `src/app/(morning)/tier-card/page.tsx`
**コンポーネント**: `src/feature/morning/tier-card/display/index.tsx`

##### 目的と役割
- 朝活の継続度や参加度に応じたティア（階級）システムの表示
- ゲーミフィケーション要素としてユーザーのモチベーション向上

##### 主要機能とUI構成
- **グリッドレイアウト**: レスポンシブなティアカード一覧表示
- **達成状況表示**: 達成済みのティアは鮮明、未達成はブラー・透明度処理
- **詳細表示**: クリックでティア詳細をポップアップ表示
- **プログレス表示**: 各ティアの達成条件と現在の進捗

##### 使用コンポーネント
- `TierCardGridItem`: 個別のティアカード表示
- `TierDetailPopUpChildren`: ティア詳細モーダル

##### hooks・サービス
- `useTier`: ティア情報取得とステータス管理

#### 5.4 月間分析 (`/month-analysis`)
**ファイル**: `src/app/(morning)/month-analysis/page.tsx`
**コンポーネント**: `src/feature/morning/month-analysis/display/index.tsx`

##### 目的と役割
- 個人の朝活データの月次分析とダッシュボード表示
- 出席状況、イベント参加状況の可視化

##### 主要機能とUI構成
- **統計ダッシュボード**: 4つの主要指標を表示
  - 月次出席日数
  - 総出席日数
  - イベント開催回数（月次/総計）
  - イベント参加回数（月次/総計）
- **月次カレンダー**: 出席日とイベント参加日を可視化
- **イベント詳細**: カレンダーからイベント詳細を表示

##### 使用コンポーネント
- `MonthCalendar`: 月次カレンダー表示
- `AttendanceCountThisMonth/Total`: 出席日数統計
- `MorningEventCountHost/Participate`: イベント関連統計

##### hooks・サービス
- `useAttendance`: 出席データ取得
- `useParticipatingEvents`: イベント参加データ取得

#### 5.5 ランキング (`/ranking`)
**ファイル**: `src/app/(morning)/ranking/page.tsx`
**コンポーネント**: `src/feature/morning/ranking/display/index.tsx`

##### 目的と役割
- 朝活コミュニティ内でのランキング表示
- 競争要素によるモチベーション向上

##### 主要機能とUI構成
- **3種類のランキング**: 
  - 月間ランキング
  - 総合ランキング
  - 連続出席ランキング
- **月次フィルタ**: 月間ランキングの対象月を変更
- **プロフィール表示**: ランカーのプロフィール詳細表示

##### 使用コンポーネント
- `TopRankingThisMonth`: 月間ランキング表示
- `TopRankingAllSeason`: 総合ランキング表示
- `StreakRanking`: 連続出席ランキング表示
- `RankerContainer`: 個別ランカー表示

##### hooks・サービス
- `useAttendanceRanking`: ランキングデータ取得

#### 5.6 ライバル比較 (`/rival`)
**ファイル**: `src/app/(morning)/rival/page.tsx`
**コンポーネント**: `src/feature/morning/rival/display/index.tsx`

##### 目的と役割
- 他のユーザーとの朝活データ比較
- ライバル機能によるモチベーション向上

##### 主要機能とUI構成
- **比較カレンダー**: 自分と他ユーザーの出席状況を比較表示
- **分析ビュー**: 週次分析とフロー分析の切り替え
- **ライバルランキング**: ライバル限定のランキング表示
- **期間選択**: 比較対象期間の選択

##### 使用コンポーネント
- `RivalCompareCalendar`: ライバル比較カレンダー
- `AnalysisTypeSelect`: 分析タイプ選択
- `WeeklyAnalysis/WeeklyFlow`: 週次分析コンポーネント

##### hooks・サービス
- `useRival`: ライバル比較データ取得

---

### 6. Informationグループページ (3ページ)

#### 6.1 外部イベント管理 (`/external-events`)
**ファイル**: `src/app/(information)/external-events/page.tsx`
**コンポーネント**: `src/feature/information/external-events/display/index.tsx`

##### 目的と役割
- コミュニティの外部イベント（勉強会、セミナー、ワークショップ等）の管理・共有
- イベントの作成、編集、削除、フィルタリング機能を提供

##### 主要機能とUI構成
- **イベント一覧表示**: グリッドレイアウト（レスポンシブ対応）
- **フィルタリング機能**: タグベースでのイベント絞り込み
- **新規イベント作成**: モーダルによるイベント登録
- **イベント詳細表示**: サイドピークによる詳細情報表示
- **イベント編集・削除**: 主催者限定の管理機能

##### 使用コンポーネント
- `EventList`: イベント一覧表示
- `EventContainer`: 個別イベントカード
- `ExternalEventDetailSidePeakChildren`: 詳細表示
- `AddExternalEventPopUpChildren`: 新規作成フォーム
- `EditExternalEventPopUpChildren`: 編集フォーム
- `FilterPopUpChildren`: フィルタ設定
- `SelectedTagChips`: 選択中タグ表示

##### hooks・サービス・API連携
```typescript
// Hooks
- useCreateExternalEvent: イベント作成
- useUpdateExternalEvent: イベント更新
- useDeleteExternalEvent: イベント削除
- useExternalEventFilter: フィルタ状態管理

// API Endpoints
- GET /api/v1/external_events
- GET /api/v1/external_event_tags
- POST /api/v1/external_events
- PATCH /api/v1/external_events/{id}
- DELETE /api/v1/external_events/{id}
```

##### 技術実装詳細
- **状態管理**: React Context API（ExternalEventFilterContext）
- **画像管理**: Supabase Storage統合
- **認証**: Clerk統合（ユーザー認証・権限管理）
- **レスポンシブ**: grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5

#### 6.2 メンバー一覧 (`/member`)
**ファイル**: `src/app/(information)/member/page.tsx`
**コンポーネント**: `src/feature/information/member/display/index.tsx`

##### 目的と役割
- コミュニティメンバーの一覧表示
- メンバープロフィールの確認機能

##### 主要機能とUI構成
- **メンバー一覧**: カード形式でのメンバー表示
- **プロフィール詳細**: モーダルによる詳細情報表示

##### 使用コンポーネント
- `MemberContainer`: メンバーカード
- `ProfileDetailPopUpChildren`: プロフィール詳細モーダル

##### hooks・サービス・API連携
```typescript
// Hooks
- useProfileList: メンバー一覧取得
- usePopUp: モーダル状態管理

// API Endpoints
- GET /api/v1/members
```

##### 技術実装詳細
- **レスポンシブ**: grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7
- **カラーテーマ**: personalColorによる個別カラー設定
- **画像表示**: aspect-square object-cover

#### 6.3 ナレッジ共有 (`/knowledge`)
**ファイル**: `src/app/(information)/knowledge/page.tsx`
**コンポーネント**: `src/feature/information/knowledge/display/index.tsx`

##### 目的と役割
- 知識・ノウハウ共有機能（現在未実装）
- 早起きライフスタイル情報ハブ（将来実装予定）

##### 実装状況
- プレースホルダーのみ実装
- 今後の機能拡張予定

---

### 7. Settingグループページ (4ページ)

#### 7.1 Discord設定 (`/discord-setting`)
**ファイル**: `src/app/(setting)/discord-setting/page.tsx`
**コンポーネント**: `src/feature/setting/discord-setting/display/index.tsx`

##### 目的と役割
- DiscordアカウントとGhoonaプラットフォームの連携機能を提供
- OAuth2認証フローを通じてDiscordアカウント情報を取得・保存

##### 主要機能
- **OAuth2認証**: Discord認証URL生成とリダイレクト処理
- **認証状態管理**: 連携済み/未連携状態の表示
- **エラーハンドリング**: 認証失敗時の適切なフィードバック

##### 技術実装
```typescript
// 認証URL生成とリダイレクト
const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || "1351805321676460042";
const redirectUri = encodeURIComponent("http://localhost:3000/setting/discord-setting/callback");
const url = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=identify`;
```

##### API連携
- **GET** `/api/v1/users/${userId}/discord` - Discord ID取得
- **POST** `/api/v1/users/${userId}/discord` - Discord ID設定

##### hooks・サービス
- `useDiscordSetting`: Discord連携状態管理

#### 7.2 Discord連携コールバック (`/discord-setting/callback`)
**ファイル**: `src/app/(setting)/discord-setting/callback/page.tsx`
**コンポーネント**: `src/feature/setting/discord-setting-callback/display/index.tsx`

##### 目的と役割
- OAuth2認証後のコールバック処理
- 認証コードを受け取りDiscord連携を完了

##### 主要機能
- **認証コード処理**: URLパラメータからcodeを取得
- **連携完了処理**: サーバーサイドでのトークン交換と情報保存
- **結果表示**: 成功/失敗状態の視覚的フィードバック

##### データフロー
1. Discord OAuth2 → code取得
2. `useDiscordCallback` hook → API呼び出し
3. サーバーサイド処理 → Discord API連携
4. 結果返却 → UI更新

##### API連携
- **POST** `/api/v1/auth/discord/callback` - Discord認証コールバック処理

##### hooks・サービス
- `useDiscordCallback`: コールバック処理管理

#### 7.3 プロフィール設定 (`/profile-setting`)
**ファイル**: `src/app/(setting)/profile-setting/page.tsx`
**コンポーネント**: `src/feature/setting/profile-setting/display/index.tsx`

##### 目的と役割
- ユーザーの詳細プロフィール情報の作成・編集
- 3段階のステップ形式でプロフィール入力を支援

##### 主要機能とUI構成

###### ステップ1: 基本情報
- ユーザーネーム（必須）
- 公開フレーズ（15文字以内、プリセット選択可能）
- One-Line Profile（30文字以内、プリセット選択可能）
- Background（140文字以内）
- アバター画像アップロード（ドラッグ&ドロップ対応）
- パーソナルカラー選択

###### ステップ2: 詳細情報
- 興味・関心タグ選択
- コアスキルタグ選択
- 動的タグフィルタリング機能

###### ステップ3: SNS情報
- 複数SNSアカウント追加（Instagram, Facebook, X, LinkedIn, Website, TikTok, GitHub）
- 各SNSの説明文設定（プリセット選択可能）

##### 使用コンポーネント
- `BasicProfileForm`: 基本情報入力フォーム
- `DetailProfileForm`: 詳細情報入力フォーム
- `SnsForm`: SNS情報入力フォーム
- `AvatarUpload`: アバター画像アップロード
- `Preview`: プロフィールプレビュー
- `StepIndicator`: ステップ進行表示

##### hooks・サービス・API連携
```typescript
// Hooks
- useProfileForm: プロフィールフォーム状態管理
- useProfileFormValidation: バリデーション
- useInterestCoreskillTags: タグ情報取得

// API Endpoints
- GET /api/v1/members/detail/${userId} - プロフィール情報取得
- POST/PUT /api/v1/members/${userId}/profile - プロフィール保存・更新（FormData形式）
```

##### データフロー
```typescript
// プロフィール保存フロー
const handleSave = async () => {
  // 1. バリデーション実行
  if (!validateAll(basicForm)) return;
  
  // 2. 画像アップロード（Supabase Storage）
  if (avatarFile) {
    const { data } = await supabase.storage
      .from('avatars')
      .upload(filePath, avatarFile);
    avatarUrl = supabase.storage.from('avatars').getPublicUrl(data.path).data.publicUrl;
  }
  
  // 3. プロフィールデータ保存
  await save({
    ...basicForm,
    interests: selectedInterests,
    core_skills: selectedCoreSkills,
    avatar_image_url: avatarUrl,
    sns: processedSnsList
  });
};
```

#### 7.4 ビジョン設定 (`/vision-setting`)
**ファイル**: `src/app/(setting)/vision-setting/page.tsx`
**コンポーネント**: `src/feature/setting/vision-setting/display/index.tsx`

##### 目的と役割
- AIとの対話を通じてユーザーの人生ビジョンを策定
- 会話モードと提案モードの2つのアプローチを提供

##### 主要機能とUI構成

###### モード切り替え
- **会話モード**: AIとの自由な対話でビジョンを探索
- **提案モード**: AIが具体的なビジョン案を4つ提案

###### インタラクション
- リアルタイムチャット機能
- ビジョンアイデアのGood/Bad評価
- 選択したアイデアの編集・調整機能

###### ポップアップガイド
- 使い方説明（4ステップのビジョン策定プロセス）
- 設定方法選択（AI対話 vs 手動入力）

##### 使用コンポーネント
- `VisionSettingChatContainer`: チャット機能
- `VisionIdeaContainer`: アイデア表示・評価
- `SaveVisionContainer`: ビジョン保存
- `ConfirmationView`: 確認画面
- `VisionConfirmPopUpChildren`: 確認ポップアップ
- `VisionPageExplainPopUpChildren`: 説明ポップアップ
- `VisionSettingWaySelectPopUpChildren`: 方法選択ポップアップ

##### hooks・サービス・API連携
```typescript
// Hooks
- useVisionSettingChat: チャット機能管理
- useVisionConfirm: ビジョン確認・保存

// API Endpoints
- POST /api/v1/vision/chat - AI会話・提案生成
- PATCH /api/v1/vision/confirm - ビジョン確定・保存
```

##### データフロー
```typescript
// ビジョン設定フロー
const handleSendWithIdeas = async () => {
  const { mode: resultMode, ideas: newIdeas } = await handleSend(mode);
  if (resultMode === "vision" && newIdeas && newIdeas.length > 0) {
    setIdeas([
      ...ideas,
      ...newIdeas.map((idea) => ({
        ...idea,
        stage: "idea" as const,
      })),
    ]);
  }
};
```

##### 技術実装詳細
- **AI統合**: OpenAI API連携
- **リアルタイム通信**: チャット機能の実装
- **状態管理**: 複雑なワークフロー状態の管理
- **UI/UX**: インタラクティブなガイダンス機能

---

## デザインシステム

### カラーパレット
- **プライマリ**: `#ABBDD8` (ブルー系)
- **セカンダリ**: `#DFBEC4` (ピンク系)  
- **アクセント**: `#D68897` (CTA・強調)
- **テキスト**: `#5D6B80` (メインテキスト)
- **背景**: `#EEEEEE` (アプリ背景)

### レスポンシブブレークポイント
- **モバイル**: デフォルト
- **タブレット**: `md:` (768px+)
- **デスクトップ**: `lg:` (1024px+)

### コンポーネント設計原則
- **Feature-based Architecture**: 機能単位でのディレクトリ構成
- **Atomic Design**: atoms → molecules → organisms
- **Composition over Inheritance**: コンポーネント合成
- **Single Responsibility**: 単一責任の原則

---

## 技術実装詳細

### 認証・セキュリティ
- **Clerk統合**: 認証状態管理・セッション管理
- **Middleware保護**: 未認証アクセスの自動リダイレクト
- **役割ベースアクセス制御**: 今後実装予定

### パフォーマンス最適化
- **Next.js App Router**: サーバーコンポーネント活用
- **Dynamic Imports**: コード分割
- **Image Optimization**: Next.js Image最適化
- **静的アセット**: SVG・最適化画像の使用

### 状態管理
- **React Hooks**: useState, useEffect
- **Custom Hooks**: ビジネスロジックの分離
- **Context API**: グローバル状態（必要に応じて）
- **Server State**: API連携データの管理

---

## 今後の改善点

### 技術的改善
1. **不足画像ファイル**: tierアイコン画像の追加
2. **動的データ**: 参加者数の動的表示
3. **エラーハンドリング**: API通信エラーの適切な処理
4. **ローディング状態**: スケルトンUI・ローディングスピナー
5. **SEO最適化**: メタデータ・構造化データ

### UX改善
1. **アクセシビリティ**: WAI-ARIA対応
2. **パフォーマンス**: 初期読み込み速度最適化
3. **オフライン対応**: PWA機能
4. **多言語対応**: 国際化 (i18n)
5. **通知機能**: リアルタイム通知

### 機能拡張
1. **ダークモード**: テーマ切り替え機能
2. **検索機能**: 全体検索・絞り込み
3. **ソーシャル機能**: フォロー・メッセージ
4. **ガミフィケーション**: ポイント・バッジシステム
5. **分析機能**: より詳細なデータ分析