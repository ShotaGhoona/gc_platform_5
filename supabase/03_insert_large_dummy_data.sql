-- ===================================
-- 特定ユーザー（user_2wqs4h1PsScPc5GkefezBEMSern）用
-- 大量ダミーデータ挿入SQL
-- ===================================

-- ===================================
-- 1. 指定ユーザーの基本データ作成
-- ===================================

-- ユーザー作成
INSERT INTO users (clerk_id, email, username, discord_id) VALUES
('user_2wqs4h1PsScPc5GkefezBEMSern', 'test.user.main@ghoona.camp', 'test_main_user', 'discord_test_main_001')
ON CONFLICT (clerk_id) DO NOTHING;

-- プロフィール作成
INSERT INTO profiles (user_id, username, vision, bio, one_line_profile, personal_color, background, avatar_image_url) VALUES
('user_2wqs4h1PsScPc5GkefezBEMSern', 'テストメインユーザー', '朝活を通じて最高の自分になる', 'Ghoona Campのメインテストユーザーです。様々な機能をテストしながら朝活ライフを満喫しています！', '朝活ライフを極めるテストユーザー', '#FF6B6B', 'プログラミング、デザイン、マーケティングに興味があり、朝の時間を有効活用してスキルアップを図っています。読書と運動も欠かさず、バランスの取れた朝活を心がけています。', 'https://example.com/avatar/test_main.jpg')
ON CONFLICT (user_id) DO NOTHING;

-- 興味・関心の関連付け（全分野）
INSERT INTO profile_interest (profile_id, interest_id) 
SELECT p.id, i.id 
FROM profiles p, interests i 
WHERE p.user_id = 'user_2wqs4h1PsScPc5GkefezBEMSern'
ON CONFLICT DO NOTHING;

-- コアスキルの関連付け（主要スキル）
INSERT INTO profile_core_skill (profile_id, core_skill_id) 
SELECT p.id, cs.id 
FROM profiles p, core_skills cs 
WHERE p.user_id = 'user_2wqs4h1PsScPc5GkefezBEMSern'
AND cs.name IN ('JavaScript', 'Python', 'React', 'Figma', 'UI/UX', '英語', 'プロジェクト管理', 'コミュニケーション')
ON CONFLICT DO NOTHING;

-- SNSリンク追加
INSERT INTO profile_sns (profile_id, sns_id, link, description)
SELECT p.id, s.id, 
    CASE 
        WHEN s.name = 'GitHub' THEN 'https://github.com/test-main-user'
        WHEN s.name = 'Twitter' THEN 'https://twitter.com/test_main_user'
        WHEN s.name = 'LinkedIn' THEN 'https://linkedin.com/in/test-main-user'
        WHEN s.name = 'Website' THEN 'https://test-main-user.dev'
        WHEN s.name = 'Instagram' THEN 'https://instagram.com/test_main_user'
    END,
    CASE 
        WHEN s.name = 'GitHub' THEN 'プログラミング関連のプロジェクト'
        WHEN s.name = 'Twitter' THEN '朝活の日常をツイート'
        WHEN s.name = 'LinkedIn' THEN 'プロフェッショナルなつながり'
        WHEN s.name = 'Website' THEN '個人ブログとポートフォリオ'
        WHEN s.name = 'Instagram' THEN '朝活ライフスタイル'
    END
FROM profiles p, sns s
WHERE p.user_id = 'user_2wqs4h1PsScPc5GkefezBEMSern'
AND s.name IN ('GitHub', 'Twitter', 'LinkedIn', 'Website', 'Instagram');

-- 最高ティア付与
INSERT INTO user_tiers (user_id, tier_id, role) VALUES
('user_2wqs4h1PsScPc5GkefezBEMSern', 8, 'main')
ON CONFLICT DO NOTHING;

-- ===================================
-- 2. 大量の朝活イベント作成（過去6ヶ月分）
-- ===================================

-- 過去6ヶ月間の朝活イベント（毎日2-3個ずつ、合計約360個）
INSERT INTO morning_events (title, description, host_user_id, start_at, end_at, created_at)
SELECT 
    CASE (random() * 20)::int
        WHEN 0 THEN '朝活プログラミング勉強会 #' || day_series
        WHEN 1 THEN 'モーニングヨガセッション #' || day_series
        WHEN 2 THEN '読書会：' || (ARRAY['ビジネス書', '自己啓発書', '技術書', '小説', '哲学書'])[((random() * 4)::int + 1)] || ' #' || day_series
        WHEN 3 THEN '英会話モーニングトーク #' || day_series
        WHEN 4 THEN '瞑想とマインドフルネス #' || day_series
        WHEN 5 THEN 'モーニングジョギング部 #' || day_series
        WHEN 6 THEN '目標設定ワークショップ #' || day_series
        WHEN 7 THEN 'デザイン勉強会 #' || day_series
        WHEN 8 THEN 'マーケティング戦略会議 #' || day_series
        WHEN 9 THEN 'ライティング練習会 #' || day_series
        WHEN 10 THEN 'モーニングストレッチ #' || day_series
        WHEN 11 THEN 'アイデア発想会 #' || day_series
        WHEN 12 THEN 'プレゼン練習会 #' || day_series
        WHEN 13 THEN 'コーヒーブレイクトーク #' || day_series
        WHEN 14 THEN 'スキルシェア会 #' || day_series
        WHEN 15 THEN '振り返りミーティング #' || day_series
        WHEN 16 THEN 'モチベーション向上会 #' || day_series
        WHEN 17 THEN 'ネットワーキングタイム #' || day_series
        WHEN 18 THEN '新技術トレンド議論 #' || day_series
        ELSE 'フリートーク朝活 #' || day_series
    END as title,
    CASE (random() * 10)::int
        WHEN 0 THEN '一緒に学んで成長しましょう！初心者大歓迎です。'
        WHEN 1 THEN '朝の時間を有効活用して、スキルアップを図りましょう。'
        WHEN 2 THEN '仲間と一緒だから続けられる！楽しく学習しましょう。'
        WHEN 3 THEN '新しい発見と出会いがある朝活です。'
        WHEN 4 THEN '毎日少しずつでも前進していきましょう。'
        WHEN 5 THEN '朝の清々しい時間を一緒に過ごしませんか？'
        WHEN 6 THEN '知識をシェアして、共に成長していきましょう。'
        WHEN 7 THEN '実践的な内容で、すぐに役立つスキルを身につけます。'
        WHEN 8 THEN 'リラックスした雰囲気で学習できる環境です。'
        ELSE '朝活仲間と一緒に充実した時間を過ごしましょう！'
    END as description,
    'user_2wqs4h1PsScPc5GkefezBEMSern' as host_user_id,
    (event_date + (CASE event_time_slot WHEN 1 THEN '06:00:00' WHEN 2 THEN '07:00:00' ELSE '08:00:00' END)::time)::timestamptz as start_at,
    (event_date + (CASE event_time_slot WHEN 1 THEN '07:30:00' WHEN 2 THEN '08:30:00' ELSE '09:30:00' END)::time)::timestamptz as end_at,
    (event_date - INTERVAL '1 day')::timestamptz as created_at
FROM (
    SELECT 
        generate_series(
            CURRENT_DATE - INTERVAL '6 months',
            CURRENT_DATE - INTERVAL '1 day',
            '1 day'::interval
        )::date as event_date,
        generate_series(1, 3) as event_time_slot,
        ROW_NUMBER() OVER() as day_series
) as dates
WHERE random() > 0.2;  -- 80%の確率でイベント開催

-- ===================================
-- 3. 大量の月間目標データ（過去6ヶ月分）
-- ===================================

INSERT INTO monthly_goals (user_id, goal_text, monthly_start_date, is_public, fb, created_at)
VALUES 
('user_2wqs4h1PsScPc5GkefezBEMSern', 'TypeScriptを完全にマスターして、大規模プロジェクトに適用する', '2024-08-01', true, '基本的な型定義から高度なGenericsまで学習。実際のプロジェクトで型安全性を大幅に向上させることができた。', '2024-08-01 06:00:00+09'),
('user_2wqs4h1PsScPc5GkefezBEMSern', 'UI/UXデザインの知識を深めて、より良いユーザーエクスペリエンスを提供する', '2024-09-01', true, 'Figmaを使ったプロトタイピングとユーザーテストを実施。ユーザビリティが20%向上した。', '2024-09-01 06:00:00+09'),
('user_2wqs4h1PsScPc5GkefezBEMSern', 'マーケティングオートメーションツールを導入して業務効率化を図る', '2024-10-01', true, 'HubSpotとMailChimpを活用して、リード獲得率を35%向上させることに成功。', '2024-10-01 06:00:00+09'),
('user_2wqs4h1PsScPc5GkefezBEMSern', 'Docker とKubernetesを学習してコンテナ技術をマスターする', '2024-11-01', true, 'コンテナ化したアプリケーションをKubernetesクラスターにデプロイ。運用効率が大幅に改善された。', '2024-11-01 06:00:00+09'),
('user_2wqs4h1PsScPc5GkefezBEMSern', 'Next.js 14の新機能をフル活用したWebアプリケーションを開発する', '2024-12-01', true, 'App Routerと Server Componentsを活用してパフォーマンスが40%向上したアプリを構築。', '2024-12-01 06:00:00+09'),
('user_2wqs4h1PsScPc5GkefezBEMSern', 'AI・機械学習の基礎を学習してビジネスに活用する方法を探る', '2025-01-01', true, 'Python、TensorFlow、OpenAI APIを学習中。チャットボットプロトタイプを作成。', '2025-01-01 06:00:00+09'),
('user_2wqs4h1PsScPc5GkefezBEMSern', 'チームリーダーシップスキルを向上させて、プロジェクト成功率を上げる', '2025-02-01', true, null, '2025-02-01 06:00:00+09');

-- ===================================
-- 4. 大量の出席データ（過去6ヶ月分）
-- ===================================

-- Discord出席記録（ほぼ毎日出席、1日2-4回）
INSERT INTO attendances (discord_id, username, channel, joined_at)
SELECT 
    'discord_test_main_001',
    'test_main_user',
    CASE (random() * 3)::int
        WHEN 0 THEN 'morning-活動'
        WHEN 1 THEN 'study-room'
        ELSE 'general-chat'
    END,
    (attendance_date + 
        (CASE session_num 
            WHEN 1 THEN '06:' || LPAD((random() * 30)::int::text, 2, '0')
            WHEN 2 THEN '07:' || LPAD((random() * 59)::int::text, 2, '0')
            WHEN 3 THEN '08:' || LPAD((random() * 59)::int::text, 2, '0')
            ELSE '09:' || LPAD((random() * 30)::int::text, 2, '0')
        END || ':' || LPAD((random() * 59)::int::text, 2, '0') || '+09')::time
    )::timestamptz
FROM (
    SELECT 
        generate_series(
            CURRENT_DATE - INTERVAL '6 months',
            CURRENT_DATE - INTERVAL '1 day',
            '1 day'::interval
        )::date as attendance_date,
        generate_series(1, 4) as session_num
) as attendance_data
WHERE random() > 0.05;  -- 95%の確率で出席

-- 出席フラグ（ほぼ毎日6時出席達成）
INSERT INTO attendance_flags (user_id, date, six_clock_flag, created_at, updated_at)
SELECT 
    'user_2wqs4h1PsScPc5GkefezBEMSern',
    flag_date,
    random() > 0.1,  -- 90%の確率で6時出席達成
    (flag_date + '06:00:00'::time)::timestamptz,
    (flag_date + '06:00:00'::time)::timestamptz
FROM (
    SELECT generate_series(
        CURRENT_DATE - INTERVAL '6 months',
        CURRENT_DATE - INTERVAL '1 day',
        '1 day'::interval
    )::date as flag_date
) as flag_data
WHERE random() > 0.05  -- 95%の確率で何らかの出席
ON CONFLICT (user_id, date) DO NOTHING;

-- ===================================
-- 5. 大量の外部イベント作成
-- ===================================

INSERT INTO external_events (title, description, host_user_id, image, start_at, end_at, created_at)
VALUES 
('Next.js Conference 2024 参加報告会', '最新のNext.js情報をシェアします', 'user_2wqs4h1PsScPc5GkefezBEMSern', 'https://example.com/events/nextjs-2024.jpg', '2024-08-15 19:00:00+09', '2024-08-15 21:00:00+09', '2024-08-10 12:00:00+09'),
('デザインシステム構築ワークショップ', 'Figmaを使ったデザインシステムの作り方', 'user_2wqs4h1PsScPc5GkefezBEMSern', 'https://example.com/events/design-system.jpg', '2024-09-20 14:00:00+09', '2024-09-20 18:00:00+09', '2024-09-15 10:00:00+09'),
('スタートアップピッチナイト', '起業アイデアのプレゼンテーション', 'user_2wqs4h1PsScPc5GkefezBEMSern', 'https://example.com/events/pitch-night.jpg', '2024-10-10 18:00:00+09', '2024-10-10 21:00:00+09', '2024-10-05 09:00:00+09'),
('AI活用ビジネスセミナー', 'ChatGPTとAI技術のビジネス活用方法', 'user_2wqs4h1PsScPc5GkefezBEMSern', 'https://example.com/events/ai-business.jpg', '2024-11-25 13:00:00+09', '2024-11-25 17:00:00+09', '2024-11-20 15:00:00+09'),
('Docker & Kubernetes実践ハンズオン', 'コンテナ技術の実践的な学習', 'user_2wqs4h1PsScPc5GkefezBEMSern', 'https://example.com/events/docker-k8s.jpg', '2024-12-14 10:00:00+09', '2024-12-14 17:00:00+09', '2024-12-09 11:00:00+09'),
('年末振り返り＆来年計画会', '2024年の振り返りと2025年の目標設定', 'user_2wqs4h1PsScPc5GkefezBEMSern', 'https://example.com/events/year-end.jpg', '2024-12-28 15:00:00+09', '2024-12-28 18:00:00+09', '2024-12-25 12:00:00+09'),
('新年キックオフミートアップ', '2025年の目標共有とネットワーキング', 'user_2wqs4h1PsScPc5GkefezBEMSern', 'https://example.com/events/kickoff-2025.jpg', '2025-01-07 18:00:00+09', '2025-01-07 21:00:00+09', '2025-01-04 14:00:00+09'),
('フロントエンド最新技術トレンド', 'React 19、Vue 3.4の新機能解説', 'user_2wqs4h1PsScPc5GkefezBEMSern', 'https://example.com/events/frontend-trends.jpg', '2025-01-20 19:00:00+09', '2025-01-20 21:00:00+09', '2025-01-15 16:00:00+09'),
('リモートワーク効率化セミナー', '在宅勤務での生産性向上テクニック', 'user_2wqs4h1PsScPc5GkefezBEMSern', 'https://example.com/events/remote-work.jpg', '2025-02-10 14:00:00+09', '2025-02-10 17:00:00+09', '2025-02-05 10:00:00+09'),
('Webパフォーマンス最適化講座', 'Core Web Vitalsとパフォーマンス改善', 'user_2wqs4h1PsScPc5GkefezBEMSern', 'https://example.com/events/web-performance.jpg', '2025-02-25 19:00:00+09', '2025-02-25 21:30:00+09', '2025-02-20 13:00:00+09');

-- 外部イベントとタグの関連付け
INSERT INTO external_event_on_tags (external_event_id, external_event_tag_id)
SELECT ee.id, eet.id
FROM external_events ee, external_event_tags eet
WHERE ee.host_user_id = 'user_2wqs4h1PsScPc5GkefezBEMSern'
AND eet.name IN ('セミナー', 'ワークショップ', 'ハッカソン', 'カンファレンス', 'ネットワーキング');

-- ===================================
-- 6. システム通知の作成
-- ===================================

INSERT INTO system_notices (title, description, image_url, publish_start_at, publish_end_at, created_at)
VALUES 
('朝活マスター認定のお知らせ', 'test_main_userさんが朝活マスターに認定されました！', 'https://example.com/notices/master-cert.jpg', '2024-12-01 00:00:00+09', '2024-12-31 23:59:59+09', '2024-12-01 09:00:00+09'),
('月間MVP受賞', '11月の月間MVPにtest_main_userさんが選ばれました', 'https://example.com/notices/mvp-award.jpg', '2024-12-01 00:00:00+09', '2024-12-31 23:59:59+09', '2024-12-01 10:00:00+09'),
('イベント開催数100回達成！', 'test_main_userさんがイベント開催数100回を達成しました', 'https://example.com/notices/100events.jpg', '2024-11-15 00:00:00+09', '2024-12-15 23:59:59+09', '2024-11-15 12:00:00+09'),
('継続出席記録更新', '180日連続出席記録を達成！素晴らしい継続力です', 'https://example.com/notices/180days.jpg', '2025-01-10 00:00:00+09', '2025-02-10 23:59:59+09', '2025-01-10 08:00:00+09');

-- ===================================
-- 7. 朝活イベントへの参加データ（他ユーザーの参加）
-- ===================================

-- 作成した朝活イベントに他のユーザーも参加
INSERT INTO event_participants (event_id, user_id, joined_at)
SELECT 
    me.id,
    CASE (random() * 30)::int + 1
        WHEN 1 THEN 'user_001' WHEN 2 THEN 'user_002' WHEN 3 THEN 'user_003'
        WHEN 4 THEN 'user_004' WHEN 5 THEN 'user_005' WHEN 6 THEN 'user_006'
        WHEN 7 THEN 'user_007' WHEN 8 THEN 'user_008' WHEN 9 THEN 'user_009'
        WHEN 10 THEN 'user_010' WHEN 11 THEN 'user_011' WHEN 12 THEN 'user_012'
        WHEN 13 THEN 'user_013' WHEN 14 THEN 'user_014' WHEN 15 THEN 'user_015'
        WHEN 16 THEN 'user_016' WHEN 17 THEN 'user_017' WHEN 18 THEN 'user_018'
        WHEN 19 THEN 'user_019' WHEN 20 THEN 'user_020' WHEN 21 THEN 'user_021'
        WHEN 22 THEN 'user_022' WHEN 23 THEN 'user_023' WHEN 24 THEN 'user_024'
        WHEN 25 THEN 'user_025' WHEN 26 THEN 'user_026' WHEN 27 THEN 'user_027'
        WHEN 28 THEN 'user_028' WHEN 29 THEN 'user_029' ELSE 'user_030'
    END,
    me.start_at - INTERVAL '1 hour'
FROM morning_events me
WHERE me.host_user_id = 'user_2wqs4h1PsScPc5GkefezBEMSern'
AND random() > 0.4  -- 60%の確率で参加者がいる
ON CONFLICT (event_id, user_id) DO NOTHING;

-- ===================================
-- 8. 朝活イベントタグの関連付け
-- ===================================

INSERT INTO morning_event_on_tags (event_id, tag_id)
SELECT 
    me.id,
    met.id
FROM morning_events me, morning_event_tags met
WHERE me.host_user_id = 'user_2wqs4h1PsScPc5GkefezBEMSern'
AND (
    (me.title LIKE '%プログラミング%' AND met.name = 'プログラミング') OR
    (me.title LIKE '%ヨガ%' AND met.name = 'ヨガ') OR
    (me.title LIKE '%読書%' AND met.name = '読書会') OR
    (me.title LIKE '%英会話%' AND met.name = '英会話') OR
    (me.title LIKE '%瞑想%' AND met.name = '瞑想') OR
    (me.title LIKE '%ジョギング%' AND met.name = 'ジョギング') OR
    (me.title LIKE '%目標%' AND met.name = '目標設定') OR
    (me.title LIKE '%デザイン%' AND met.name = '勉強会') OR
    (me.title LIKE '%マーケティング%' AND met.name = '勉強会') OR
    (me.title LIKE '%ストレッチ%' AND met.name = 'ワークアウト') OR
    (me.title LIKE '%コーヒー%' AND met.name = 'モーニングコーヒー')
);

-- ===================================
-- 9. データ統計の確認
-- ===================================

-- 挿入結果の確認
SELECT 'メインユーザーの朝活イベント数' as item, COUNT(*) as count 
FROM morning_events 
WHERE host_user_id = 'user_2wqs4h1PsScPc5GkefezBEMSern'
UNION ALL
SELECT 'メインユーザーの外部イベント数', COUNT(*) 
FROM external_events 
WHERE host_user_id = 'user_2wqs4h1PsScPc5GkefezBEMSern'
UNION ALL
SELECT 'メインユーザーの月間目標数', COUNT(*) 
FROM monthly_goals 
WHERE user_id = 'user_2wqs4h1PsScPc5GkefezBEMSern'
UNION ALL
SELECT 'メインユーザーの出席記録数', COUNT(*) 
FROM attendances 
WHERE discord_id = 'discord_test_main_001'
UNION ALL
SELECT 'メインユーザーの出席フラグ数', COUNT(*) 
FROM attendance_flags 
WHERE user_id = 'user_2wqs4h1PsScPc5GkefezBEMSern'
UNION ALL
SELECT 'メインユーザーの興味・関心数', COUNT(*) 
FROM profile_interest pi
JOIN profiles p ON pi.profile_id = p.id
WHERE p.user_id = 'user_2wqs4h1PsScPc5GkefezBEMSern'
UNION ALL
SELECT 'メインユーザーのコアスキル数', COUNT(*) 
FROM profile_core_skill pcs
JOIN profiles p ON pcs.profile_id = p.id
WHERE p.user_id = 'user_2wqs4h1PsScPc5GkefezBEMSern'
UNION ALL
SELECT 'メインユーザーのSNSリンク数', COUNT(*) 
FROM profile_sns ps
JOIN profiles p ON ps.profile_id = p.id
WHERE p.user_id = 'user_2wqs4h1PsScPc5GkefezBEMSern';

-- ===================================
-- 大量ダミーデータ挿入完了
-- ===================================