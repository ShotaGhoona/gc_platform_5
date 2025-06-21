# Supabase Storage Setup Guide
## avatarsバケットの設定手順

「new row violates row-level security policy」エラーを解決するために、Supabase管理画面で以下の設定を行ってください。

## 1. ストレージバケットの作成

### avatarsバケット（プロフィール画像用）
1. Supabaseダッシュボードにログイン
2. **Storage** > **Buckets** に移動
3. **New bucket** をクリック
4. 以下の設定で作成：
   - **Name**: `avatars`
   - **Public bucket**: ✅ ON（チェックを入れる）
   - **File size limit**: `50MB`
   - **Allowed MIME types**: `image/*`

### external-event-thumnailバケット（外部イベント画像用）
1. **Storage** > **Buckets** で再度 **New bucket** をクリック
2. 以下の設定で作成：
   - **Name**: `external-event-thumnail`
   - **Public bucket**: ✅ ON（チェックを入れる）
   - **File size limit**: `50MB`
   - **Allowed MIME types**: `image/*`

## 2. ストレージポリシーの設定

### avatarsバケット用ポリシー
1. **Storage** > **Policies** に移動
2. **avatars** バケットを選択
3. 以下の4つのポリシーを作成：

#### ポリシー1: パブリック読み取り
- **Policy name**: `Public Access`
- **Allowed operation**: `SELECT`
- **Policy definition**: `true`

#### ポリシー2: 認証ユーザーのアップロード
- **Policy name**: `Authenticated users can upload avatars`
- **Allowed operation**: `INSERT`
- **Policy definition**: `true`

#### ポリシー3: 認証ユーザーの更新
- **Policy name**: `Authenticated users can update avatars`
- **Allowed operation**: `UPDATE`
- **Policy definition**: `true`

#### ポリシー4: 認証ユーザーの削除
- **Policy name**: `Authenticated users can delete avatars`
- **Allowed operation**: `DELETE`
- **Policy definition**: `true`

### external-event-thumnailバケット用ポリシー
1. **Storage** > **Policies** で **external-event-thumnail** バケットを選択
2. 以下の4つのポリシーを作成：

#### ポリシー1: パブリック読み取り
- **Policy name**: `Public Access for External Events`
- **Allowed operation**: `SELECT`
- **Policy definition**: `true`

#### ポリシー2: 認証ユーザーのアップロード
- **Policy name**: `Authenticated users can upload external event images`
- **Allowed operation**: `INSERT`
- **Policy definition**: `true`

#### ポリシー3: 認証ユーザーの更新
- **Policy name**: `Authenticated users can update external event images`
- **Allowed operation**: `UPDATE`
- **Policy definition**: `true`

#### ポリシー4: 認証ユーザーの削除
- **Policy name**: `Authenticated users can delete external event images`
- **Allowed operation**: `DELETE`
- **Policy definition**: `true`

## 3. 設定確認

設定完了後、以下を確認してください：

1. **Storage** > **Buckets** で `avatars` バケットが表示される
2. バケットの **Public** 列に ✅ が表示される
3. **Storage** > **Policies** で4つのポリシーが表示される

## 4. テスト

設定完了後、プロフィール設定画面で画像アップロードをテストしてください。

## トラブルシューティング

### まだエラーが発生する場合

1. **ブラウザの開発者ツール** > **Console** でエラーログを確認
2. **Network** タブでHTTPリクエストの詳細を確認
3. Supabaseの **Logs** でサーバーサイドのエラーを確認

### より厳密なセキュリティが必要な場合

本番環境では、以下のようなより厳密なポリシーを使用することを推奨します：

```sql
-- ユーザーが自分のファイルのみアクセス可能
auth.uid()::text = (storage.foldername(name))[1]
```

ただし、この場合はClerkとSupabaseの認証連携が正しく動作している必要があります。
