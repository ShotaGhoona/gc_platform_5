import CommonButton from "@/components/common/commonButton";
import { FaCheck, FaEdit, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { useVisionConfirm } from "../hooks/useVisionConfirm";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type Props = {
    text: string;
    onClose?: () => void;
}

export default function VisionConfirmPopUpChildren({ text, onClose }: Props) {
    const { user } = useUser();
    const [visionText, setVisionText] = useState(text);
    const { loading, error, success, handleConfirm } = useVisionConfirm();
    const router = useRouter();
    const onConfirm = async () => {
        await handleConfirm(user?.id ?? "", visionText);
        if (!error) {
            onClose?.();
            router.push("/dashboard");
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-5 p-5">
            <p className="text-xl font-bold text-center text-gray-300">Your Vision</p>
            <div className="flex-1 w-full flex flex-col items-center justify-center">
                <div className="bg-gray-100 w-10 h-10" style={{clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)"}}></div>
                <div className="flex-1 w-full flex flex-col items-center justify-center bg-gray-100 rounded-lg p-2">
                    <div className="w-full flex items-center justify-center gap-2">
                        <FaEdit className="text-gray-500 text-2xl" />
                        <p className="text-gray-500 text-base font-bold">You can edit your vision</p>
                    </div>
                    <input className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#5F7392] to-[#BF6375] w-full p-5"
                        value={visionText}
                        onChange={(e) => setVisionText(e.target.value)}
                        placeholder="Set your Vision here..."
                    />
                </div>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {success && <div className="text-green-500 text-sm">Visionを登録しました！</div>}
            <div className="w-full flex gap-2 justify-center">
                <CommonButton
                    label="もう一度考える"
                    onClick={() => {onClose?.()}}
                    className="bg-gray-200 text-gray-500"
                    icon={<FaTimes />}
                    disabled={loading}
                />
                <CommonButton
                    label={loading ? "登録中..." : "これに決めた！"}
                    onClick={onConfirm}
                    className="bg-[#5D6B80] text-white"
                    icon={<FaCheck />}
                    disabled={loading}
                />
            </div>
        </div>
    );
}
