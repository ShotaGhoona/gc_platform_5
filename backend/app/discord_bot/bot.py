import os
from dotenv import load_dotenv
import discord

from app.services.discord_bot_service import save_attendance_event

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
    print(f"Bot起動: {client.user}")

@client.event
async def on_voice_state_update(member, before, after):
    # 出席チャンネルへの入室を検知
    if after.channel and after.channel.name == TARGET_CHANNEL_NAME:
        if not before.channel or before.channel.name != TARGET_CHANNEL_NAME:
            print(f"{member.display_name} が出席チャンネルに入りました")
            # ここでDB保存ロジックを呼び出す
            await save_attendance_event(member)
        else:
            print(f"{member.display_name} はすでに出席チャンネルにいました")
    else:
        pass  # 他のチャンネル移動や退出は無視

if __name__ == "__main__":
    if not DISCORD_BOT_TOKEN:
        raise RuntimeError("DISCORD_BOT_TOKENが設定されていません")
    client.run(DISCORD_BOT_TOKEN)
