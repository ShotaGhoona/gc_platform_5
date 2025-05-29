import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import CommonButton from "@/components/common/commonButton";
import { FaEdit, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

type Props = {
  onClose: () => void;
};

export default function VisionPageExplainPopUpChildren({ onClose }: Props) {
  return (
    <div className="flex flex-col items-center gap-8 w-full h-full p-5">
      <div className="flex flex-col items-center gap-2 w-full">
        <h1 className="text-3xl font-bold text-[#5D6B80]">どうやってVisionを決める？</h1>
        <p className="text-base text-gray-500">How to decide your Vision?</p>
      </div>
      <div className="grid grid-cols-2 gap-5 w-full h-full">
        <div className="h-full bg-gradient-to-br from-[#ABBDD8] to-[#DFBEC4] rounded-lg shadow-lg p-5 flex flex-col gap-2 items-center justify-center relative"> 
          <div className="flex items-center justify-center gap-2 opacity-70">
            <button className="px-4 py-1 rounded-full text-sm font-bold transition bg-[#5D6B80] text-white shadow">会話モード</button>
            <button className="px-4 py-1 rounded-full text-sm font-bold transition bg-gray-100 text-gray-500">提案モード</button>
          </div>
          <div className="flex text-center justify-center items-center text-base text-gray-700 font-bold p-5">
            AIと会話しながら人生のVision<br />（なりたい将来像・価値観）を考える
          </div>
          <div className="absolute top-0 left-0">
              <p
                className="text-lg text-white w-20 h-15 rounded-tl-lg flex items-start justify-center p-3 font-bold"
                style={{ backgroundColor: "#5D6B80", color: "white", clipPath: "circle(75% at 23% 3%)" }}
              >
                1
              </p>
          </div>
        </div>
        <div className="h-full bg-gradient-to-br from-[#ABBDD8] to-[#DFBEC4] rounded-lg shadow-lg p-5 flex flex-col gap-2 items-center justify-center relative"> 
          <div className="flex items-center justify-center gap-2 opacity-70">
            <button className="px-4 py-1 rounded-full text-sm font-bold transition bg-gray-100 text-gray-500">会話モード</button>
            <button className="px-4 py-1 rounded-full text-sm font-bold transition bg-[#5D6B80] text-white shadow">提案モード</button>
          </div>
          <div className="flex text-center justify-center items-center text-base text-gray-700 font-bold p-5">
            AIがVision案を4つ提案
          </div>
          <div className="absolute top-0 right-0">
              <p
                className="text-lg text-white w-20 h-15 rounded-tr-lg flex items-start justify-center p-3 font-bold"
                style={{ backgroundColor: "#5D6B80", color: "white", clipPath: "circle(75% at 67% 3%)" }}
              >
                2
              </p>
          </div>
        </div>
        <div className="h-full bg-gradient-to-br from-[#ABBDD8] to-[#DFBEC4] rounded-lg shadow-lg p-5 flex flex-col gap-2 items-center justify-center relative">    
          <div className="flex items-center justify-center gap-2">
            <FaThumbsUp className="w-5 h-5 text-gray-500" />
            <p className="text-lg font-bold text-gray-500">or</p>
            <FaThumbsDown className="w-5 h-5 text-gray-500" />
          </div>
          <p className="text-center text-gray-700 text-base font-bold">GoodとBadを選ぶことでVisionを選定</p>
          <div className="absolute bottom-0 left-0">
            <p
                className="text-lg text-white w-20 h-15 rounded-bl-lg flex items-start justify-center p-3 font-bold"
                style={{ backgroundColor: "#5D6B80", color: "white", clipPath: "circle(75% at 23% 97%)" }}
              >
                3
              </p>
          </div>
        </div>
        <div className="h-full bg-gradient-to-br from-[#ABBDD8] to-[#DFBEC4] rounded-lg shadow-lg p-5 flex flex-col gap-2 items-center justify-center relative">    
          <div className="flex items-center justify-center gap-2">
            <FaEdit className="w-5 h-5 text-gray-500" />
            <p className="text-lg font-bold text-gray-500">Edit</p>
          </div>
          <p className="text-center text-gray-700 text-base font-bold">最期は自分で文言を微調整</p>
          <div className="absolute bottom-0 right-0">
            <p
                className="text-lg text-white w-20 h-15 rounded-br-lg flex items-start justify-center p-3 font-bold"
                style={{ backgroundColor: "#5D6B80", color: "white", clipPath: "circle(75% at 67% 97%)" }}
              >
                4
              </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 w-full">
        <CommonButton 
          onClick={onClose} 
          label="早速会話を始める" 
          className="bg-[#5D6B80] text-white"
          icon={<IoChatbubbleEllipsesSharp className="text-white w-5 h-5" />}
        />
      </div>
    </div>
  );
}
