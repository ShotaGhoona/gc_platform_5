// 'use client';

// import { useCallback, useState } from 'react';
// import { useDropzone } from 'react-dropzone';

// interface AvatarUploadProps {
//   onFileSelect: (file: File | null) => void;
//   previewUrl?: string | null;
// }

// const MAX_IMAGE_SIZE = 512; // 最大画像サイズ
// const JPEG_QUALITY = 0.8;   // JPEG品質

// // 画像をリサイズしてData URLに変換
// const resizeAndConvertToDataURL = (file: File): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       img.src = e.target?.result as string;
//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         let width = img.width;
//         let height = img.height;

//         // アスペクト比を保持しながらリサイズ
//         if (width > height) {
//           if (width > MAX_IMAGE_SIZE) {
//             height = Math.round((height * MAX_IMAGE_SIZE) / width);
//             width = MAX_IMAGE_SIZE;
//           }
//         } else {
//           if (height > MAX_IMAGE_SIZE) {
//             width = Math.round((width * MAX_IMAGE_SIZE) / height);
//             height = MAX_IMAGE_SIZE;
//           }
//         }

//         canvas.width = width;
//         canvas.height = height;

//         const ctx = canvas.getContext('2d');
//         if (!ctx) {
//           reject(new Error('Failed to get canvas context'));
//           return;
//         }

//         ctx.drawImage(img, 0, 0, width, height);
//         resolve(canvas.toDataURL('image/jpeg', JPEG_QUALITY));
//       };
//       img.onerror = () => reject(new Error('Failed to load image'));
//     };
//     reader.onerror = () => reject(new Error('Failed to read file'));
//     reader.readAsDataURL(file);
//   });
// };

// export const AvatarUpload = ({ 
//   onFileSelect, previewUrl 
// }: AvatarUploadProps) => {
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
//   const [imageDescription, setImageDescription] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);

//   const onDrop = useCallback(async (acceptedFiles: File[]) => {
//     try {
//       if (acceptedFiles[0]) {
//         onFileSelect(acceptedFiles[0]);
//         const dataUrl = await resizeAndConvertToDataURL(acceptedFiles[0]);
//         setImageDataUrl(dataUrl);
//       }
//     } catch (err) {
//       console.error('Image processing error:', err);
//       setError(`画像の処理に失敗しました: ${err instanceof Error ? err.message : '不明なエラー'}`);
//     }
//   }, [onFileSelect]);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       'image/*': ['.jpeg', '.jpg', '.png', '.gif']
//     },
//     maxFiles: 1,
//     multiple: false,
//   });

//   const analyzeImage = async (dataUrl: string) => {
//     try {
//       setIsAnalyzing(true);
//       setError(null);

//       const response = await fetch('/api/avatar/analyze', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ imageDataUrl: dataUrl }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || '画像の分析に失敗しました');
//       }

//       setImageDescription(data.description);
//       return data.description;

//     } catch (err) {
//       console.error('Image analysis error:', err);
//       setError(`画像分析エラー: ${err instanceof Error ? err.message : '不明なエラー'}`);
//       return null;
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   const handleGenerateAvatar = async () => {
//     try {
//       if (!imageDataUrl) {
//         throw new Error('元となる画像がありません');
//       }

//       // まず画像を分析
//       setIsGenerating(true);
//       const description = await analyzeImage(imageDataUrl);

//       if (!description) {
//         throw new Error('画像の分析に失敗しました');
//       }

//       // 分析結果を基に新しい画像を生成
//       const generateResponse = await fetch('/api/avatar/generate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           description,
//           style: 'modern, clean, professional avatar style',
//         }),
//       });

//       const generateData = await generateResponse.json();

//       if (!generateResponse.ok) {
//         throw new Error(generateData.error || '画像生成に失敗しました');
//       }

//       setGeneratedImageUrl(generateData.url);

//     } catch (err) {
//       console.error('Avatar generation error:', err);
//       setError(`エラーが発生しました: ${err instanceof Error ? err.message : '不明なエラー'}`);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   return (
//     <div className="w-full mx-auto">
//       <div
//         {...getRootProps()}
//         className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-pink-400 transition-colors"
//       >
//         <input {...getInputProps()} />
//         {imageDataUrl ? (
//           <div className="flex items-center justify-center gap-4">
//             <div className="relative w-32 h-32 mx-auto">
//               <img
//                 src={imageDataUrl}
//                 alt="アバタープレビュー"
//                 className="w-full h-full object-cover rounded-full"
//               />
//               <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity">
//                 <p className="text-white text-sm">クリックして変更</p>
//               </div>
//             </div>
//             <p>＞＞＞</p>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleGenerateAvatar();
//               }}
//               disabled={isAnalyzing || isGenerating}
//               className={`text-sm bg-[#374559] text-white rounded-md px-4 py-2 ${
//                 (isAnalyzing || isGenerating) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#4a5d7a]'
//               }`}
//             >
//               {isAnalyzing ? '分析中...' : isGenerating ? '生成中...' : '画像を生成する'}
//             </button>
//             <p>＞＞＞</p>
//             <div className="relative w-32 h-32 mx-auto bg-gray-300 rounded-full">
//               {generatedImageUrl ? (
//                 <img
//                   src={generatedImageUrl}
//                   alt="生成された画像"
//                   className="w-full h-full object-cover rounded-full"
//                 />
//               ) : (
//                 <div className="flex items-center justify-center h-full">
//                   <p className="text-gray-500 text-sm">生成後の画像</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         ) : (
//           <div className="space-y-2">
//             <div className="text-4xl text-gray-400">☁️</div>
//             <p className="text-gray-600">
//               {isDragActive
//                 ? 'ファイルをドロップしてください'
//                 : 'アップロードするファイルをドラッグ＆ドロップ'}
//             </p>
//             <button className="text-sm text-pink-400 hover:text-pink-500">
//               またはクリックしてファイルを選択
//             </button>
//           </div>
//         )}
//       </div>
//       {imageDescription && (
//         <div className="mt-4 p-4 bg-gray-50 rounded-md">
//           <h4 className="text-sm font-medium text-gray-700">画像分析結果:</h4>
//           <p className="text-sm text-gray-600 mt-1">{imageDescription}</p>
//         </div>
//       )}
//       {error && (
//         <pre className="mt-2 text-sm text-red-500 whitespace-pre-wrap">
//           {error}
//         </pre>
//       )}
//     </div>
//   );
// };
