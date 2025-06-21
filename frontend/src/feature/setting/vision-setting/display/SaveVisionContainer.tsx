import { GiConfirmed } from "react-icons/gi";
import { FaTrash } from "react-icons/fa";
import { VisionIdea } from "../types/visionSettingType";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import VisionConfirmPopUpChildren from "../components/VisionConfirmPopUpChildren";

type Props = {
  ideas: VisionIdea[];
  onBad: (id: string) => void;
};

export default function SaveVisionContainer({ ideas, onBad }: Props) {
  if (!ideas || ideas.length === 0) return null;
  return (
    <>
        <div className="w-full flex flex-col items-center justify-center gap-5">
            <div className="w-full flex items-center justify-center gap-2">
                <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
                <p className="text-xl font-bold text-center text-gray-300">Temporary Save</p>
                <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
            </div>
            <div className="w-full grid grid-cols-2 gap-5">
            {ideas.map(idea => (
            <div key={idea.id} className="w-full mx-auto h-full bg-gray-50 rounded-lg p-5 relative overflow-hidden group">
                <p className="text-xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#5F7392] to-[#BF6375] opacity-60">{idea.text}</p>
                <div className="absolute w-full h-full top-1/2 right-0 -translate-y-1/2 flex items-center justify-center gap-2 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                    <div className="bg-linear-to-r from-transparent to-gray-50 h-full w-full rounded-lg flex items-center justify-end gap-2 p-2 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out">
                    <div 
                        onClick={() => onBad(idea.id)}
                        className="bg-gray-200 rounded-lg shadow-lg flex items-center justify-center gap-2 p-2 z-1"
                    >
                        <FaTrash className="text-gray-500 text-base" />
                        <p className="text-gray-500 text-xs font-bold">Delete</p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="bg-[#5D6B80] rounded-lg shadow-lg flex items-center justify-center gap-2 p-2 z-1 cursor-pointer">
                          <GiConfirmed className="text-white text-base" />
                          <p className="text-white text-xs font-bold">Confirm</p>
                        </div>
                      </DialogTrigger>
                      <DialogContent>
                        <VisionConfirmPopUpChildren text={idea.text} />
                      </DialogContent>
                    </Dialog>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
    </>
  );
}
