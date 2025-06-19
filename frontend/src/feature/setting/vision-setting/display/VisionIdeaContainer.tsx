import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { VisionIdea } from "../types/visionSettingType";

type Props = {
  ideas: VisionIdea[];
  onGood: (id: string) => void;
  onBad: (id: string) => void;
};

export default function VisionIdeaContainer({ ideas, onGood, onBad }: Props) {
  if (!ideas || ideas.length === 0) return null;
  return (
    <div className="w-full flex flex-col items-center justify-center gap-5 min-h-0 h-full">
      <div className="w-full flex items-center justify-center gap-2">
        <p className="text-4xl font-bold text-center text-gray-300">Ideas</p>
      </div>
      <div className="w-full gap-5 overflow-y-auto flex-1 flex flex-col items-center justify-center">
        {ideas.map(idea => (
          <div key={idea.id} className="w-[80%] mx-auto border border-gray-300 rounded-lg p-5 relative overflow-hidden group">
            <p className="text-xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#5F7392] to-[#BF6375]">{idea.text}</p>
            <div className="absolute w-full h-full top-1/2 right-0 -translate-y-1/2 flex items-center justify-center gap-2 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
              <div className="bg-linear-to-r from-transparent to-[#EEEEEE] h-full w-full rounded-lg flex items-center justify-end gap-2 p-2 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out">
                <button
                  className="bg-gray-200 rounded-lg shadow-lg flex items-center justify-center gap-2 p-2 z-1"
                  onClick={() => onBad(idea.id)}
                >
                  <FaThumbsDown className="text-gray-500 text-base" />
                  <p className="text-gray-500 text-xs font-bold">Bad</p>
                </button>
                <button
                  className="bg-[#5D6B80] rounded-lg shadow-lg flex items-center justify-center gap-2 p-2 z-1"
                  onClick={() => onGood(idea.id)}
                >
                  <FaThumbsUp className="text-white text-base" />
                  <p className="text-white text-xs font-bold">Good</p>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
