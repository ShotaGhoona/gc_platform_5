import os
import sys
import asyncio
from datetime import datetime
from dotenv import load_dotenv
import discord

load_dotenv()

DISCORD_BOT_TOKEN = os.getenv("DISCORD_BOT_TOKEN")
TARGET_CHANNEL_NAME = "✅｜しゅっせき！"  # 実際のチャンネル名に合わせて変更

intents = discord.Intents.default()
intents.guilds = True
intents.voice_states = True
intents.members = True

client = discord.Client(intents=intents)

@client.event
async def on_ready():
    print(f"Discord Bot起動完了: {client.user}")
    print(f"監視対象チャンネル: {TARGET_CHANNEL_NAME}")
    print("Bot is ready and monitoring voice channels...")

@client.event
async def on_voice_state_update(member, before, after):
    # 出席チャンネルへの入室を検知
    if after.channel and after.channel.name == TARGET_CHANNEL_NAME:
        if not before.channel or before.channel.name != TARGET_CHANNEL_NAME:
            print(f"{member.display_name} が出席チャンネルに入りました")
            # ここでDB保存ロジックを呼び出す
            from services.discord_bot_service import save_attendance_event
            await save_attendance_event(member)
        else:
            print(f"{member.display_name} はすでに出席チャンネルにいました")
    else:
        pass  # 他のチャンネル移動や退出は無視

async def main():
    if not DISCORD_BOT_TOKEN:
        raise RuntimeError("DISCORD_BOT_TOKENが設定されていません")
    
    print("Discord Bot starting...")
    try:
        await client.start(DISCORD_BOT_TOKEN)
    except KeyboardInterrupt:
        print("Bot shutdown requested")
        await client.close()
    except Exception as e:
        print(f"Bot error: {e}")
        await client.close()
        raise

if __name__ == "__main__":
    asyncio.run(main())