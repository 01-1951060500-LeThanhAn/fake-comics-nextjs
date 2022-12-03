import Skeleton from "react-loading-skeleton";

const BannerSkeleton = () => {
  return (
    <div className="w-full -mt-1 lg:h-[450px] md:h-[350px] h-[250px] overflow-hidden">
      <Skeleton duration={2} height={450} width={"100%"} />
    </div>
  );
};

export default BannerSkeleton;
