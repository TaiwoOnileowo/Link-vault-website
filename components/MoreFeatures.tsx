// import React from "react";
// import { more_features } from "../data";

// const MoreFeatures = ({ setShowMoreFeatures }) => {
//   return (
//     <>
//       <div
//         id="more-features"
//         className="grid gap-4 md:gap-y-16 md:gap-12 grid-cols-3 items-center justify-center px-16"
//       >
//         {more_features.map((feature, index) => (
//           <div
//             key={index}
//             className={`relative flex flex-col items-center  rounded-3xl bg-primary border-white border-[4px] box-shadow p-6  cursor-pointer hover:scale-[1.05] h-[200px] w-[350px] transition-all ease duration-300 hover:shadow-2xl shadow-xl 
//               popup-card `}
//           >
//             <h3
//               className={`text-xs xs:text-base ss:text-lg ts:text-xl md:text-2xl text-center font-bold text-white ss:mt-4 md:mt-10`}
//             >
//               {feature.title}
//             </h3>
//             <p className="hidden ts:block text-base text-white text-center mt-2">
//               {feature.description}
//             </p>
//           </div>
//         ))}
//       </div>
//       <a href="#features">
//         <button
//           className="text-black mt-16 border-[#0074FF] mx-auto button-hover2 px-12 py-4 w-[200px] border"
//           onClick={() => setShowMoreFeatures(false)}
//         >
//           Load Less
//         </button>
//       </a>
//     </>
//   );
// };

// export default MoreFeatures;
