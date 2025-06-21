-- ===================================
-- Ghoona Camp Database 完全クリーンアップ
-- 全テーブルとデータの削除
-- ===================================

BEGIN;

-- ===================================
-- 1. トリガーの削除
-- ===================================
DROP TRIGGER IF EXISTS update_system_notice_on_tags_updated_at ON system_notice_on_tags;
DROP TRIGGER IF EXISTS update_system_notice_tags_updated_at ON system_notice_tags;
DROP TRIGGER IF EXISTS update_system_notices_updated_at ON system_notices;
DROP TRIGGER IF EXISTS update_attendance_flags_updated_at ON attendance_flags;
DROP TRIGGER IF EXISTS update_external_events_updated_at ON external_events;
DROP TRIGGER IF EXISTS update_morning_events_updated_at ON morning_events;
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
DROP TRIGGER IF EXISTS update_users_updated_at ON users;

-- ===================================
-- 2. 関数の削除
-- ===================================
DROP FUNCTION IF EXISTS update_updated_at_column();

-- ===================================
-- 3. テーブルの削除（外部キー制約順序に従って）
-- ===================================

-- 中間テーブル・関連テーブルから削除
DROP TABLE IF EXISTS system_notice_on_tags CASCADE;
DROP TABLE IF EXISTS external_event_on_tags CASCADE;
DROP TABLE IF EXISTS morning_event_on_tags CASCADE;
DROP TABLE IF EXISTS event_participants CASCADE;
DROP TABLE IF EXISTS profile_rival CASCADE;
DROP TABLE IF EXISTS profile_sns CASCADE;
DROP TABLE IF EXISTS user_tiers CASCADE;
DROP TABLE IF EXISTS attendance_flags CASCADE;
DROP TABLE IF EXISTS attendances CASCADE;
DROP TABLE IF EXISTS monthly_goals CASCADE;

-- イベント関連テーブル
DROP TABLE IF EXISTS external_events CASCADE;
DROP TABLE IF EXISTS morning_events CASCADE;

-- マスターテーブル
DROP TABLE IF EXISTS system_notices CASCADE;
DROP TABLE IF EXISTS system_notice_tags CASCADE;
DROP TABLE IF EXISTS external_event_tags CASCADE;
DROP TABLE IF EXISTS morning_event_tags CASCADE;
DROP TABLE IF EXISTS tiers CASCADE;
DROP TABLE IF EXISTS sns CASCADE;
DROP TABLE IF EXISTS core_skills CASCADE;
DROP TABLE IF EXISTS interests CASCADE;

-- メインテーブル
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ===================================
-- 4. インデックスの削除（テーブル削除で自動削除されるが念のため）
-- ===================================
-- インデックスは CASCADE で自動削除される

-- ===================================
-- 5. シーケンスの削除
-- ===================================
DROP SEQUENCE IF EXISTS interests_id_seq CASCADE;
DROP SEQUENCE IF EXISTS core_skills_id_seq CASCADE;
DROP SEQUENCE IF EXISTS sns_id_seq CASCADE;
DROP SEQUENCE IF EXISTS tiers_id_seq CASCADE;
DROP SEQUENCE IF EXISTS external_event_tags_id_seq CASCADE;
DROP SEQUENCE IF EXISTS external_events_id_seq CASCADE;
DROP SEQUENCE IF EXISTS external_event_on_tags_id_seq CASCADE;
DROP SEQUENCE IF EXISTS monthly_goals_id_seq CASCADE;
DROP SEQUENCE IF EXISTS system_notice_tags_id_seq CASCADE;
DROP SEQUENCE IF EXISTS system_notices_id_seq CASCADE;
DROP SEQUENCE IF EXISTS system_notice_on_tags_id_seq CASCADE;

-- ===================================
-- 6. 拡張機能の削除（必要に応じて）
-- ===================================
-- uuid-ossp拡張は他で使用される可能性があるため、削除しない
-- DROP EXTENSION IF EXISTS "uuid-ossp";

-- ===================================
-- コミット
-- ===================================

COMMIT;

-- ===================================
-- 削除確認用クエリ（実行後に確認用として使用）
-- ===================================

-- データベース内のテーブル一覧確認
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- 関数一覧確認
-- SELECT routine_name FROM information_schema.routines WHERE routine_schema = 'public';

-- シーケンス一覧確認
-- SELECT sequence_name FROM information_schema.sequences WHERE sequence_schema = 'public';

-- ===================================
-- 完全クリーンアップ完了
-- ===================================