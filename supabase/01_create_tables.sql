-- ===================================
-- Ghoona Camp Database Schema
-- テーブル作成SQL
-- ===================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===================================
-- 1. users（ユーザー）
-- ===================================
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

-- ===================================
-- 2. interests（興味・関心マスター）
-- ===================================
CREATE TABLE interests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    color TEXT
);

-- ===================================
-- 3. core_skills（コアスキルマスター）
-- ===================================
CREATE TABLE core_skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    color TEXT,
    icon TEXT
);

-- ===================================
-- 4. sns（SNSマスター）
-- ===================================
CREATE TABLE sns (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL
);

-- ===================================
-- 5. profiles（プロフィール）
-- ===================================
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) UNIQUE NOT NULL REFERENCES users(clerk_id) ON DELETE CASCADE,
    username VARCHAR(60) NOT NULL,
    vision VARCHAR(120),
    bio VARCHAR(120),
    one_line_profile VARCHAR(120),
    personal_color VARCHAR(60),
    background TEXT,
    avatar_image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ,
    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profiles_deleted_at ON profiles(deleted_at);

-- ===================================
-- 6. profile_interest（プロフィール⇔興味中間テーブル）
-- ===================================
CREATE TABLE profile_interest (
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    interest_id INTEGER REFERENCES interests(id) ON DELETE CASCADE,
    PRIMARY KEY (profile_id, interest_id)
);

-- ===================================
-- 7. profile_core_skill（プロフィール⇔コアスキル中間テーブル）
-- ===================================
CREATE TABLE profile_core_skill (
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    core_skill_id INTEGER REFERENCES core_skills(id) ON DELETE CASCADE,
    PRIMARY KEY (profile_id, core_skill_id)
);

-- ===================================
-- 8. profile_sns（プロフィール⇔SNS中間テーブル）
-- ===================================
CREATE TABLE profile_sns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    sns_id INTEGER NOT NULL REFERENCES sns(id) ON DELETE CASCADE,
    link TEXT NOT NULL,
    description TEXT
);

-- ===================================
-- 9. profile_rival（プロフィール⇔ライバル中間テーブル）
-- ===================================
CREATE TABLE profile_rival (
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    rival_profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    PRIMARY KEY (profile_id, rival_profile_id),
    CHECK (profile_id != rival_profile_id)
);

-- ===================================
-- 10. tiers（ティア）
-- ===================================
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

-- ===================================
-- 11. user_tiers（ユーザーティア）
-- ===================================
CREATE TABLE user_tiers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) NOT NULL REFERENCES users(clerk_id) ON DELETE CASCADE,
    tier_id INTEGER NOT NULL REFERENCES tiers(id) ON DELETE CASCADE,
    granted_at TIMESTAMPTZ DEFAULT NOW(),
    role VARCHAR(10)
);

CREATE INDEX idx_user_tiers_user_id ON user_tiers(user_id);
CREATE INDEX idx_user_tiers_role ON user_tiers(role);

-- ===================================
-- 12. morning_event_tags（朝活イベントタグ）
-- ===================================
CREATE TABLE morning_event_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(40) NOT NULL,
    color VARCHAR(10) NOT NULL
);

-- ===================================
-- 13. morning_events（朝活イベント）
-- ===================================
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

-- ===================================
-- 14. morning_event_on_tags（朝活イベント⇔タグ中間テーブル）
-- ===================================
CREATE TABLE morning_event_on_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES morning_events(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES morning_event_tags(id) ON DELETE CASCADE
);

-- ===================================
-- 15. event_participants（イベント参加者中間テーブル）
-- ===================================
CREATE TABLE event_participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES morning_events(id) ON DELETE CASCADE,
    user_id VARCHAR(255) NOT NULL REFERENCES users(clerk_id) ON DELETE CASCADE,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(event_id, user_id)
);

CREATE INDEX idx_event_participants_event_id ON event_participants(event_id);
CREATE INDEX idx_event_participants_user_id ON event_participants(user_id);

-- ===================================
-- 16. external_event_tags（外部イベントタグ）
-- ===================================
CREATE TABLE external_event_tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    color VARCHAR(10) NOT NULL
);

-- ===================================
-- 17. external_events（外部イベント）
-- ===================================
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

-- ===================================
-- 18. external_event_on_tags（外部イベント⇔タグ中間テーブル）
-- ===================================
CREATE TABLE external_event_on_tags (
    id SERIAL PRIMARY KEY,
    external_event_id INTEGER NOT NULL REFERENCES external_events(id) ON DELETE CASCADE,
    external_event_tag_id INTEGER NOT NULL REFERENCES external_event_tags(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===================================
-- 19. monthly_goals（月間目標）
-- ===================================
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

-- ===================================
-- 20. attendances（出席記録）
-- ===================================
CREATE TABLE attendances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    discord_id VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    channel VARCHAR(255) NOT NULL,
    joined_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX idx_attendances_discord_id ON attendances(discord_id);
CREATE INDEX idx_attendances_joined_at ON attendances(joined_at);

-- ===================================
-- 21. attendance_flags（出席フラグ）
-- ===================================
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

-- ===================================
-- 22. system_notice_tags（システム通知タグ）
-- ===================================
CREATE TABLE system_notice_tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- ===================================
-- 23. system_notices（システム通知）
-- ===================================
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

-- ===================================
-- 24. system_notice_on_tags（システム通知⇔タグ中間テーブル）
-- ===================================
CREATE TABLE system_notice_on_tags (
    id SERIAL PRIMARY KEY,
    system_notice_id INTEGER NOT NULL REFERENCES system_notices(id) ON DELETE CASCADE,
    system_notice_tag_id INTEGER NOT NULL REFERENCES system_notice_tags(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===================================
-- 更新日時自動更新トリガー
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
-- テーブル作成完了
-- ===================================