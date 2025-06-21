-- ===================================
-- External Events タグ配列化マイグレーション
-- 中間テーブルから配列型への移行
-- ===================================

BEGIN;

-- ===================================
-- 1. 既存データのバックアップ（念のため）
-- ===================================

-- 既存の関連データを一時的に保存するためのテーブル作成
CREATE TEMP TABLE temp_external_event_tags_backup AS
SELECT 
    ee.id as event_id,
    ee.title,
    array_agg(eet.name ORDER BY eet.name) as tag_names
FROM external_events ee
LEFT JOIN external_event_on_tags eeot ON ee.id = eeot.external_event_id
LEFT JOIN external_event_tags eet ON eeot.external_event_tag_id = eet.id
GROUP BY ee.id, ee.title;

-- ===================================
-- 2. external_eventsテーブルにtags_array列を追加
-- ===================================

ALTER TABLE external_events 
ADD COLUMN tags_array TEXT[];

-- ===================================
-- 3. 既存データの移行
-- ===================================

-- 中間テーブルからのデータを配列形式でexternal_eventsに移行
UPDATE external_events 
SET tags_array = backup.tag_names
FROM temp_external_event_tags_backup backup
WHERE external_events.id = backup.event_id
AND backup.tag_names IS NOT NULL;

-- タグが設定されていないイベントは空配列に設定
UPDATE external_events 
SET tags_array = ARRAY[]::TEXT[]
WHERE tags_array IS NULL;

-- ===================================
-- 4. 中間テーブルの削除
-- ===================================

-- 外部キー制約により、まず中間テーブルを削除
DROP TABLE IF EXISTS external_event_on_tags CASCADE;

-- ===================================
-- 5. 検証クエリ（実行後確認用）
-- ===================================

-- 移行結果の確認
-- SELECT 
--     id,
--     title,
--     tags_array,
--     array_length(tags_array, 1) as tag_count
-- FROM external_events
-- ORDER BY id;

-- external_event_tagsテーブルが残っていることを確認（UI選択肢用）
-- SELECT COUNT(*) as external_event_tags_count FROM external_event_tags;

-- ===================================
-- 6. インデックスの追加（パフォーマンス向上）
-- ===================================

-- 配列検索用のGINインデックスを追加
CREATE INDEX IF NOT EXISTS idx_external_events_tags_array_gin 
ON external_events USING GIN (tags_array);

-- ===================================
-- コミット
-- ===================================

COMMIT;

-- ===================================
-- マイグレーション完了
-- ===================================

-- 確認用: 移行されたデータの例
SELECT 
    'Migration completed. Sample data:' as status,
    COUNT(*) as total_events,
    COUNT(CASE WHEN array_length(tags_array, 1) > 0 THEN 1 END) as events_with_tags,
    COUNT(CASE WHEN array_length(tags_array, 1) IS NULL OR array_length(tags_array, 1) = 0 THEN 1 END) as events_without_tags
FROM external_events;