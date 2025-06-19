/**
 * 開始時間（"YYYY-MM-DDTHH:mm"）とduration（分）から終了時間（"YYYY-MM-DDTHH:mm"）を返す
 */
export function calcEndAt(startAt: string, duration: number): string {
  const date = startAt.slice(0, 10);
  const time = startAt.slice(11, 16);
  const [h, m] = time.split(":");
  const startMin = Number(h) * 60 + Number(m);
  const endMin = startMin + duration;
  const endH = String(Math.floor(endMin / 60)).padStart(2, "0");
  const endM = String(endMin % 60).padStart(2, "0");
  return `${date}T${endH}:${endM}`;
}

/**
 * 開始・終了時刻（"YYYY-MM-DDTHH:mm"）からduration（分）を返す
 */
export function calcDuration(startAt: string, endAt: string): number {
  const s = new Date(startAt);
  const e = new Date(endAt);
  return Math.round((e.getTime() - s.getTime()) / 60000);
}

/**
 * 分数から「30分」「1時間」「1.5時間」「2時間」などのラベルを返す
 */
export function durationLabel(min: number): string {
  if (min === 30) return "30分";
  if (min === 60) return "1時間";
  if (min === 90) return "1.5時間";
  if (min === 120) return "2時間";
  return `${min}分`;
}
