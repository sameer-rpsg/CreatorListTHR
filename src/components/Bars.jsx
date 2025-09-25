// import React from "react";
// import { creators } from "@/helpers/Data";
// const Bars = ({activeIndex,onBarClick}) => {
//      const bars = Array.from({ length: creators.length });


//   return (
//       <div className="bars-wrapper">
//       {bars.map((_, i) => {
//          const isTall = i % 4 === 0;
//         const isActive = i <= activeIndex;
//         return (
       
//          <div
//             key={i}
//             className={`bar-wrapper ${isTall ? "tall" : "short"}`}
//             onClick={() => onBarClick(i)}
            
//           >
//             <div
//               className={`bar ${isActive ? "active" : ""}`}
//              style={{
//               height: isTall ? "70px" : "40px",
//               backgroundColor: isActive ? "#fff" : "red",
//               transition: "background-color 0.3s ease",
//               cursor: "pointer"
//             }}
//             ></div>
//             <div className="bar-label">{i + 1}</div>
//           </div>

//         );
//       })}
//     </div>
//   );
// };

// export default Bars;

import React from "react";
import { creators } from "@/helpers/Data";

const Bars = ({ activeIndex, onBarClick }) => {
  const bars = Array.from({ length: creators.length });

  return (
    <div className="bars-wrapper">
      {bars.map((_, i) => {
        const isTall = i % 4 === 0;
        const isActive = i <= activeIndex;
        const isLabelVisible = i === activeIndex; // Only show label for current active index

        return (
          <div
            key={i}
            className={`bar-wrapper ${isTall ? "tall" : "short"}`}
            onClick={() => onBarClick(i)}
          >
            <div
              className={`bar ${isActive ? "active" : ""}`}
              style={{
                height: isTall ? "70px" : "40px",
                backgroundColor: isActive ? "#fff" : "red",
                transition: "background-color 0.3s ease",
                cursor: "pointer",
              }}
            ></div>

            {/* Only active index has visible label */}
            <div
              className="bar-label"
              style={{
                opacity: isLabelVisible ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            >
              {i + 1}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Bars;
