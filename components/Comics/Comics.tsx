import { useEffect, useState } from "react";
import useSWR from "swr";
import ComicItem from "./ComicItem";
import { InfoSlider, Type } from "../../Interface/Interface";
import { SwiperSlide, Swiper } from "swiper/react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import SkeletonLoading from "../Skeleton/SkeletonLoading";
import useStore from "../../zustand";
import { getHomeApi } from "../../service/home";

const Comics = ({ type, title, param }: Type) => {
  const { data, error } = useSWR(`${param}`, () => getHomeApi(`${type}`));
  const { loading, setLoading } = useStore();
  SwiperCore.use([Autoplay]);

  return (
    <>
      <div className="mt-6 w-7/8 px-3 2xl:px-36">
        <p className="mb-3 text-2xl font-semibold">{title}</p>
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          slidesPerView={6}
          spaceBetween={20}
          loop={true}
          breakpoints={{
            375: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            414: {
              slidesPerView: 2,
              spaceBetween: 10,
            },

            600: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            1536: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
          }}
        >
          {!loading ? (
            data &&
            data.map((slider: InfoSlider, i: any) => (
              <>
                <SwiperSlide>
                  {({ isActive }) => (
                    <ComicItem
                      key={slider.slug}
                      name={slider.name}
                      image={slider.image}
                      url={slider.url}
                      slug={slider.slug}
                      className={`${isActive ? "active" : ""}`}
                    />
                  )}
                </SwiperSlide>
              </>
            ))
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6 ">
                <SkeletonLoading />
                <SkeletonLoading />
                <SkeletonLoading />
                <SkeletonLoading />
                <SkeletonLoading />
                <SkeletonLoading />
                <SkeletonLoading />
              </div>
            </>
          )}
        </Swiper>
      </div>
    </>
  );
};

export default Comics;
