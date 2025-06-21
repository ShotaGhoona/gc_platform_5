// import { useState } from "react";
// import MainContentsDateRangeSelect from "./MainContentsDateRangeSelect";
// import WeeklyAnalysis from "../display/WeeklyAnalysis";
// import WeeklyFlow from "../display/WeeklyFlow";

// export default function DashboardMainContents() {
//   const [selectedViewIndex, setSelectedViewIndex] = useState(0);

//   return (
//     <div className="flex flex-col gap-6 w-full">
//       <MainContentsDateRangeSelect
//         selectedViewIndex={selectedViewIndex}
//         onChangeViewIndex={setSelectedViewIndex}
//       />
//       <div className="flex flex-col md:flex-row gap-6 w-full">
//         <div className="flex-1">
//           <WeeklyAnalysis selectedViewIndex={selectedViewIndex} />
//         </div>
//         <div className="flex-1">
//           <WeeklyFlow selectedViewIndex={selectedViewIndex} />
//         </div>
//       </div>
//     </div>
//   );
// }
