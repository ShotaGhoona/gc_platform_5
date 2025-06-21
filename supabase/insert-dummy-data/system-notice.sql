-- ===================================
-- システム通知テーブルの再作成（tags_array対応）
-- ===================================

-- 既存の関連テーブルを削除
DROP TABLE IF EXISTS system_notice_on_tags CASCADE;
DROP TABLE IF EXISTS system_notices CASCADE;

-- システム通知テーブルを再作成（tags_arrayカラム付き）
CREATE TABLE system_notices (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(512),
    tags_array TEXT[] DEFAULT '{}',
    publish_start_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    publish_end_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- インデックス作成
CREATE INDEX idx_system_notices_publish_dates ON system_notices(publish_start_at, publish_end_at);
CREATE INDEX idx_system_notices_deleted_at ON system_notices(deleted_at);
CREATE INDEX idx_system_notices_tags_array ON system_notices USING GIN(tags_array);

-- ===================================
-- システム通知のダミーデータ（大量データ）
-- ===================================

INSERT INTO system_notices (title, description, image_url, tags_array, publish_start_at, publish_end_at) VALUES
-- 新機能関連
('新機能リリースのお知らせ', 'ライバル機能が追加されました！プロフィールページからライバルを設定して切磋琢磨しましょう。', 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', '{"新機能", "重要"}', '2025-01-15 00:00:00+09', '2025-01-31 23:59:59+09'),
('ダッシュボード機能向上', '週間統計とフロー表示機能が追加されました。より詳細な分析が可能になります。', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', '{"新機能", "アップデート"}', '2025-01-20 00:00:00+09', '2025-02-05 23:59:59+09'),
('プロフィール機能拡張', 'SNSリンクとコアスキル設定機能が追加されました。', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', '{"新機能"}', '2025-01-18 00:00:00+09', '2025-02-15 23:59:59+09'),

-- メンテナンス関連
('メンテナンス実施のお知らせ', '1月25日にシステムメンテナンスを実施します。2:00-4:00の間、一時的にサービスが停止する可能性があります。', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', '{"メンテナンス", "重要"}', '2025-01-20 00:00:00+09', '2025-01-26 23:59:59+09'),
('緊急メンテナンス完了', 'データベース最適化メンテナンスが完了しました。サービスの安定性が向上しています。', 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', '{"メンテナンス"}', '2025-01-12 00:00:00+09', '2025-01-20 23:59:59+09'),
('定期メンテナンス予告', '2月第1週に定期メンテナンスを予定しています。詳細は後日お知らせします。', 'https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', '{"メンテナンス"}', '2025-01-22 00:00:00+09', '2025-02-10 23:59:59+09'),

-- イベント関連
('イベント企画募集', '朝活イベントのアイデアを募集中です！コミュニティを盛り上げるご提案をお待ちしています。', 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', '{"イベント", "募集"}', '2025-01-10 00:00:00+09', '2025-02-10 23:59:59+09'),
('新年朝活イベント開催', '2025年最初の朝活イベントを開催します。皆さんの参加をお待ちしています。', 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', '{"イベント", "朝活"}', '2025-01-01 00:00:00+09', '2025-01-15 23:59:59+09'),
('バレンタイン企画', '2月14日に特別な朝活イベントを企画中です。お楽しみに！', 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', '{"イベント", "企画"}', '2025-01-25 00:00:00+09', '2025-02-20 23:59:59+09'),

-- お知らせ・その他
('月間MVPの発表', '1月の最優秀メンバーを発表しました。継続的な朝活参加ありがとうございます！', 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', '{"お知らせ", "MVP"}', '2025-01-01 00:00:00+09', '2025-01-31 23:59:59+09'),
('利用規約の更新', 'サービス向上のため利用規約を一部更新しました。ご確認をお願いします。', 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', '{"重要", "規約"}', '2025-01-16 00:00:00+09', '2025-02-28 23:59:59+09'),
('年末年始の営業について', '年末年始期間中のサポート対応についてお知らせします。', 'https://images.unsplash.com/photo-1482849297070-f4fae2173efe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', '{"お知らせ"}', '2024-12-25 00:00:00+09', '2025-01-10 23:59:59+09'),

-- 技術・改善関連
('セキュリティ強化のお知らせ', 'システムのセキュリティを強化しました。より安全にご利用いただけます。', 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', '{"重要", "セキュリティ"}', '2025-01-14 00:00:00+09', '2025-02-14 23:59:59+09'),
('パフォーマンス改善', 'ページの読み込み速度が大幅に改善されました。', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', '{"アップデート"}', '2025-01-17 00:00:00+09', '2025-02-17 23:59:59+09'),
('モバイル対応強化', 'スマートフォンでの操作性が向上しました。', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', '{"アップデート", "モバイル"}', '2025-01-19 00:00:00+09', '2025-02-19 23:59:59+09'),

-- 追加のお知らせ（ページネーション確認用）
('春の朝活キャンペーン予告', '3月から春の朝活キャンペーンを開始予定です。', 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', '{"イベント", "キャンペーン"}', '2025-01-28 00:00:00+09', '2025-03-31 23:59:59+09'),
('新しいティア制度導入', '成長をサポートする新しいティア制度を導入しました。', 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', '{"新機能", "ティア"}', '2025-01-13 00:00:00+09', '2025-02-28 23:59:59+09'),
('朝活の効果についての調査結果', 'メンバーの朝活継続による効果を調査しました。', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', '{"お知らせ", "調査"}', '2025-01-11 00:00:00+09', '2025-02-11 23:59:59+09'),
('コミュニティガイドライン更新', 'より良いコミュニティ作りのためガイドラインを更新しました。', 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', '{"重要", "ガイドライン"}', '2025-01-09 00:00:00+09', '2025-02-09 23:59:59+09'),
('Discord連携機能追加', 'Discordとの連携機能が追加されました。', 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', '{"新機能", "Discord"}', '2025-01-26 00:00:00+09', '2025-02-26 23:59:59+09'),
('2月の目標設定について', '月次目標設定機能の使い方をご紹介します。', 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', '{"お知らせ", "目標"}', '2025-01-30 00:00:00+09', '2025-02-28 23:59:59+09');

-- ===================================
-- システム通知データ挿入完了
-- ===================================

-- 挿入されたデータ数を確認
SELECT COUNT(*) as total_notices FROM system_notices;
SELECT DISTINCT unnest(tags_array) as unique_tags FROM system_notices ORDER BY unique_tags;
