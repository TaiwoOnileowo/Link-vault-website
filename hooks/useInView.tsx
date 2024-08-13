import React, { useEffect, useRef, useState } from "react";

const useInView = () => {
  const [visible, setVisible] = useState(false);

  const sectionRef = useRef(null);
  const activeSectionRef = sectionRef.current;
  useEffect(() => {
    const handleIntersection = (
      entries: IntersectionObserverEntry[] | undefined
    ) => {
      entries?.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    if (activeSectionRef) {
      observer.observe(activeSectionRef);
    }
    console.log(visible);
    return () => {
      if (activeSectionRef) {
        observer.unobserve(activeSectionRef);
      }
    };
  }, [activeSectionRef, visible]);

  return { visible, sectionRef };
};

export default useInView;
