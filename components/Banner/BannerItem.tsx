import Link from "next/link";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { Banner } from "../../Interface/Interface";

interface BannerItems {
  item: Banner;
}

const BannerItem: React.FC<BannerItems> = ({ item }) => {
  return (
    <>
      <div className="relative">
        <div
          className="w-full lg:h-[450px] md:h-[350px] h-[250px] overflow-hidden blur"
          style={{
            backgroundImage: `url(${item.image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="absolute top-0 2xl:px-24 bottom-0 right-0 left-5 2xl:left-14 flex justify-between items-center">
          <div className="text-white lg:w-[70%] w-full">
            <div className="mb-4">
              <h1 className="text-2xl font-semibold text-white line-clamp-1">
                {item.name}
              </h1>
              <Link href={`detail/${item.slug}`}>
                {" "}
                <button className="bg-blue-600 text-white px-6 py-3 cursor-pointer rounded-sm">
                  ĐỌC NGAY
                </button>
              </Link>
            </div>
          </div>
          <div className="flex-1 hidden items-center justify-center lg:flex">
            <div className="w-[250px]">
              <LazyLoadImage
                width="100%"
                height="100%"
                src={item.image}
                alt={item.name}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerItem;
