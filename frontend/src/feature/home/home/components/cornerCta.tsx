export default function CornerCta(
    { color, text, subText, subText2 }: { color: string; text: string; subText: string; subText2: string }
) {
  return (
    <div 
      style={{ backgroundColor: `#${color}` }} 
      className="min-w-[350px] px-8 py-4 rounded-tl-[60px] rounded-br-lg text-white flex items-end gap-4 cursor-pointer hover:opacity-90 transition-opacity shadow-md"
    >
        <div>
            <span className="text-sm">{subText2}</span>
        </div>
        <div className="flex flex-col">
            <span className="text-sm">{subText}</span>
            <span className="text-4xl font-bold">{text}</span>
        </div>
    </div>
  );
}