import Skeleton from "react-loading-skeleton";

const ImagesSkeleton = () => {
  return (
    <div className="w-full px-2 my-4 lg:h-[44px] md:h-[44px] h-[44px] overflow-hidden">
      <Skeleton duration={2} height={450} width={"100%"} />
    </div>
  );
};

export default ImagesSkeleton;
