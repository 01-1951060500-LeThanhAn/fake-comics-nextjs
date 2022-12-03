import React from "react";
import useSWR from "swr";
import { Swiper, SwiperSlide } from "swiper/react";
import { getBanner } from "../../service/home";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import "swiper/css";

import BannerItem from "./BannerItem";
import { Banner } from "../../Interface/Interface";
import BannerSkeleton from "./BannerSkeleton";
const BannerComics = () => {
  const { data, error } = useSWR("banner", getBanner);
  SwiperCore.use([Autoplay]);
  console.log(data);
  return (
    <>
      {data ? (
        <Swiper
          modules={[Navigation, Autoplay]}
          grabCursor={true}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: true }}
          navigation={false}
          loop={true}
        >
          {data &&
            data.map((item: Banner) => (
              <>
                <SwiperSlide>
                  <BannerItem key={item.id} item={item} />
                </SwiperSlide>
              </>
            ))}
        </Swiper>
      ) : (
        <BannerSkeleton />
      )}
    </>
  );
};

export default BannerComics;
