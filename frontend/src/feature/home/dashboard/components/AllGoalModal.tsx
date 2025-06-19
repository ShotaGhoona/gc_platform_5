// import { useUser } from "@clerk/nextjs";
// import { useAllMonthlyGoals } from "../hooks/useAllMonthlyGoals";
// import { useState } from "react";

// type LocalFB = { [goalId: number]: string };

// export const AllGoalModal = () => {
//   const { user } = useUser();
//   const userId = user?.id;
//   const { goals, isLoading, error, editGoal, addGoal, refetch } = useAllMonthlyGoals(userId);

//   // FBのローカル編集状態
//   const [localFB, setLocalFB] = useState<LocalFB>({});
//   const [adding, setAdding] = useState(false);
//   const [newGoalText, setNewGoalText] = useState("");
//   const [newGoalMonth, setNewGoalMonth] = useState(() => {
//     const now = new Date();
//     return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
//   });

//   // 年月ごとにグループ化
//   const grouped = goals.reduce((acc: { [month: string]: typeof goals }, g) => {
//     const ym = g.monthly_start_date.slice(0, 7);
//     if (!acc[ym]) acc[ym] = [];
//     acc[ym].push(g);
//     return acc;
//   }, {});

//   // 直近12ヶ月分のYYYY-MM-01リスト
//   const getMonthOptions = () => {
//     const arr: string[] = [];
//     const now = new Date();
//     for (let i = 0; i < 12; i++) {
//       const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
//       arr.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`);
//     }
//     return arr;
//   };
//   const monthOptions = getMonthOptions();

//   // FB保存
//   const handleSaveFB = async (goal: typeof goals[number]) => {
//     await editGoal(goal.id, goal.goal_text, goal.is_public, goal.monthly_start_date, localFB[goal.id] ?? goal.fb ?? "");
//     setLocalFB((prev) => ({ ...prev, [goal.id]: "" }));
//     refetch();
//   };

//   // 目標追加
//   const handleAddGoal = async () => {
//     if (!newGoalText.trim()) return;
//     await addGoal(newGoalText, true, newGoalMonth);
//     setNewGoalText("");
//     setAdding(false);
//     refetch();
//   };

//   return (
//     <div className="flex flex-col justify-between gap-3 h-full">
//       <div className="w-full border border-white rounded-lg p-5 flex flex-col">
//         <p className="text-sm text-gray-400">将来の夢・ビジョン</p>
//         <p className="
//           flex-1 text-xl font-bold text-center flex items-center justify-center
//           text-transparent bg-clip-text bg-gradient-to-r from-[#5F7392] to-[#BF6375]
//         ">AIの民主化によって世界を、生活を、1段階進化させる</p>
//       </div>
//       <div className="flex-1 overflow-y-auto bg-white rounded-lg p-2">
//         {isLoading && <div>読み込み中...</div>}
//         {error && <div className="text-red-500">{error}</div>}
//         {Object.keys(grouped).sort((a, b) => b.localeCompare(a)).map((ym) => (
//           <div key={ym}>
//             <p className="text-base text-gray-400 text-end">{ym.replace("-", "/")}</p>
//             {grouped[ym].map((goal) => (
//               <div key={goal.id} className="min-h-[100px] p-3">
//                 <p className="border-b border-gray-200 p-2">{goal.goal_text}</p>
//                 <div className="flex gap-2 items-center mt-2">
//                   <input
//                     type="text"
//                     className="w-full p-2 border rounded"
//                     placeholder="FBを記入"
//                     value={localFB[goal.id] ?? goal.fb ?? ""}
//                     onChange={e => setLocalFB(prev => ({ ...prev, [goal.id]: e.target.value }))}
//                   />
//                   <button
//                     className="px-3 py-1 bg-[#5F7392] text-white rounded"
//                     onClick={() => handleSaveFB(goal)}
//                   >
//                     保存
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//       <div className="p-2">
//         {adding ? (
//           <div className="flex flex-col gap-2">
//             <input
//               type="text"
//               className="w-full p-2 border rounded"
//               placeholder="新しい目標を入力"
//               value={newGoalText}
//               onChange={e => setNewGoalText(e.target.value)}
//             />
//             <select
//               className="w-full p-2 border rounded"
//               value={newGoalMonth}
//               onChange={e => setNewGoalMonth(e.target.value)}
//             >
//               {monthOptions.map(date => (
//                 <option key={date} value={date}>
//                   {date.slice(0, 7).replace("-", "年")}月
//                 </option>
//               ))}
//             </select>
//             <button
//               className="px-3 py-1 bg-[#5F7392] text-white rounded"
//               onClick={handleAddGoal}
//             >
//               追加
//             </button>
//             <button
//               className="px-3 py-1 bg-gray-300 text-gray-700 rounded"
//               onClick={() => setAdding(false)}
//             >
//               キャンセル
//             </button>
//           </div>
//         ) : (
//           <button
//             className="w-full px-3 py-2 bg-[#5F7392] text-white rounded"
//             onClick={() => setAdding(true)}
//           >
//             目標を追加
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };
