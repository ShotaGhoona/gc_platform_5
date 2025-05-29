import VisionSentence from '@/components/VisionSentence';
export default function VisionContainer(){
    return(
        <div className="w-full bg-white rounded-lg p-5 flex flex-col shadow-md">
            <p className="text-sm text-gray-400">将来の夢・ビジョン</p>
            <div className="flex-1 flex flex-col justify-center gap-1 py-6">
            <VisionSentence />
            </div>
        </div>
    )
}