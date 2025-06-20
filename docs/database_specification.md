# データベース仕様書

## 概要
Ghoona Camp（朝活アプリ）のデータベース仕様書です。本アプリケーションでは、朝活イベントの管理、ユーザープロフィール、出席管理、ティアシステム、月間目標管理などの機能を提供するため、以下のテーブル構成を採用しています。

## 技術仕様
- **データベース**: PostgreSQL
- **ORM**: SQLAlchemy
- **ID生成**: 
  - 文字列: Clerk ID（ユーザー認証）
  - UUID: uuid.uuid4()
  - 連番: autoincrement

---

## テーブル一覧

### 1. users（ユーザー）
ユーザーの基本情報を管理するメインテーブル

| カラム名 | 型 | 制約 | 説明 |
|----------|--------|------|------|
| clerk_id | String | PRIMARY KEY | Clerk認証システムのユーザーID |
| email | String | UNIQUE, NOT NULL | メールアドレス |
| username | String | nullable | ユーザー名 |
| discord_id | String | UNIQUE, nullable | Discord連携時のユーザーID |
| created_at | DateTime | DEFAULT now() | 作成日時 |
| updated_at | DateTime | onupdate now() | 更新日時 |

**リレーション:**
- profile: 1対1（Profile）
- user_tiers: 1対多（UserTier）
- hosted_events: 1対多（MorningEvent）- 主催イベント
- joined_events: 多対多（MorningEvent）- 参加イベント
- monthly_goals: 1対多（MonthlyGoal）
- attendance_flags: 1対多（AttendanceFlag）

---

### 2. profiles（プロフィール）
ユーザーの詳細プロフィール情報

| カラム名 | 型 | 制約 | 説明 |
|----------|--------|------|------|
| id | UUID | PRIMARY KEY | プロフィールID |
| user_id | String | FK(users.clerk_id), UNIQUE | 所属ユーザーID |
| username | String(60) | NOT NULL | 表示名 |
| vision | String(120) | nullable | ビジョン |
| bio | String(120) | nullable | 自己紹介 |
| one_line_profile | String(120) | nullable | 一行プロフィール |
| personal_color | String(60) | nullable | パーソナルカラー |
| background | Text | nullable | 背景情報 |
| avatar_image_url | Text | nullable | アバター画像URL |
| created_at | DateTime | DEFAULT now() | 作成日時 |
| updated_at | DateTime | onupdate now() | 更新日時 |
| deleted_at | DateTime | nullable | 削除日時（論理削除） |

**リレーション:**
- user: 1対1（User）
- interests: 多対多（Interest）- 興味・関心
- core_skills: 多対多（CoreSkill）- コアスキル  
- sns: 多対多（SNS）- SNSアカウント
- rivals: 多対多（Profile）- ライバル関係

#### 関連テーブル
- **interests**: 興味・関心マスター（id, name, color）
- **core_skills**: コアスキルマスター（id, name, color, icon）
- **sns**: SNSマスター（id, name）

#### 中間テーブル
- **profile_interest**: プロフィール⇔興味
- **profile_core_skill**: プロフィール⇔コアスキル
- **profile_sns**: プロフィール⇔SNS（link, description付き）
- **profile_rival**: プロフィール⇔ライバル

---

### 3. morning_events（朝活イベント）
朝活イベントの情報を管理

| カラム名 | 型 | 制約 | 説明 |
|----------|--------|------|------|
| id | UUID | PRIMARY KEY | イベントID |
| title | String(80) | NOT NULL | イベントタイトル |
| description | Text | nullable | イベント説明 |
| host_user_id | String | FK(users.clerk_id) | 主催者ID |
| start_at | DateTime | NOT NULL | 開始日時 |
| end_at | DateTime | NOT NULL | 終了日時 |
| created_at | DateTime | DEFAULT now() | 作成日時 |
| updated_at | DateTime | onupdate now() | 更新日時 |
| deleted_at | DateTime | nullable | 削除日時（論理削除） |

**リレーション:**
- host_user: 多対1（User）- 主催者
- participants: 多対多（User）- 参加者
- morning_event_tags: 多対多（MorningEventTag）- タグ

#### 関連テーブル
- **morning_event_tags**: イベントタグマスター（id, name, color）
- **morning_event_on_tags**: イベント⇔タグ中間テーブル
- **event_participants**: イベント⇔参加者中間テーブル（joined_at付き）

---

### 4. external_events（外部イベント）
外部イベント情報を管理

| カラム名 | 型 | 制約 | 説明 |
|----------|--------|------|------|
| id | Integer | PRIMARY KEY | イベントID |
| title | String(80) | NOT NULL | イベントタイトル |
| description | Text | nullable | イベント説明 |
| host_user_id | String | FK(users.clerk_id) | 主催者ID |
| image | String | nullable | イベント画像URL |
| start_at | DateTime | NOT NULL | 開始日時 |
| end_at | DateTime | NOT NULL | 終了日時 |
| created_at | DateTime | DEFAULT now() | 作成日時 |
| updated_at | DateTime | onupdate now() | 更新日時 |
| deleted_at | DateTime | nullable | 削除日時（論理削除） |

**リレーション:**
- tags: 多対多（ExternalEventTag）

#### 関連テーブル
- **external_event_tags**: 外部イベントタグマスター（id, name, color）
- **external_event_on_tags**: 外部イベント⇔タグ中間テーブル

---

### 5. tiers（ティア）
ユーザーランク・ティアの情報を管理

| カラム名 | 型 | 制約 | 説明 |
|----------|--------|------|------|
| id | Integer | PRIMARY KEY | ティアID |
| title_en | String(40) | NOT NULL | 英語タイトル |
| title_ja | String(40) | NOT NULL | 日本語タイトル |
| badge_color | String(10) | NOT NULL | バッジカラー |
| card_image_url | Text | nullable | カード画像URL |
| short_description | Text | nullable | 短い説明 |
| long_description | Text | nullable | 詳細説明 |
| story | Text | nullable | ストーリー |
| created_at | DateTime | DEFAULT now() | 作成日時 |
| deleted_at | DateTime | nullable | 削除日時（論理削除） |

**リレーション:**
- user_tiers: 1対多（UserTier）
- users: 多対多（User）

### 6. user_tiers（ユーザーティア）
ユーザーとティアの関係を管理

| カラム名 | 型 | 制約 | 説明 |
|----------|--------|------|------|
| id | UUID | PRIMARY KEY | 関係ID |
| user_id | String | FK(users.clerk_id) | ユーザーID |
| tier_id | Integer | FK(tiers.id) | ティアID |
| granted_at | DateTime | DEFAULT now() | 付与日時 |
| role | String(10) | nullable, indexed | ロール（main, sub1, sub2, sub3等） |

**リレーション:**
- user: 多対1（User）
- tier: 多対1（Tier）

---

### 7. monthly_goals（月間目標）
ユーザーの月間目標を管理

| カラム名 | 型 | 制約 | 説明 |
|----------|--------|------|------|
| id | Integer | PRIMARY KEY | 目標ID |
| user_id | String | FK(users.clerk_id) | ユーザーID |
| goal_text | Text | nullable | 目標テキスト |
| monthly_start_date | Date | nullable | 月間開始日 |
| is_public | Boolean | DEFAULT true | 公開フラグ |
| created_at | DateTime | DEFAULT now() | 作成日時 |
| deleted_at | DateTime | nullable | 削除日時（論理削除） |
| fb | Text | nullable | フィードバック |

**リレーション:**
- user: 多対1（User）

---

### 8. attendances（出席記録）
Discord参加の出席記録

| カラム名 | 型 | 制約 | 説明 |
|----------|--------|------|------|
| id | UUID | PRIMARY KEY | 出席ID |
| discord_id | String | NOT NULL | Discord ID |
| username | String | NOT NULL | ユーザー名 |
| channel | String | NOT NULL | チャンネル名 |
| joined_at | DateTime | NOT NULL | 参加日時 |

### 9. attendance_flags（出席フラグ）
ユーザーの日別出席状況を管理

| カラム名 | 型 | 制約 | 説明 |
|----------|--------|------|------|
| id | UUID | PRIMARY KEY | フラグID |
| user_id | String | FK(users.clerk_id) | ユーザーID |
| date | Date | NOT NULL | 対象日 |
| six_clock_flag | Boolean | DEFAULT false | 6時出席フラグ |
| created_at | DateTime | DEFAULT now() | 作成日時 |
| updated_at | DateTime | onupdate now() | 更新日時 |

**リレーション:**
- user: 多対1（User）

---

### 10. system_notices（システム通知）
システム通知情報を管理

| カラム名 | 型 | 制約 | 説明 |
|----------|--------|------|------|
| id | Integer | PRIMARY KEY | 通知ID |
| title | String | NOT NULL | タイトル |
| description | String | NOT NULL | 説明 |
| image_url | String | NOT NULL | 画像URL |
| publish_start_at | DateTime | NOT NULL | 公開開始日時 |
| publish_end_at | DateTime | NOT NULL | 公開終了日時 |
| created_at | DateTime | DEFAULT now() | 作成日時 |
| updated_at | DateTime | onupdate now() | 更新日時 |
| deleted_at | DateTime | nullable | 削除日時（論理削除） |

**リレーション:**
- tags: 多対多（SystemNoticeTag）

#### 関連テーブル
- **system_notice_tags**: システム通知タグマスター（id, name, color）
- **system_notice_on_tags**: システム通知⇔タグ中間テーブル

---

## 特記事項

### 1. 認証システム
- **Clerk**: ユーザー認証にClerkを使用
- **Discord連携**: discord_idによるDiscord連携機能

### 2. 論理削除
以下のテーブルで論理削除を実装:
- profiles
- morning_events
- external_events
- tiers
- monthly_goals
- system_notices

### 3. ティアシステム
- ユーザーは複数のティアを持つことができる
- roleカラムでメイン・サブティアを区別
- ティアには英語・日本語両方のタイトルを設定

### 4. イベント管理
- **朝活イベント**: 内部イベント（morning_events）
- **外部イベント**: 外部イベント（external_events）
- 両方ともタグ機能を持つ

### 5. 出席管理
- **attendances**: Discord参加の生ログ
- **attendance_flags**: 日別集計された出席フラグ

### 6. プロフィール機能
- 興味・関心、コアスキル、SNSの多対多関係
- ライバル機能（プロフィール同士の関係）
- ビジョン設定機能