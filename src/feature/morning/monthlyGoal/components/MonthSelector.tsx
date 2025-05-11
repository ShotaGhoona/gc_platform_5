const getMonthOptions = () => {
  const arr: string[] = [];
  const now = new Date();
  for (let i = -6; i < 6; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    arr.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  }
  return arr;
};

export const MonthSelector = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => (
  <select
    className="text-xl font-bold px-4 py-2 rounded border"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  >
    {getMonthOptions().map((ym) => (
      <option key={ym} value={ym}>
        {ym.replace("-", "/")}
      </option>
    ))}
  </select>
);
