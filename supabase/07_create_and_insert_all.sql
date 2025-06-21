-- ===================================
-- Ghoona Camp Database 完全再構築
-- テーブル作成 + 指定ユーザーデータ挿入
-- ===================================

BEGIN;

-- ===================================
-- 1. 拡張機能
-- ===================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===================================
-- 2. テーブル作成
-- ===================================

-- users（ユーザー）
CREATE TABLE users (
    clerk_id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255),
    discord_id VARCHAR(255) UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE INDEX idx_users_discord_id ON users(discord_id);
CREATE INDEX idx_users_email ON users(email);

-- interests（興味・関心マスター）
CREATE TABLE interests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    color TEXT
);

-- core_skills（コアスキルマスター）
CREATE TABLE core_skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    color TEXT,
    icon TEXT
);

-- sns（SNSマスター）
CREATE TABLE sns (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL
);

-- profiles（プロフィール）
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) UNIQUE NOT NULL REFERENCES users(clerk_id) ON DELETE CASCADE,
    username VARCHAR(60) NOT NULL,
    vision VARCHAR(120),
    bio VARCHAR(120),
    one_line_profile VARCHAR(120),
    background TEXT,
    avatar_image_url TEXT,
    interests_array TEXT[],
    core_skills_array TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profiles_deleted_at ON profiles(deleted_at);

-- profile_sns（プロフィール⇔SNS中間テーブル）
CREATE TABLE profile_sns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    sns_id INTEGER NOT NULL REFERENCES sns(id) ON DELETE CASCADE,
    link TEXT NOT NULL,
    description TEXT
);

-- profile_rival（プロフィール⇔ライバル中間テーブル）
CREATE TABLE profile_rival (
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    rival_profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    PRIMARY KEY (profile_id, rival_profile_id),
    CHECK (profile_id != rival_profile_id)
);

-- tiers（ティア）
CREATE TABLE tiers (
    id SERIAL PRIMARY KEY,
    title_en VARCHAR(40) NOT NULL,
    title_ja VARCHAR(40) NOT NULL,
    badge_color VARCHAR(10) NOT NULL,
    card_image_url TEXT,
    short_description TEXT,
    long_description TEXT,
    story TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- user_tiers（ユーザーティア）
CREATE TABLE user_tiers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) NOT NULL REFERENCES users(clerk_id) ON DELETE CASCADE,
    tier_id INTEGER NOT NULL REFERENCES tiers(id) ON DELETE CASCADE,
    granted_at TIMESTAMPTZ DEFAULT NOW(),
    role VARCHAR(10)
);

CREATE INDEX idx_user_tiers_user_id ON user_tiers(user_id);
CREATE INDEX idx_user_tiers_role ON user_tiers(role);

-- morning_event_tags（朝活イベントタグ）
CREATE TABLE morning_event_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(40) NOT NULL,
    color VARCHAR(10) NOT NULL
);

-- morning_events（朝活イベント）
CREATE TABLE morning_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(80) NOT NULL,
    description TEXT,
    host_user_id VARCHAR(255) NOT NULL REFERENCES users(clerk_id) ON DELETE CASCADE,
    start_at TIMESTAMPTZ NOT NULL,
    end_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_morning_events_host_user_id ON morning_events(host_user_id);
CREATE INDEX idx_morning_events_start_at ON morning_events(start_at);
CREATE INDEX idx_morning_events_deleted_at ON morning_events(deleted_at);

-- morning_event_on_tags（朝活イベント⇔タグ中間テーブル）
CREATE TABLE morning_event_on_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES morning_events(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES morning_event_tags(id) ON DELETE CASCADE
);

-- event_participants（イベント参加者中間テーブル）
CREATE TABLE event_participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES morning_events(id) ON DELETE CASCADE,
    user_id VARCHAR(255) NOT NULL REFERENCES users(clerk_id) ON DELETE CASCADE,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(event_id, user_id)
);

CREATE INDEX idx_event_participants_event_id ON event_participants(event_id);
CREATE INDEX idx_event_participants_user_id ON event_participants(user_id);

-- external_event_tags（外部イベントタグ）
CREATE TABLE external_event_tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    color VARCHAR(10) NOT NULL
);

-- external_events（外部イベント）
CREATE TABLE external_events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(80) NOT NULL,
    description TEXT,
    host_user_id VARCHAR(255) NOT NULL REFERENCES users(clerk_id) ON DELETE CASCADE,
    image VARCHAR(255),
    start_at TIMESTAMPTZ NOT NULL,
    end_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_external_events_host_user_id ON external_events(host_user_id);
CREATE INDEX idx_external_events_start_at ON external_events(start_at);
CREATE INDEX idx_external_events_deleted_at ON external_events(deleted_at);

-- external_event_on_tags（外部イベント⇔タグ中間テーブル）
CREATE TABLE external_event_on_tags (
    id SERIAL PRIMARY KEY,
    external_event_id INTEGER NOT NULL REFERENCES external_events(id) ON DELETE CASCADE,
    external_event_tag_id INTEGER NOT NULL REFERENCES external_event_tags(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- monthly_goals（月間目標）
CREATE TABLE monthly_goals (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL REFERENCES users(clerk_id) ON DELETE CASCADE,
    goal_text TEXT,
    monthly_start_date DATE,
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    fb TEXT
);

CREATE INDEX idx_monthly_goals_user_id ON monthly_goals(user_id);
CREATE INDEX idx_monthly_goals_monthly_start_date ON monthly_goals(monthly_start_date);
CREATE INDEX idx_monthly_goals_deleted_at ON monthly_goals(deleted_at);

-- attendances（出席記録）
CREATE TABLE attendances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    discord_id VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    channel VARCHAR(255) NOT NULL,
    joined_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX idx_attendances_discord_id ON attendances(discord_id);
CREATE INDEX idx_attendances_joined_at ON attendances(joined_at);

-- attendance_flags（出席フラグ）
CREATE TABLE attendance_flags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) NOT NULL REFERENCES users(clerk_id) ON DELETE CASCADE,
    date DATE NOT NULL,
    six_clock_flag BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, date)
);

CREATE INDEX idx_attendance_flags_user_id ON attendance_flags(user_id);
CREATE INDEX idx_attendance_flags_date ON attendance_flags(date);

-- system_notice_tags（システム通知タグ）
CREATE TABLE system_notice_tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- system_notices（システム通知）
CREATE TABLE system_notices (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    publish_start_at TIMESTAMPTZ NOT NULL,
    publish_end_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_system_notices_publish_start_at ON system_notices(publish_start_at);
CREATE INDEX idx_system_notices_publish_end_at ON system_notices(publish_end_at);
CREATE INDEX idx_system_notices_deleted_at ON system_notices(deleted_at);

-- system_notice_on_tags（システム通知⇔タグ中間テーブル）
CREATE TABLE system_notice_on_tags (
    id SERIAL PRIMARY KEY,
    system_notice_id INTEGER NOT NULL REFERENCES system_notices(id) ON DELETE CASCADE,
    system_notice_tag_id INTEGER NOT NULL REFERENCES system_notice_tags(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===================================
-- 3. 更新日時自動更新トリガー
-- ===================================

-- トリガー関数作成
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- users テーブルのトリガー
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- profiles テーブルのトリガー
CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- morning_events テーブルのトリガー
CREATE TRIGGER update_morning_events_updated_at 
    BEFORE UPDATE ON morning_events 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- external_events テーブルのトリガー
CREATE TRIGGER update_external_events_updated_at 
    BEFORE UPDATE ON external_events 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- attendance_flags テーブルのトリガー
CREATE TRIGGER update_attendance_flags_updated_at 
    BEFORE UPDATE ON attendance_flags 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- system_notices テーブルのトリガー
CREATE TRIGGER update_system_notices_updated_at 
    BEFORE UPDATE ON system_notices 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- system_notice_tags テーブルのトリガー
CREATE TRIGGER update_system_notice_tags_updated_at 
    BEFORE UPDATE ON system_notice_tags 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- system_notice_on_tags テーブルのトリガー
CREATE TRIGGER update_system_notice_on_tags_updated_at 
    BEFORE UPDATE ON system_notice_on_tags 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ===================================
-- 4. マスターデータ挿入
-- ===================================

-- interests（興味・関心マスター - フロントエンドの選択肢用）
INSERT INTO interests (name, color) VALUES
('テクノロジー', '#FF6B6B'),
('デザイン', '#4ECDC4'),
('ビジネス', '#45B7D1'),
('マーケティング', '#96CEB4'),
('教育', '#FECA57'),
('健康・フィットネス', '#FF9FF3'),
('音楽', '#54A0FF'),
('アート', '#5F27CD'),
('読書', '#00D2D3'),
('旅行', '#FF9F43'),
('料理', '#10AC84'),
('スポーツ', '#EE5A24'),
('ゲーム', '#0ABDE3'),
('映画・ドラマ', '#FD79A8'),
('写真', '#A29BFE');

-- core_skills（コアスキルマスター - フロントエンドの選択肢用）
INSERT INTO core_skills (name, color, icon) VALUES
('JavaScript', '#F7DF1E', NULL),
('TypeScript', '#3178C6', NULL),
('React', '#61DAFB', NULL),
('Vue.js', '#4FC08D', NULL),
('Angular', '#DD0031', NULL),
('Node.js', '#339933', NULL),
('Python', '#3776AB', NULL),
('Java', '#007396', NULL),
('PHP', '#777BB4', NULL),
('Go', '#00ADD8', NULL),
('Rust', '#000000', NULL),
('Swift', '#FA7343', NULL),
('Kotlin', '#0095D5', NULL),
('Docker', '#2496ED', NULL),
('AWS', '#232F3E', NULL),
('GCP', '#4285F4', NULL),
('Azure', '#0078D4', NULL),
('MySQL', '#4479A1', NULL),
('PostgreSQL', '#336791', NULL),
('MongoDB', '#47A248', NULL),
('Redis', '#DC382D', NULL),
('GraphQL', '#E10098', NULL),
('REST API', '#25D366', NULL),
('UI/UX Design', '#FF6B6B', NULL),
('Figma', '#F24E1E', NULL),
('Adobe Creative Suite', '#FF0000', NULL),
('Project Management', '#4CAF50', NULL),
('Data Analysis', '#FF9800', NULL),
('Machine Learning', '#2196F3', NULL),
('DevOps', '#9C27B0', NULL);

-- sns（SNSマスター）
INSERT INTO sns (name) VALUES
('X (Twitter)'),
('Instagram'),
('LinkedIn'),
('GitHub'),
('Website');

-- tiers（ティア）
INSERT INTO tiers (id, title_en, title_ja, badge_color, short_description, long_description, story) VALUES
(1, 'Early Bird', '早起きの鳥', '#FFD700', '朝活を始めた証', '朝活コミュニティへの第一歩。早起きの習慣を身につけ、新しい生活リズムを確立しました。', '朝の静寂の中で、新しい一日への準備を整える最初の一歩。'),
(2, 'Morning Warrior', '朝の戦士', '#FF6B6B', '継続的な朝活参加者', '一週間連続で朝活に参加し、朝の時間を有効活用する習慣が身についてきました。', '朝の光と共に立ち上がり、日々の挑戦に向かう勇気を持つ戦士。'),
(3, 'Sunrise Champion', '日の出チャンピオン', '#4ECDC4', '朝活リーダー', '他のメンバーを引っ張る朝活のリーダー。コミュニティの活性化に貢献しています。', '日の出と共に輝き、周りの人々にインスピレーションを与えるチャンピオン。'),
(4, 'Dawn Master', '夜明けの達人', '#845EC2', '朝活エキスパート', '朝活の達人として、効率的な朝の過ごし方をマスターし、高いパフォーマンスを発揮しています。', '夜明けの静寂を愛し、その時間を最大限に活用する方法を知る達人。'),
(5, 'Aurora Legend', 'オーロラ伝説', '#FF9FF3', '朝活の伝説', 'コミュニティの中で伝説的な存在。朝活を通じて多くの人に影響を与え続けています。', '北極のオーロラのように美しく、永続的に輝き続ける伝説的な存在。');

-- morning_event_tags（朝活イベントタグ）
INSERT INTO morning_event_tags (name, color) VALUES
('開発', '#FF6B6B'),
('勉強会', '#4ECDC4'),
('読書', '#45B7D1'),
('運動', '#96CEB4'),
('瞑想', '#FECA57'),
('ネットワーキング', '#FF9FF3');

-- external_event_tags（外部イベントタグ）
INSERT INTO external_event_tags (name, color) VALUES
('カンファレンス', '#FF6B6B'),
('ワークショップ', '#4ECDC4'),
('セミナー', '#45B7D1'),
('ハッカソン', '#96CEB4'),
('ネットワーキング', '#FECA57');

-- system_notice_tags（システム通知タグ）
INSERT INTO system_notice_tags (name, color) VALUES
('お知らせ', '#4285f4'),
('メンテナンス', '#ff9800'),
('新機能', '#4caf50'),
('重要', '#f44336');

-- ===================================
-- 5. 指定ユーザーデータ挿入
-- ===================================

-- users（指定の4人のユーザー）
INSERT INTO users (clerk_id, email, username, discord_id) VALUES
('user_2wtwwJvnm8m9ofGrCzM8xEgX242', 'shota.yamashita@starup01.jp', 'shota_startup', '1234567890'),
('user_2wtesrJqS9Wu6QBIWnAJXaMopdi', 'syota.yamashita@shintairiku.jp', 'syota_shintairiku', '2345678901'),
('user_2wtdiGZbEyP4XrcZRcPGbBFE3So', 'yamashita98syota@gmail.com', 'yamashita98', '3456789012'),
('user_2wqs4h1PsScPc5GkefezBEMSern', 'shota.yamashita@ghoona.com', 'shota_ghoona', '4567890123');

-- profiles（プロフィール）
INSERT INTO profiles (user_id, username, vision, bio, one_line_profile, background, avatar_image_url, interests_array, core_skills_array) VALUES
('user_2wtwwJvnm8m9ofGrCzM8xEgX242', 'ShotaStartup', 'スタートアップで世界を変える', '朝活でプロダクト開発', 'スタートアップ創業者・エンジニア', 'スタートアップ企業の創業者として、新しいプロダクトの開発に取り組んでいます。朝活を通じて効率的な開発サイクルを実現し、チーム全体のパフォーマンス向上を目指しています。', '/images/profile/sampleProfileIcon.png', 
    ARRAY['テクノロジー', 'ビジネス', 'スタートアップ'], 
    ARRAY['JavaScript', 'TypeScript', 'React', 'Node.js', 'AWS']),

('user_2wtesrJqS9Wu6QBIWnAJXaMopdi', 'SyotaShintairiku', '新大陸を発見する開発者', '新技術の探究者', '新大陸エンジニア・技術研究者', '最新の技術トレンドを追いかけ、未知の領域に挑戦することを楽しんでいます。朝活で情報収集と実験的なプロジェクトに取り組み、技術の可能性を広げています。', '/images/profile/sampleProfileIcon.png',
    ARRAY['テクノロジー', 'デザイン', '最新技術'],
    ARRAY['Python', 'Machine Learning', 'Docker', 'GCP', 'Data Analysis']),

('user_2wtdiGZbEyP4XrcZRcPGbBFE3So', 'Yamashita98', 'コードで社会に貢献', 'フルスタック開発者', 'フルスタックエンジニア・学生', '大学在学中からフルスタック開発に取り組み、実践的なプロジェクトを通じて技術力を磨いています。朝活でコーディングスキルを向上させ、将来のキャリアに向けて準備しています。', '/images/profile/sampleProfileIcon.png',
    ARRAY['テクノロジー', '教育', 'プログラミング学習'],
    ARRAY['JavaScript', 'React', 'Vue.js', 'PHP', 'MySQL']),

('user_2wqs4h1PsScPc5GkefezBEMSern', 'ShotaGhoona', 'Ghoonaでコミュニティを創る', '朝活コミュニティリーダー', 'Ghoona運営・コミュニティマネージャー', 'Ghoonaプラットフォームの運営を通じて、朝活コミュニティの成長をサポートしています。技術とコミュニティマネジメントの両面から、より良い体験を提供することに注力しています。', '/images/profile/sampleProfileIcon.png',
    ARRAY['ビジネス', 'マーケティング', 'コミュニティ運営'],
    ARRAY['Project Management', 'UI/UX Design', 'TypeScript', 'AWS', 'GraphQL']);

-- profile_sns（プロフィール⇔SNS）
INSERT INTO profile_sns (profile_id, sns_id, link, description) VALUES
-- Shota Startup のSNS
((SELECT id FROM profiles WHERE user_id = 'user_2wtwwJvnm8m9ofGrCzM8xEgX242'), 1, 'https://x.com/shota_startup', 'スタートアップの日常をつぶやいています'),
((SELECT id FROM profiles WHERE user_id = 'user_2wtwwJvnm8m9ofGrCzM8xEgX242'), 4, 'https://github.com/shota-startup', 'プロダクト開発のコードを公開'),
((SELECT id FROM profiles WHERE user_id = 'user_2wtwwJvnm8m9ofGrCzM8xEgX242'), 5, 'https://startup-blog.example.com', 'スタートアップブログ'),

-- Syota Shintairiku のSNS  
((SELECT id FROM profiles WHERE user_id = 'user_2wtesrJqS9Wu6QBIWnAJXaMopdi'), 1, 'https://x.com/syota_tech', '技術トレンドについて発信'),
((SELECT id FROM profiles WHERE user_id = 'user_2wtesrJqS9Wu6QBIWnAJXaMopdi'), 4, 'https://github.com/syota-shintairiku', '実験的なプロジェクトを公開'),
((SELECT id FROM profiles WHERE user_id = 'user_2wtesrJqS9Wu6QBIWnAJXaMopdi'), 3, 'https://linkedin.com/in/syota-yamashita', 'プロフェッショナルなつながり'),

-- Yamashita98 のSNS
((SELECT id FROM profiles WHERE user_id = 'user_2wtdiGZbEyP4XrcZRcPGbBFE3So'), 4, 'https://github.com/yamashita98', '学習過程のコードを共有'),
((SELECT id FROM profiles WHERE user_id = 'user_2wtdiGZbEyP4XrcZRcPGbBFE3So'), 1, 'https://x.com/yamashita98dev', '開発の学習記録'),

-- Shota Ghoona のSNS
((SELECT id FROM profiles WHERE user_id = 'user_2wqs4h1PsScPc5GkefezBEMSern'), 1, 'https://x.com/ghoona_official', 'Ghoona公式アカウント'),
((SELECT id FROM profiles WHERE user_id = 'user_2wqs4h1PsScPc5GkefezBEMSern'), 2, 'https://instagram.com/ghoona_community', 'コミュニティの様子を投稿'),
((SELECT id FROM profiles WHERE user_id = 'user_2wqs4h1PsScPc5GkefezBEMSern'), 5, 'https://ghoona.com', 'Ghoona公式サイト');

-- user_tiers（ユーザーティア）
INSERT INTO user_tiers (user_id, tier_id, role) VALUES
('user_2wtwwJvnm8m9ofGrCzM8xEgX242', 1, 'earned'),
('user_2wtwwJvnm8m9ofGrCzM8xEgX242', 2, 'earned'),
('user_2wtwwJvnm8m9ofGrCzM8xEgX242', 3, 'earned'),
('user_2wtesrJqS9Wu6QBIWnAJXaMopdi', 1, 'earned'),
('user_2wtesrJqS9Wu6QBIWnAJXaMopdi', 2, 'earned'),
('user_2wtdiGZbEyP4XrcZRcPGbBFE3So', 1, 'earned'),
('user_2wqs4h1PsScPc5GkefezBEMSern', 1, 'earned'),
('user_2wqs4h1PsScPc5GkefezBEMSern', 2, 'earned'),
('user_2wqs4h1PsScPc5GkefezBEMSern', 3, 'earned'),
('user_2wqs4h1PsScPc5GkefezBEMSern', 4, 'earned'),
('user_2wqs4h1PsScPc5GkefezBEMSern', 5, 'earned');

-- morning_events（朝活イベント）
INSERT INTO morning_events (title, description, host_user_id, start_at, end_at) VALUES
('朝のコーディングセッション', 'みんなで集中してコーディングしましょう', 'user_2wtwwJvnm8m9ofGrCzM8xEgX242', '2024-12-22 06:00:00+09', '2024-12-22 07:30:00+09'),
('技術トレンド勉強会', '最新の技術動向について学びます', 'user_2wtesrJqS9Wu6QBIWnAJXaMopdi', '2024-12-23 06:30:00+09', '2024-12-23 08:00:00+09'),
('プロジェクト進捗シェア', '各自のプロジェクト進捗を共有しましょう', 'user_2wtdiGZbEyP4XrcZRcPGbBFE3So', '2024-12-24 06:00:00+09', '2024-12-24 07:00:00+09'),
('朝活コミュニティミーティング', 'コミュニティの今後について話し合います', 'user_2wqs4h1PsScPc5GkefezBEMSern', '2024-12-25 06:00:00+09', '2024-12-25 07:30:00+09');

-- event_participants（イベント参加者）
INSERT INTO event_participants (event_id, user_id) VALUES
((SELECT id FROM morning_events WHERE title = '朝のコーディングセッション'), 'user_2wtwwJvnm8m9ofGrCzM8xEgX242'),
((SELECT id FROM morning_events WHERE title = '朝のコーディングセッション'), 'user_2wtdiGZbEyP4XrcZRcPGbBFE3So'),
((SELECT id FROM morning_events WHERE title = '技術トレンド勉強会'), 'user_2wtesrJqS9Wu6QBIWnAJXaMopdi'),
((SELECT id FROM morning_events WHERE title = '技術トレンド勉強会'), 'user_2wtwwJvnm8m9ofGrCzM8xEgX242'),
((SELECT id FROM morning_events WHERE title = 'プロジェクト進捗シェア'), 'user_2wtdiGZbEyP4XrcZRcPGbBFE3So'),
((SELECT id FROM morning_events WHERE title = 'プロジェクト進捗シェア'), 'user_2wqs4h1PsScPc5GkefezBEMSern'),
((SELECT id FROM morning_events WHERE title = '朝活コミュニティミーティング'), 'user_2wqs4h1PsScPc5GkefezBEMSern'),
((SELECT id FROM morning_events WHERE title = '朝活コミュニティミーティング'), 'user_2wtwwJvnm8m9ofGrCzM8xEgX242'),
((SELECT id FROM morning_events WHERE title = '朝活コミュニティミーティング'), 'user_2wtesrJqS9Wu6QBIWnAJXaMopdi'),
((SELECT id FROM morning_events WHERE title = '朝活コミュニティミーティング'), 'user_2wtdiGZbEyP4XrcZRcPGbBFE3So');

-- monthly_goals（月間目標）
INSERT INTO monthly_goals (user_id, goal_text, monthly_start_date) VALUES
('user_2wtwwJvnm8m9ofGrCzM8xEgX242', 'プロダクトのMVPを完成させる', '2024-12-01'),
('user_2wtesrJqS9Wu6QBIWnAJXaMopdi', '新しい技術スタックを学習する', '2024-12-01'),
('user_2wtdiGZbEyP4XrcZRcPGbBFE3So', 'ポートフォリオサイトを完成させる', '2024-12-01'),
('user_2wqs4h1PsScPc5GkefezBEMSern', 'コミュニティメンバーを100人増やす', '2024-12-01');

-- attendance_flags（出席フラグ）
INSERT INTO attendance_flags (user_id, date, six_clock_flag) VALUES
('user_2wtwwJvnm8m9ofGrCzM8xEgX242', '2024-12-20', true),
('user_2wtwwJvnm8m9ofGrCzM8xEgX242', '2024-12-21', true),
('user_2wtesrJqS9Wu6QBIWnAJXaMopdi', '2024-12-20', true),
('user_2wtesrJqS9Wu6QBIWnAJXaMopdi', '2024-12-21', false),
('user_2wtdiGZbEyP4XrcZRcPGbBFE3So', '2024-12-21', true),
('user_2wqs4h1PsScPc5GkefezBEMSern', '2024-12-20', true),
('user_2wqs4h1PsScPc5GkefezBEMSern', '2024-12-21', true);

-- external_events（外部イベント）
INSERT INTO external_events (title, description, host_user_id, start_at, end_at) VALUES
('Tokyo Tech Conference 2024', '東京で開催される技術カンファレンス', 'user_2wtwwJvnm8m9ofGrCzM8xEgX242', '2024-12-28 10:00:00+09', '2024-12-28 18:00:00+09'),
('Startup Pitch Night', 'スタートアップのピッチイベント', 'user_2wqs4h1PsScPc5GkefezBEMSern', '2024-12-30 19:00:00+09', '2024-12-30 22:00:00+09');

-- system_notices（システム通知）
INSERT INTO system_notices (title, description, image_url, publish_start_at, publish_end_at) VALUES
('Ghoonaプラットフォーム正式リリース', '朝活コミュニティプラットフォームGhoonaが正式にリリースされました！', '/images/notices/launch.jpg', '2024-12-21 00:00:00+09', '2024-12-31 23:59:59+09'),
('年末年始イベント開催のお知らせ', '年末年始特別朝活イベントを開催します。詳細は後日発表予定です。', '/images/notices/new-year.jpg', '2024-12-25 00:00:00+09', '2025-01-05 23:59:59+09');

-- ===================================
-- コミット
-- ===================================

COMMIT;

-- ===================================
-- 完了確認
-- ===================================

-- データ挿入結果の確認
SELECT 'ユーザー数' as item, COUNT(*) as count FROM users
UNION ALL
SELECT 'プロフィール数', COUNT(*) FROM profiles
UNION ALL
SELECT 'ティア数', COUNT(*) FROM tiers
UNION ALL
SELECT '朝活イベント数', COUNT(*) FROM morning_events
UNION ALL
SELECT '外部イベント数', COUNT(*) FROM external_events
UNION ALL
SELECT '月間目標数', COUNT(*) FROM monthly_goals
UNION ALL
SELECT '出席フラグ数', COUNT(*) FROM attendance_flags
UNION ALL
SELECT 'システム通知数', COUNT(*) FROM system_notices;

-- ===================================
-- テーブル作成とデータ挿入完了
-- ===================================