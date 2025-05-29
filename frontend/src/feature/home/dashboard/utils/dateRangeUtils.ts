/**
 * 指定した期間タイプに応じてstart, endの日付文字列(YYYY-MM-DD)を返す
 * @param type 0:全期間, 1:3ヶ月, 2:1ヶ月
 * @returns { start: string | undefined, end: string | undefined }
 */
export function getDateRangeByType(type: number): { start?: string; end?: string } {
  const today = new Date();
  const end = today.toISOString().slice(0, 10); // 今日

  if (type === 0) {
    // 全期間
    return { start: undefined, end: undefined };
  }
  if (type === 1) {
    // 3ヶ月前
    const startDate = new Date(today);
    startDate.setMonth(startDate.getMonth() - 3);
    const start = startDate.toISOString().slice(0, 10);
    return { start, end };
  }
  if (type === 2) {
    // 1ヶ月前
    const startDate = new Date(today);
    startDate.setMonth(startDate.getMonth() - 1);
    const start = startDate.toISOString().slice(0, 10);
    return { start, end };
  }
  // デフォルトは全期間
  return { start: undefined, end: undefined };
}
