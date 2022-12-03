import React from "react";
import Skeleton from "react-loading-skeleton";

const SideBarskeleton = () => {
  return (
    <section>
      <div>
        {Array(10)
          .fill([])
          .map((i) => (
            <div
              key={i}
              className="z-10 rounded-none lg:w-[90px] 2xl:w-[130px] "
            >
              <Skeleton duration={2} height={50} />
            </div>
          ))}
      </div>
    </section>
  );
};

export default SideBarskeleton;
