"use client";
import { useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useDiscordCallback } from "../hooks/useDiscordCallback";

export default function DiscordCallbackPage() {
  const searchParams = useSearchParams();
  const { user } = useUser();
  const code = searchParams.get("code");
  const userId = user?.id ?? null;
  const { status, message } = useDiscordCallback(code, userId);

  return (
    <div>
      <h1>Discord連携</h1>
      {status === "loading" && <p>連携処理中...</p>}
      {status === "success" && <p style={{ color: "green" }}>{message}</p>}
      {status === "error" && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
}
