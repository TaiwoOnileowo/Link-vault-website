
import React from "react";
import useInView from "@/hooks/useInView";
import { Features } from "@/types";
const MappedFeatures = ({
  data,
  isMore,
}: {
  data: Features[];
  isMore?: boolean;
}) => {
  const { sectionRef, visible } = useInView();
  return (
    <div
      className=" gap-14  w-full items-center flex  flex-wrap justify-center  px-16 pt-24"
      ref={sectionRef}
    >
      {data.map((feature, index) => (
        <div
          key={index}
          className={`relative flex flex-col ${
            !isMore && "items-center justify-center  h-[250px] "
          }  ${
            isMore && "h-[200px]"
          } rounded-3xl bg-primary-2 w-[350px] border-white border-[4px]  hover:border-slate-200 box-shadow p-6  cursor-pointer hover:scale-[1.05] transition-all ease-in-out duration-300 ${
            visible ? "popup-card" : "opacity-0"
          } `}
        >
          {!isMore && (
            <span
              className={`absolute -top-[50px] bg-primary-2   rounded-[15px] text-[50px] p-4  ${
                visible ? "icon-animation" : null
              } shadow-lg  border text-white`}
            >
              {feature.icon}
            </span>
          )}

          <h3 className={` md:text-2xl text-center font-bold text-white py-2`}>
            {feature.title}
          </h3>
          <p className="block text-base text-white text-center mt-2">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MappedFeatures;
