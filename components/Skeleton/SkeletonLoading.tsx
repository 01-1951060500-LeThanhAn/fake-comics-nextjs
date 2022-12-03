import Skeleton from "react-loading-skeleton";

const SkeletonLoading = () => {
  return (
    <section>
      <div>
        {Array(10)
          .fill([])
          .map((i) => (
            <div
              key={i}
              className="z-10 w-40 md:w-56  lg:w-48 mx-auto h-88 my-3"
            >
              <Skeleton duration={2} height={300} width={"100%"} />
            </div>
          ))}
      </div>
    </section>
  );
};

export default SkeletonLoading;
