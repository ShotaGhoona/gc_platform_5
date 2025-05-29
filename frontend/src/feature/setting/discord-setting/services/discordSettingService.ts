export async function getDiscordId(userId: string): Promise<string | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/discord`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.discord_id ?? null;
}

export async function setDiscordId(userId: string, discordId: string): Promise<boolean> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/discord`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ discord_id: discordId }),
  });
  return res.ok;
}
