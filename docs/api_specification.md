# API仕様書

## 概要
Ghoona Camp（朝活アプリ）のバックエンドAPI仕様書です。FastAPIを使用したRESTful APIとして設計され、朝活コミュニティの各種機能を提供します。

## 技術仕様
- **フレームワーク**: FastAPI 0.109.2
- **データベース**: PostgreSQL (SQLAlchemy 2.0.27)
- **認証**: Clerk + Discord OAuth2
- **バリデーション**: Pydantic
- **ドキュメント**: Swagger UI自動生成
- **CORS**: 設定済み（localhost:3000, 本番URL）

---

## API エンドポイント一覧

### 1. 基本情報エンドポイント

#### ユーザー数取得
```
GET /api/v1/users/count
```
**説明**: コミュニティの総ユーザー数を取得
**認証**: 不要
**レスポンス**:
```json
{
  "count": 1000
}
```

#### ヘルスチェック
```
GET /api/v1/health
```
**説明**: サーバーの稼働状況確認
**レスポンス**:
```json
{
  "status": "healthy"
}
```

---

### 2. 認証・ユーザー管理

#### Discord連携コールバック
```
POST /api/v1/auth/discord/callback
```
**説明**: Discord OAuth2認証後のコールバック処理
**パラメータ**:
- `code` (string, required): Discord認証コード
- `user_id` (string, required): ユーザーID

#### Discord ID設定
```
POST /api/v1/users/{user_id}/discord
PUT /api/v1/users/{user_id}/discord
```
**説明**: ユーザーのDiscord IDを設定・更新
**パラメータ**:
- `discord_id` (string): Discord ID

#### Discord ID取得
```
GET /api/v1/users/{user_id}/discord
```
**説明**: ユーザーのDiscord ID取得

---

### 3. プロフィール管理

#### 興味・スキル一覧取得
```
GET /api/v1/interests          # 興味一覧
GET /api/v1/core_skills        # コアスキル一覧
```
**レスポンスモデル**: `InterestSchema`, `CoreSkillSchema`

#### メンバー管理
```
GET /api/v1/members                    # メンバー一覧
GET /api/v1/members/detail/{user_id}   # メンバー詳細
```
**パラメータ** (`/members/detail/{user_id}`):
- `viewer_id` (string, query): 閲覧者ID

#### プロフィール作成・更新
```
POST /api/v1/members/{user_id}/profile   # 作成
PUT /api/v1/members/{user_id}/profile    # 更新
```
**形式**: `multipart/form-data`
**フィールド**:
- 基本情報: `username`, `bio`, `one_line_profile`, etc.
- JSON埋め込み: `interests`, `core_skills`, `sns`
- ファイル: `avatar_image`

#### ライバル機能
```
POST /api/v1/members/{user_id}/rival     # ライバル追加
DELETE /api/v1/members/{user_id}/rival   # ライバル削除
```
**パラメータ**:
- `target_id` (string): 対象ユーザーID

#### ビジョン取得
```
GET /api/v1/profile/vision/{user_id}
```
**レスポンスモデル**: `VisionSchema`

---

### 4. ダッシュボード・分析

#### ダッシュボード要約
```
GET /api/v1/dashboard/summary/
```
**パラメータ**:
- `user` (string, required): ユーザーID

#### 分析データ
```
GET /api/v1/dashboard/weekly-stats              # 週次統計
GET /api/v1/dashboard/attendance-user-profile   # 出席ユーザープロフィール
GET /api/v1/dashboard/weekly-flow               # 週次フロー
```
**パラメータ**:
- `user` (string): ユーザーID
- `start` (string): 開始日 (YYYY-MM-DD)
- `end` (string): 終了日 (YYYY-MM-DD)
- `attendanceType` (string): 出席タイプ

---

### 5. 出席管理

#### 個人出席データ
```
GET /api/v1/attendance/me
```
**パラメータ**:
- `user_id` (string, required): ユーザーID
- `month` (string, required): 対象月 (YYYYMM)

**レスポンスモデル**: `AttendanceDaysResponse`

#### ランキング
```
GET /api/v1/attendance/ranking/monthly    # 月間ランキング
GET /api/v1/attendance/ranking/total      # 総合ランキング
GET /api/v1/attendance/ranking/streaking  # 連続出席ランキング
```
**パラメータ**:
- `month` (string): 対象月 (monthly のみ)
- `user` (string, required): ユーザーID
- `rankingType` (string): "All" | "Rival"

**レスポンスモデル**: `MonthlyRankingResponse`, `TotalRankingResponse`, `StreakingRankingResponse`

---

### 6. 朝活イベント管理

#### タグ管理
```
GET /api/v1/morning_event_tags
```
**レスポンスモデル**: `list[MorningEventTag]`

#### イベント一覧・詳細
```
GET /api/v1/morning_events_list                    # 全イベント一覧
GET /api/v1/morning_events/participating           # 参加中イベント
GET /api/v1/morning_events/{event_id}              # イベント詳細
```
**パラメータ**:
- `month` (string): 対象月 (YYYYMM)
- `user_id` (string): ユーザーID

**レスポンスモデル**: `list[MorningEventListItem]`, `MorningEventDetail`

#### イベント操作
```
POST /api/v1/morning_events                        # イベント作成
PATCH /api/v1/morning_events/{event_id}            # イベント更新
DELETE /api/v1/morning_events/{event_id}           # イベント削除
```

#### 参加管理
```
POST /api/v1/morning_events/{event_id}/join        # 参加
POST /api/v1/morning_events/{event_id}/cancel      # キャンセル
```

---

### 7. 外部イベント管理

#### イベント管理
```
GET /api/v1/external_events                        # 一覧取得
GET /api/v1/external_events/{event_id}             # 詳細取得
POST /api/v1/external_events                       # 作成
PATCH /api/v1/external_events/{event_id}           # 更新
DELETE /api/v1/external_events/{event_id}          # 削除
```
**パラメータ** (GET 一覧):
- `tag_ids` (list[int], optional): タグID
- `keyword` (string, optional): キーワード検索
- `date_from` (date, optional): 開始日
- `date_to` (date, optional): 終了日

#### タグ管理
```
GET /api/v1/external_event_tags
```
**レスポンスモデル**: `list[ExternalEventTag]`

---

### 8. 月間目標管理

#### 目標CRUD操作
```
POST /api/v1/morning-goal                          # 作成
GET /api/v1/morning-goal/{goal_id}                 # 詳細取得
PUT /api/v1/morning-goal/{goal_id}                 # 更新
DELETE /api/v1/morning-goal/{goal_id}              # 削除
```
**リクエストモデル**: `MonthlyGoalCreate`, `MonthlyGoalUpdate`
**レスポンスモデル**: `MonthlyGoalResponse`

#### 目標一覧取得
```
GET /api/v1/morning-goal/public                    # 公開目標一覧
GET /api/v1/morning-goal/user/{user_id}            # ユーザー目標一覧
GET /api/v1/morning-goal/user/{user_id}/range      # 3ヶ月範囲
GET /api/v1/morning-goal/user/{user_id}/current    # 当月目標
```
**パラメータ** (`/range`):
- `center` (string): 中心月 (YYYY-MM)

**パラメータ** (`/current`):
- `month` (string): 対象月

---

### 9. ティアシステム

#### ティア情報
```
GET /api/v1/tiers/list/with_flag                   # フラグ付きティア一覧
GET /api/v1/tiers/detail/{tier_id}/with_flag       # ティア詳細
GET /api/v1/tiers/main_sub                         # メイン・サブティア
```
**パラメータ**:
- `user_id` (string): ユーザーID

**レスポンスモデル**: `List[TierFlag]`, `TierDetail`, `TierMainSub`

#### ティア管理
```
PATCH /api/v1/tiers/{tier_id}/role                 # ロール更新
```
**パラメータ**:
- `user_id` (string): ユーザーID
- `role` (string): ロール名

#### ティア付与
```
POST /api/v1/grant-tier/grant                      # アクション基づく付与
GET /api/v1/grant-tier/{tier_id}                   # ティア詳細
```
**パラメータ** (`/grant`):
- `user_id` (string): ユーザーID
- `action` (string): アクション名

---

### 10. ビジョン設定

#### AI チャット
```
POST /api/v1/vision/chat
```
**リクエスト**:
```json
{
  "messages": [
    {"role": "user", "content": "メッセージ"}
  ],
  "mode": "chat" | "suggest"
}
```

#### ビジョン確定
```
PATCH /api/v1/vision/confirm
```
**パラメータ**:
- `user_id` (string): ユーザーID
- `vision` (string): 確定ビジョン

---

### 11. システム通知

#### 通知管理
```
GET /api/v1/system_notices                         # 通知一覧
GET /api/v1/system_notices/{notice_id}             # 通知詳細
```
**レスポンスモデル**: `list[SystemNoticeListResponse]`, `SystemNoticeDetailResponse`

---

## データモデル

### リクエスト形式

#### 共通パラメータ
- **ユーザーID**: Clerk認証システムのユーザーID
- **日付形式**: 
  - 月: `YYYYMM` (例: "202501")
  - 日付: `YYYY-MM-DD` (例: "2025-01-20")
- **ページネーション**: 今後実装予定

#### バリデーション
- **必須パラメータ**: `Query(...)` または `Path(...)`
- **オプションパラメータ**: `Query(None)`
- **列挙値**: 事前定義された選択肢 ("All" | "Rival" 等)

### レスポンス形式

#### 成功レスポンス
```json
{
  // Pydanticスキーマに基づく構造化データ
}
```

#### エラーレスポンス
```json
{
  "detail": "エラーメッセージ"
}
```

#### HTTPステータスコード
- **200**: 成功
- **201**: 作成成功
- **400**: バリデーションエラー
- **404**: リソース未発見
- **409**: 重複エラー
- **422**: 処理不可能エンティティ

---

## 認証・認可

### 認証方式
1. **Clerk認証**: メイン認証システム
2. **Discord OAuth2**: 外部連携認証

### 認可レベル
- **パブリック**: ユーザー数、システム通知等
- **認証必須**: 個人データ、イベント管理等
- **権限チェック**: プロフィール編集、イベント削除等

### セキュリティ実装
- 環境変数による機密情報管理
- CORS設定によるオリジン制限
- OAuth2標準プロトコル準拠

---

## エラーハンドリング

### エラー分類
1. **バリデーションエラー** (400): 入力データの検証失敗
2. **認証エラー** (401): 認証情報不正
3. **認可エラー** (403): 権限不足
4. **リソースエラー** (404): データ未発見
5. **競合エラー** (409): データ重複
6. **サーバーエラー** (500): 内部処理エラー

### エラーレスポンス統一
```json
{
  "detail": "具体的なエラーメッセージ",
  "error_code": "ERROR_CODE",    // 今後実装
  "timestamp": "2025-01-20T..."  // 今後実装
}
```

---

## パフォーマンス・最適化

### 実装済み最適化
- **SQLAlchemy ORM**: 効率的なデータベースアクセス
- **Pydantic**: 高速なデータバリデーション
- **FastAPI**: 非同期処理対応

### 今後の最適化予定
- **キャッシュシステム**: Redis導入
- **データベース最適化**: インデックス追加
- **API レート制限**: 負荷制御
- **CDN統合**: 静的コンテンツ配信

---

## 技術的制約・制限事項

### 現在の制限
1. **ページネーション未実装**: 大量データの効率的取得が困難
2. **リアルタイム更新なし**: WebSocket等の双方向通信未対応
3. **ファイルアップロード制限**: 画像サイズ・形式の制限不明確
4. **API レート制限なし**: 大量リクエストに対する保護不足

### 互換性考慮
- **APIバージョニング**: `/api/v1/` プレフィックス使用
- **後方互換性**: 将来の変更に備えた設計
- **レスポンス拡張**: 新フィールド追加時の互換性維持

---

## 改善提案

### 緊急度: 高
1. **エンドポイント重複解決**: `morning_goal_endpoint.py`の重複定義修正
2. **統一認証実装**: 全エンドポイントでの一貫した認証チェック
3. **エラーハンドリング統一**: 標準エラーフォーマット導入

### 緊急度: 中
1. **ページネーション実装**: 大量データ対応
2. **API レート制限**: セキュリティ強化
3. **リアルタイム機能**: WebSocket導入検討
4. **ファイル管理強化**: アップロード制限・バリデーション

### 緊急度: 低
1. **API ドキュメント強化**: より詳細な仕様書
2. **テストカバレッジ向上**: 自動テスト拡充
3. **監視・ログ強化**: 運用面の改善
4. **国際化対応**: 多言語サポート

---

## 開発ガイドライン

### APIエンドポイント設計原則
1. **RESTful設計**: HTTPメソッドの適切な使用
2. **一貫性**: URL構造・レスポンス形式の統一
3. **セキュリティファースト**: 認証・認可の確実な実装
4. **パフォーマンス考慮**: 効率的なデータベースアクセス

### 新規エンドポイント追加時のチェックリスト
- [ ] HTTPメソッドの適切な選択
- [ ] URL構造の一貫性確認
- [ ] 認証・認可の実装
- [ ] バリデーションの設定
- [ ] エラーハンドリングの実装
- [ ] レスポンスモデルの定義
- [ ] ドキュメントの更新

この API仕様書により、開発チームは一貫した品質でAPIの開発・保守を行うことができます。