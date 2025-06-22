# Discord Bot Service

朝活出席管理用のDiscord Botサービスです。

## 概要

このBotは指定されたDiscordボイスチャンネル（`✅｜しゅっせき！`）への参加を監視し、自動的に出席データをデータベースに記録します。

## 機能

- Discord ボイスチャンネルの監視
- 出席チャンネルへの参加検知
- 自動出席記録（データベース保存）
- エラー時の自動再起動

## 環境変数

- `DISCORD_BOT_TOKEN` - Discord Botのトークン
- `DATABASE_URL` - PostgreSQLデータベースの接続URL

## デプロイ手順（Railway）

1. Railway CLIをインストール
```bash
npm install -g @railway/cli
```

2. Railwayにログイン
```bash
railway login
```

3. プロジェクトを初期化
```bash
railway init
```

4. デプロイ実行
```bash
railway up
```

5. 環境変数を設定
- Railwayダッシュボードで `DISCORD_BOT_TOKEN` と `DATABASE_URL` を設定

## ローカル開発

1. 依存関係をインストール
```bash
pip install -r requirements.txt
```

2. 環境変数を設定
```bash
cp .env.example .env
# .envファイルを編集して適切な値を設定
```

3. Botを起動
```bash
python bot.py
```

## 監視対象チャンネル

- チャンネル名: `✅｜しゅっせき！`
- このチャンネルへの参加が自動的に記録されます

## ログ

Botの動作ログは標準出力に表示されます：
- Bot起動完了
- チャンネル参加検知
- データベース保存結果
- エラー情報