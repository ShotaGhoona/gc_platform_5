-- ===================================
-- Supabase Storage Setup Instructions
-- ストレージ設定手順（管理画面で実行）
-- ===================================

-- このファイルはSQLエディタでは実行できません。
-- 以下の手順をSupabase管理画面で実行してください：

-- 1. Storage > Buckets で新しいバケットを作成
--    - Name: avatars
--    - Public bucket: ON (チェックを入れる)
--    - File size limit: 50MB
--    - Allowed MIME types: image/*

-- 2. Storage > Policies で以下のポリシーを作成
--    バケット「avatars」に対して：

-- ポリシー1: パブリック読み取り
-- Policy name: Public Access
-- Allowed operation: SELECT
-- Policy definition: true

-- ポリシー2: 認証ユーザーのアップロード  
-- Policy name: Authenticated users can upload avatars
-- Allowed operation: INSERT
-- Policy definition: true

-- ポリシー3: 認証ユーザーの更新
-- Policy name: Authenticated users can update avatars
-- Allowed operation: UPDATE  
-- Policy definition: true

-- ポリシー4: 認証ユーザーの削除
-- Policy name: Authenticated users can delete avatars
-- Allowed operation: DELETE
-- Policy definition: true

-- 注意: 本番環境では、より厳密なポリシーを設定することを推奨します
-- 例: auth.uid() = (storage.foldername(name))[1]::uuid
