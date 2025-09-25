import React, { useEffect, useRef, useState } from "react";

import { creators } from "@/helpers/Data";
import Bars from "./Bars";

const CreatorList = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const profileRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // 50% visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = Number(entry.target.dataset.index);
        if (entry.isIntersecting) {
          setActiveIndex(index);
        }
      });
    }, observerOptions);

    profileRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (profileRefs.current) {
        profileRefs.current.forEach((ref) => {
          if (ref) observer.unobserve(ref);
        });
      }
    };
  }, []);

  const handleBarClick = (index) => {
    const target = profileRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      const yOffset = -170; // Adjust this offset based on header height or padding
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  return (
    <>
      <Bars activeIndex={activeIndex} onBarClick={handleBarClick} />
      <div className="creator_list_wrapper">
        <div className="container">
          <div className="row">
            {creators.map((creator, index) => (
              <div
                key={creator.id}
                data-index={index}
                ref={(el) => (profileRefs.current[index] = el)}
                className="profile-container"
              >
                <div className="profile-image">
                  <img
                    src={creator.image || "default.jpg"} // fallback if no image yet
                    alt={creator.name}
                  />
                </div>
                <div className="profile-content">
                  <h1>{creator.name}</h1>
                  <h2>@{creator.realName}</h2>
                  <p>{creator.desc}</p>
                  <p className="trivia">
                    <strong>TRIVIA:</strong> {creator.trivia}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatorList;
