-- ===================================
-- Ghoona Camp ダミーデータ挿入SQL
-- ===================================

-- ===================================
-- 1. マスターデータ挿入
-- ===================================

-- 興味・関心マスター
INSERT INTO interests (name, color) VALUES
('プログラミング', '#3B82F6'),
('デザイン', '#8B5CF6'),
('マーケティング', '#EF4444'),
('ビジネス', '#10B981'),
('健康・フィットネス', '#F59E0B'),
('読書', '#6366F1'),
('語学学習', '#EC4899'),
('投資・副業', '#14B8A6'),
('料理', '#F97316'),
('音楽', '#84CC16'),
('写真', '#06B6D4'),
('旅行', '#8B5A2B'),
('ゲーム', '#9333EA'),
('アート', '#DC2626'),
('スポーツ', '#059669');

-- コアスキルマスター
INSERT INTO core_skills (name, color, icon) VALUES
('JavaScript', '#F7DF1E', '💻'),
('Python', '#3776AB', '🐍'),
('React', '#61DAFB', '⚛️'),
('Node.js', '#339933', '📗'),
('SQL', '#4479A1', '🗃️'),
('Adobe Photoshop', '#31A8FF', '🎨'),
('Figma', '#F24E1E', '🎯'),
('マーケティング', '#FF6B6B', '📈'),
('英語', '#4ECDC4', '🌍'),
('UI/UX', '#FF8E53', '🎪'),
('機械学習', '#FF6B9D', '🤖'),
('データ分析', '#45B7D1', '📊'),
('プロジェクト管理', '#96CEB4', '📋'),
('コミュニケーション', '#FFEAA7', '💬'),
('リーダーシップ', '#DDA0DD', '👑');

-- SNSマスター
INSERT INTO sns (name) VALUES
('Instagram'),
('Facebook'),
('Twitter'),
('LinkedIn'),
('Website'),
('TikTok'),
('GitHub'),
('YouTube'),
('Discord'),
('Clubhouse');



INSERT INTO tiers (title_en, title_ja, color, short_description, long_description, story) VALUES
('Sleeper', 'まどろみ見習い', '#C4B5FD', '早起きの芽が目覚めたビギナー', '布団の誘惑と戦いながらも、ほんの少し早く起きてみようと決意し始めたエントリーステージ。小さな一歩が未来を変える予感を秘めている。', '昨日の夜、スマホを握ったまま眠りに落ちた君。けれど今朝、薄紫の夜明けがカーテンを染めた瞬間、胸の奥で“何か”がぱちりと目を覚ました。それは「いつか早起きできたらいいな」という淡い願い──まだ頼りなくても、確かに灯った小さな火だ。君はもこもこの雲パーカーにくるまり、羊のクッションを抱きしめながら大あくび。まぶたは半分しか開かないし、布団の誘惑は相変わらず強敵。でも頬をこするその仕草には、昨日までになかった決意のきらめきが宿っている。「今日は５分だけ早く起きてみよう」──そんな些細なチャレンジこそ、奇跡の第一歩だ。眠気と闘うこの瞬間こそ、君だけの“はじまりの朝”。さぁ、まどろみ見習い・Sleeperの物語はここから動き出す。クッションの羊が数え切れない夢を連れて、君を次のレベルへ導くだろう。'),
('Dawn Wanderer', '夜明けの旅人', '#A5F3FC', '夜明けを探して踏み出す冒険者', '朝の爽快さに気づき、未知の風景と出会うために一歩外へ出るワクワク期。旅の始まりはレトロな目覚ましのベルと共に。', '目覚ましが鳴る一瞬前、君はふと胸騒ぎに導かれて跳ね起きた。柔らかなミントのパーカーに袖を通すと、肌をなでる朝風が旅の合図を送る。小さなレトロ時計を指先で揺らしながら、まだ見ぬ夜明けを追ってデニムの裾を軽くまくる。『日の出はどっち？』と小声で問い、空を指差す君の足取りは雲より軽い。リュックのポケットでカタリと鳴るのはドリームリスト。昨夜走り書きした「今日叶えたい10の小さな勇気」が折りたたまれている。誰に見せるわけでもないその紙切れが、なにより心強い羅針盤だ。ワクワクと不安が混ざる鼓動が、世界をキャンバスに塗り替えていく。まるで目覚めたばかりの空自身がエールを送るように、淡桃の雲が頭上を流れ、風に乗ってレモンの香りが鼻をくすぐる。ほんの数歩で町は未知のフィールドへ変わり、パステルイエローに染まる秒針が新章のスタートを告げる。夜明けの旅人──Dawn Wandererの冒険が、今この瞬間に幕を開けた。'),
('Aurora Scout', '朝焼け探検家', '#FDE68A', '朝の魅力を採集し共有する探検家', '双眼鏡とスケッチブックを片手に、新しい景色とアイデアを採集して仲間へ報告する好奇心フェーズ。', '東の空を赤金に染める光が広がる頃、君の好奇心はもう地図の外側を指していた。カーキのワークベストに三色のマーカーを差し、砂色のショーツを翻しながら、片膝をついて双眼鏡をのぞく。遠くの屋根が朝焼けに燃え、街路樹の葉先に瑞々しい閃きが宿る。革紐でとじたスケッチブックには、アイデアの種が幾重にもスパークしては描きとめられ、新しいページをせがむ。ポケットのライムペンで空のグラデを、ローズの線で新芽の鼓動を、スカイブルーの点描で風の旋律を記す。それらはやがて仲間たちの朝活ログに煌めくインクとなり、誰かの背中をそっと押すエールへ変わる。『見て！』と振り向くその瞳は、夜明けよりも鮮烈に輝くルビー。まだ眠る仲間へ届ける報告書を胸に、君は今日も未知の発見を採集しに走り出す。朝焼け探検家──Aurora Scout。街の片隅も、君のレンズを通せば宝の鉱脈だ。さあ、新しい黎明の色を集めに行こう。'),
('Sunrise Crafter', 'サンライズ職人', '#5EEAD4', '朝時間で作品を形にする職人', '毎朝のルーティンとして創作に打ち込み、世界を少しずつアップデートしていくクリエイティブ期。', '毎朝、まだ街が眠るうちに君の作業台が淡く灯る。スモーキーターコイズのスウェットに生成りエプロン、胸の太陽パッチがかすかに輝く。アイボリーのマグから立つ湯気が薄曇りのレンズを暖め、指先をほぐす。
カン、コト、カリッ──小槌と筆記具が交互にリズムを刻み、無垢の木片や白紙が息を吹き込まれていく。昨日より滑らかな曲線、先週より深い色──ミリ単位の成長を知る者だけが味わえる喜びが、君の胸を静かに満たす。
「よし完成！」と腰を伸ばす瞬間、湯気は祝福の輪となって顔を包み、朝日が窓辺で拍手を送る。サンライズ職人・Sunrise Crafter。習慣という炉で夢を鍛え、夜明けごとに世界を少しずつ美しく更新していく匠の物語が、今日も静かに回転を始めた。'),
('Sun Chaser', '太陽追い', '#F43F5E', '限界に挑むスピードスター', '“あと１分早く” を合言葉に、昨日より速い夜明けを追いかけるエンジン全開フェーズ。', '窓辺の影がまだ長い刻、君はもうスタートラインで心臓を鼓膜のように震わせている。ビビッドスカーレットのジャケットが朝焼けよりも速く風を裂き、ネオンライムの太陽マークが背中で尾光を描く。
スマートウォッチが３、２、１──と無言で脈を告げると同時に、君は重力を置き去りにした。耳に響くのはワイヤレスイヤホンのドラムビートと、自身の呼吸が生むタービン音だけ。
「あと１分早く」──その執念が筋肉を炎に変え、足裏で弾かれたアスファルトが火花を散らす。朝陽が追いつく前にゴールを奪い、昨日の自分を数メートル後方に置き去る快感。汗は宝石、息は蒸気、鼓動はエンジン。
Sun Chaser──太陽追い。君の疾走がつくる風圧は、仲間たちの眠気を吹き飛ばし、「私も行けるはず」と火をつける。さあ秒針より速く、夜明けの地平を突き抜けろ。１秒の革命が、やがて人生全体の軌道を傾けると君は知っているのだから。'),
('Daybreak Master', '暁の達人', '#2563EB', '朝時間術を伝授するコーチ', '洗練されたルーティンで仲間を鼓舞し、朝活コミュニティを牽引する成熟フェーズ。', '夜明け前の静寂を破るのは、君の落ち着いた号令。「その調子！」──深みのある声がコバルトブルーの道着パーカーから放たれ、仲間の背筋に稲妻を走らせる。
自らのルーティンはもはや芸術。ターコイズの帯が揺れるたび、ストップウォッチとチェックリストが正確に噛み合い、時間術の歯車を回す。胸元のシルバーのホイッスルは、必要な時にだけ鳴り、希望の周波数で鼓動を共鳴させる。
君が掲げる右拳は勝利の灯台、腰に添えた左拳は揺るぎない基礎。Daybreak Master──暁の達人。自己鍛錬を極めたその背中は、追随者にとって天空にかかる梯子だ。'),
('Aurora Guardian', '曙光の守護者', '#8B5CF6', '灯台役として朝文化を守るリーダー', '行動と言葉でコミュニティ全体を照らし、朝活文化を育む守護者フェーズ。', '昨夜、灯りの落ちたリビングで君は次の計画を整えた。午前4時、空が群青から茜へ染まる頃、君の足取りは灯台のように揺るぎない。リッチバイオレットの軽鎧ローブが朝日にきらめき、胸のゴールド縁の八角形が仲間の希望を反射する。
手にしたクリスタルランタンは柔らかな琥珀光を放ち、まだ暗い道を照らして迷える者を導く。視線を上げ、もう一方の手を外へ広げる仕草は、世界を抱きしめる誓い。「私の光は皆のもの」──その静かな覚悟が遠くの寝坊助にも暖かな波紋を送る。'),
('Solar Sage', '太陽賢者', '#F59E0B', '朝の叡智で人々を導く賢者', '完全皆勤を達成し、穏やかな叡智で周囲の一日を照らすフィロソファーフェーズ。', '長い旅路の果てに、ついにカレンダーは皆勤を刻みきった。ディープサフランのローブが黄金の縁取りを揺らし、胸の八芒星に朝陽が宿る。柔らかな白髪を撫でる風は穏やかで、杖の先で回転する小さな太陽オーブが静かに光輪を描く。
「朝は君の味方」──差し伸べた右手に、誰もが一日の扉を開く鍵を見つけるだろう。眠気に迷う者には微笑みを、挑戦に焦る者には静かな言葉を。太陽賢者・Solar Sage。その眼差しは夜更かしの影を溶かし、仲間の一日をやさしく照らす羅針盤。');

-- 朝活イベントタグ
INSERT INTO morning_event_tags (name, color) VALUES
('勉強会', '#3B82F6'),
('読書会', '#8B5CF6'),
('ワークアウト', '#EF4444'),
('瞑想', '#10B981'),
('プログラミング', '#F59E0B'),
('英会話', '#EC4899'),
('ヨガ', '#14B8A6'),
('ジョギング', '#F97316'),
('モーニングコーヒー', '#8B4513'),
('目標設定', '#6366F1');

-- 外部イベントタグ
INSERT INTO external_event_tags (name, color) VALUES
('セミナー', '#3B82F6'),
('ワークショップ', '#8B5CF6'),
('ネットワーキング', '#EF4444'),
('カンファレンス', '#10B981'),
('ハッカソン', '#F59E0B'),
('勉強会', '#EC4899'),
('交流会', '#14B8A6'),
('講演会', '#F97316'),
('展示会', '#6366F1'),
('体験会', '#84CC16');

-- システム通知タグ
INSERT INTO system_notice_tags (name, color) VALUES
('重要', '#EF4444'),
('更新情報', '#3B82F6'),
('イベント', '#10B981'),
('メンテナンス', '#F59E0B'),
('新機能', '#8B5CF6'),
('キャンペーン', '#EC4899'),
('お知らせ', '#6B7280');

-- ===================================
-- 2. テストユーザーデータ
-- ===================================

-- テストユーザー（管理者）
INSERT INTO users (clerk_id, email, username, discord_id) VALUES
('user_admin001', 'admin@ghoona.camp', 'ghoonacamp_admin', 'discord_admin_001'),
('user_host001', 'host1@ghoona.camp', 'morning_host', 'discord_host_001'),
('user_host002', 'host2@ghoona.camp', 'event_organizer', 'discord_host_002');

-- 一般テストユーザー（30名）
INSERT INTO users (clerk_id, email, username, discord_id) VALUES
('user_001', 'user001@example.com', 'early_bird_001', 'discord_001'),
('user_002', 'user002@example.com', 'morning_sunshine', 'discord_002'),
('user_003', 'user003@example.com', 'dawn_walker', 'discord_003'),
('user_004', 'user004@example.com', 'sunrise_lover', 'discord_004'),
('user_005', 'user005@example.com', 'morning_glory', 'discord_005'),
('user_006', 'user006@example.com', 'aurora_chaser', 'discord_006'),
('user_007', 'user007@example.com', 'daybreak_warrior', 'discord_007'),
('user_008', 'user008@example.com', 'morning_dew', 'discord_008'),
('user_009', 'user009@example.com', 'sun_seeker', 'discord_009'),
('user_010', 'user010@example.com', 'early_starter', 'discord_010'),
('user_011', 'user011@example.com', 'morning_champion', 'discord_011'),
('user_012', 'user012@example.com', 'dawn_master', 'discord_012'),
('user_013', 'user013@example.com', 'sunrise_hero', 'discord_013'),
('user_014', 'user014@example.com', 'morning_legend', 'discord_014'),
('user_015', 'user015@example.com', 'early_achiever', 'discord_015'),
('user_016', 'user016@example.com', 'morning_star', 'discord_016'),
('user_017', 'user017@example.com', 'dawn_bringer', 'discord_017'),
('user_018', 'user018@example.com', 'sunrise_guardian', 'discord_018'),
('user_019', 'user019@example.com', 'morning_pioneer', 'discord_019'),
('user_020', 'user020@example.com', 'early_explorer', 'discord_020'),
('user_021', 'user021@example.com', 'morning_ninja', 'discord_021'),
('user_022', 'user022@example.com', 'dawn_dancer', 'discord_022'),
('user_023', 'user023@example.com', 'sunrise_sage', 'discord_023'),
('user_024', 'user024@example.com', 'morning_wizard', 'discord_024'),
('user_025', 'user025@example.com', 'early_phoenix', 'discord_025'),
('user_026', 'user026@example.com', 'morning_dragon', 'discord_026'),
('user_027', 'user027@example.com', 'dawn_knight', 'discord_027'),
('user_028', 'user028@example.com', 'sunrise_monk', 'discord_028'),
('user_029', 'user029@example.com', 'morning_samurai', 'discord_029'),
('user_030', 'user030@example.com', 'early_angel', 'discord_030');

-- ===================================
-- 3. プロフィールデータ
-- ===================================

-- 管理者プロフィール
INSERT INTO profiles (user_id, username, vision, bio, one_line_profile, personal_color, background) VALUES
('user_admin001', 'Ghoona Camp管理者', '朝活を通じて世界をより良い場所にする', 'Ghoona Campの運営を行っています。皆さんの朝活ライフをサポートします！', '朝活コミュニティの管理者', '#FF6B6B', 'Ghoona Campの創設メンバーとして、朝活文化の普及に努めています。'),
('user_host001', 'モーニングホスト', '毎朝のイベントで仲間と成長する', '朝活イベントの主催者です。一緒に素晴らしい朝を過ごしましょう！', '朝活イベントホスト', '#4ECDC4', 'イベント企画が大好きで、みんなが楽しめる朝活を心がけています。'),
('user_host002', 'イベントオーガナイザー', '学びと交流の場を創造する', '様々な分野の勉強会を企画しています。', '学習系イベントの主催者', '#45B7D1', '教育とコミュニティ作りに情熱を注いでいます。');

-- 一般ユーザープロフィール（サンプル）
INSERT INTO profiles (user_id, username, vision, bio, one_line_profile, personal_color, background) VALUES
('user_001', 'アーリーバード', '早起きで人生を変える', 'プログラマーです。朝活で勉強時間を確保しています。', 'エンジニア × 早起き愛好家', '#3B82F6', 'Web開発をしながら、朝の時間を活用してスキルアップを図っています。'),
('user_002', 'サンシャイン', '朝の光と共に成長する', 'デザイナーとして働いています。朝のクリエイティブタイムが大切です。', 'クリエイティブな朝活実践者', '#F59E0B', 'UI/UXデザインの仕事をしており、朝の静かな時間にアイデアを練っています。'),
('user_003', 'ドーンウォーカー', '新しい日に新しい挑戦', 'マーケティングの仕事をしています。朝活で業界の最新情報をキャッチアップ。', 'マーケター', '#10B981', 'デジタルマーケティングの分野で働きながら、朝活で自己啓発に取り組んでいます。'),
('user_004', 'サンライズラバー', '太陽と共に起きる生活', '学生です。朝活で資格勉強をしています。', '勉強熱心な大学生', '#EC4899', '大学生活と並行して、将来のキャリアに向けた勉強を朝活で行っています。'),
('user_005', 'モーニンググローリー', '朝の栄光を掴む', 'フリーランスのライターです。朝の集中力を活かして執筆活動。', 'フリーランスライター', '#8B5CF6', '朝の静寂な時間を活用して、質の高い記事を執筆しています。');

-- 興味・関心の関連付け（サンプル）
INSERT INTO profile_interest (profile_id, interest_id) 
SELECT p.id, i.id 
FROM profiles p, interests i 
WHERE p.user_id = 'user_001' AND i.name IN ('プログラミング', 'ビジネス', '読書');

INSERT INTO profile_interest (profile_id, interest_id) 
SELECT p.id, i.id 
FROM profiles p, interests i 
WHERE p.user_id = 'user_002' AND i.name IN ('デザイン', 'アート', '写真');

INSERT INTO profile_interest (profile_id, interest_id) 
SELECT p.id, i.id 
FROM profiles p, interests i 
WHERE p.user_id = 'user_003' AND i.name IN ('マーケティング', 'ビジネス', '読書');

-- コアスキルの関連付け（サンプル）
INSERT INTO profile_core_skill (profile_id, core_skill_id) 
SELECT p.id, cs.id 
FROM profiles p, core_skills cs 
WHERE p.user_id = 'user_001' AND cs.name IN ('JavaScript', 'React', 'Node.js');

INSERT INTO profile_core_skill (profile_id, core_skill_id) 
SELECT p.id, cs.id 
FROM profiles p, core_skills cs 
WHERE p.user_id = 'user_002' AND cs.name IN ('Figma', 'Adobe Photoshop', 'UI/UX');

-- ===================================
-- 4. ティア付与データ
-- ===================================

-- 管理者に最高ティア付与
INSERT INTO user_tiers (user_id, tier_id, role) VALUES
('user_admin001', 8, 'main');

-- ホストに高位ティア付与
INSERT INTO user_tiers (user_id, tier_id, role) VALUES
('user_host001', 6, 'main'),
('user_host002', 5, 'main');

-- 一般ユーザーにランダムなティア付与
INSERT INTO user_tiers (user_id, tier_id, role) VALUES
('user_001', 4, 'main'),
('user_002', 3, 'main'),
('user_003', 4, 'main'),
('user_004', 2, 'main'),
('user_005', 3, 'main'),
('user_006', 3, 'main'),
('user_007', 2, 'main'),
('user_008', 1, 'main'),
('user_009', 2, 'main'),
('user_010', 1, 'main');

-- ===================================
-- 5. 朝活イベントデータ
-- ===================================

-- 今月の朝活イベント
INSERT INTO morning_events (title, description, host_user_id, start_at, end_at) VALUES
('朝活プログラミング勉強会', 'JavaScript基礎から応用まで一緒に学びましょう！', 'user_host001', '2025-01-21 06:00:00+09', '2025-01-21 08:00:00+09'),
('モーニングヨガ', '心と体を整える朝のヨガセッション', 'user_host002', '2025-01-21 06:30:00+09', '2025-01-21 07:30:00+09'),
('読書会：ビジネス書', '今月のテーマ書籍について語り合いましょう', 'user_host001', '2025-01-22 06:00:00+09', '2025-01-22 08:00:00+09'),
('英会話モーニングセッション', 'カジュアルな英会話で1日をスタート', 'user_host002', '2025-01-22 06:30:00+09', '2025-01-22 07:30:00+09'),
('瞑想とマインドフルネス', '静寂な朝の時間で心を落ち着けましょう', 'user_host001', '2025-01-23 06:00:00+09', '2025-01-23 07:00:00+09'),
('モーニングジョギング', 'バーチャルジョギングで体を動かそう', 'user_host002', '2025-01-23 06:30:00+09', '2025-01-23 07:30:00+09'),
('目標設定ワークショップ', '1週間の目標を一緒に設定しましょう', 'user_host001', '2025-01-24 06:00:00+09', '2025-01-24 08:00:00+09'),
('朝のコーヒータイム', 'リラックスした雰囲気で朝のひとときを', 'user_host002', '2025-01-24 07:00:00+09', '2025-01-24 08:00:00+09'),
('プログラミング質問会', '開発で困っていることを相談しましょう', 'user_host001', '2025-01-25 06:00:00+09', '2025-01-25 08:00:00+09'),
('週末振り返り会', '1週間を振り返って来週に備えましょう', 'user_host002', '2025-01-25 07:00:00+09', '2025-01-25 08:30:00+09');

-- イベント参加者データ
INSERT INTO event_participants (event_id, user_id) 
SELECT me.id, u.clerk_id 
FROM morning_events me, users u 
WHERE me.title = '朝活プログラミング勉強会' 
AND u.clerk_id IN ('user_001', 'user_003', 'user_005', 'user_007', 'user_009');

INSERT INTO event_participants (event_id, user_id) 
SELECT me.id, u.clerk_id 
FROM morning_events me, users u 
WHERE me.title = 'モーニングヨガ' 
AND u.clerk_id IN ('user_002', 'user_004', 'user_006', 'user_008', 'user_010');

-- ===================================
-- 6. 外部イベントデータ
-- ===================================

INSERT INTO external_events (title, description, host_user_id, start_at, end_at) VALUES
('Tech Conference 2025', '最新技術トレンドを学ぶカンファレンス', 'user_admin001', '2025-02-15 09:00:00+09', '2025-02-15 18:00:00+09'),
('デザイン思考ワークショップ', 'ユーザー中心のデザインプロセスを学ぶ', 'user_host002', '2025-02-20 10:00:00+09', '2025-02-20 17:00:00+09'),
('スタートアップピッチイベント', '起業家精神を学ぶネットワーキングイベント', 'user_host001', '2025-02-25 14:00:00+09', '2025-02-25 20:00:00+09'),
('マインドフルネス瞑想リトリート', '1日集中瞑想プログラム', 'user_admin001', '2025-03-01 08:00:00+09', '2025-03-01 18:00:00+09'),
('Web開発ハッカソン', '24時間でWebアプリを作ろう', 'user_host001', '2025-03-08 09:00:00+09', '2025-03-09 09:00:00+09');

-- ===================================
-- 7. 月間目標データ
-- ===================================

INSERT INTO monthly_goals (user_id, goal_text, monthly_start_date, is_public) VALUES
('user_001', 'JavaScriptの新しいフレームワークを1つマスターする', '2025-01-01', true),
('user_002', 'デザインポートフォリオを完成させる', '2025-01-01', true),
('user_003', 'マーケティング関連の資格を取得する', '2025-01-01', true),
('user_004', 'TOEIC 800点を達成する', '2025-01-01', true),
('user_005', '毎日1000文字以上の記事を書く', '2025-01-01', true),
('user_001', 'React Native でモバイルアプリを開発する', '2025-02-01', true),
('user_002', 'UI/UXデザインの新しい手法を3つ学ぶ', '2025-02-01', true),
('user_003', 'SNSマーケティングの戦略を立案・実行する', '2025-02-01', true);

-- ===================================
-- 8. 出席データ（過去1ヶ月分）
-- ===================================

-- 出席記録の生成（2025年1月分）
INSERT INTO attendances (discord_id, username, channel, joined_at)
SELECT 
    u.discord_id,
    u.username,
    'morning-活動',
    ('2025-01-' || LPAD(day::text, 2, '0') || ' 06:' || LPAD((random() * 59)::int::text, 2, '0') || ':00+09')::timestamptz
FROM users u, generate_series(1, 20) as day
WHERE u.discord_id IS NOT NULL 
AND random() > 0.3  -- 70%の確率で出席
LIMIT 300;

-- 出席フラグの生成
INSERT INTO attendance_flags (user_id, date, six_clock_flag)
SELECT 
    u.clerk_id,
    ('2025-01-' || LPAD(day::text, 2, '0'))::date,
    random() > 0.4  -- 60%の確率で6時出席
FROM users u, generate_series(1, 20) as day
WHERE random() > 0.2  -- 80%の確率で何らかの出席
LIMIT 400;

-- ===================================
-- 9. システム通知データ
-- ===================================

INSERT INTO system_notices (title, description, image_url, publish_start_at, publish_end_at) VALUES
('新機能リリースのお知らせ', 'ライバル機能が追加されました！', 'https://example.com/notice1.jpg', '2025-01-15 00:00:00+09', '2025-01-31 23:59:59+09'),
('メンテナンス実施のお知らせ', '1月25日にシステムメンテナンスを実施します', 'https://example.com/notice2.jpg', '2025-01-20 00:00:00+09', '2025-01-26 23:59:59+09'),
('イベント企画募集', '朝活イベントのアイデアを募集中です', 'https://example.com/notice3.jpg', '2025-01-10 00:00:00+09', '2025-02-10 23:59:59+09'),
('月間MVPの発表', '1月の最優秀メンバーを発表しました', 'https://example.com/notice4.jpg', '2025-01-01 00:00:00+09', '2025-01-31 23:59:59+09');

-- システム通知とタグの関連付け
INSERT INTO system_notice_on_tags (system_notice_id, system_notice_tag_id)
SELECT sn.id, snt.id
FROM system_notices sn, system_notice_tags snt
WHERE sn.title = '新機能リリースのお知らせ' AND snt.name = '新機能';

INSERT INTO system_notice_on_tags (system_notice_id, system_notice_tag_id)
SELECT sn.id, snt.id
FROM system_notices sn, system_notice_tags snt
WHERE sn.title = 'メンテナンス実施のお知らせ' AND snt.name = 'メンテナンス';

INSERT INTO system_notice_on_tags (system_notice_id, system_notice_tag_id)
SELECT sn.id, snt.id
FROM system_notices sn, system_notice_tags snt
WHERE sn.title = 'イベント企画募集' AND snt.name = 'イベント';

-- ===================================
-- ダミーデータ挿入完了
-- ===================================

-- 挿入結果の確認
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
SELECT '出席記録数', COUNT(*) FROM attendances
UNION ALL
SELECT 'システム通知数', COUNT(*) FROM system_notices;