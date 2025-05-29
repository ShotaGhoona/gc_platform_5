"use client";
export default function IndexPage() {
  return (
    <div>
      <h1>Discord設定</h1>
      <div style={{ marginTop: 24 }}>
        <button
          onClick={() => {
            const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || "1351805321676460042";
            const redirectUri = encodeURIComponent("http://localhost:3000/setting/discord-setting/callback");
            const url = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=identify`;
            window.location.href = url;
          }}
        >
          Discord連携（OAuth2認証）
        </button>
      </div>
    </div>
  );
}
