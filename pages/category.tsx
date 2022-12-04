import React, { useEffect, useState } from "react";
import { Genres, InfoSlider, Size } from "../Interface/Interface";
import ComicItem from "../components/Comics/ComicItem";
import Pagination from "../components/Pagination/Paginations";
import SkeletonLoading from "../components/Skeleton/SkeletonLoading";

import { SwiperSlide, Swiper } from "swiper/react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import "swiper/css";
import useWidthSize from "../hooks/useWidthSize";
import Sidebar from "../components/Sidebar/Sidebar";
import { baseApi } from "../constant/constant";
import MainLayout from "../components/LayOut/MainLayout";

const Category: React.FC = () => {
  const [genres, setGenres] = useState<Genres[]>([]);
  const [page, setPage] = useState<number>(1);
  const [countPages, setCountPages] = useState<any>();
  const [category, setCategory] = useState<InfoSlider[]>([]);
  const [type, setType] = useState<string>("action");
  const [loading, setLoading] = useState<boolean>(false);

  const size: Size = useWidthSize();

  SwiperCore.use([Autoplay]);

  useEffect(() => {
    const getResults = async () => {
      const response = await baseApi.get(`/truyen/the-loai`);
      setGenres(response.data);
      setLoading(false);
    };
    setLoading(true);
    getResults();
  }, [type, page]);

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
    const getComics = async () => {
      const response = await baseApi.get(
        `/truyen/the-loai/${type}?page=${page}`
      );

      setCategory(response.data[0].thumbnails);
      setCountPages(2600);
    };
    getComics();
  }, [page, type]);

  return (
    <>
      <MainLayout>
        <div className="text-center pb-4 h-auto">
          {size.width && size.width < 1024 && (
            <>
              <div className="mt-12 px-6 ">
                <Swiper
                  modules={[Navigation, Autoplay]}
                  grabCursor={true}
                  spaceBetween={0}
                  slidesPerView={10}
                  autoplay={{ delay: 2000 }}
                  navigation={false}
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
                      slidesPerView: 4,
                      spaceBetween: 10,
                    },
                    1024: {
                      slidesPerView: 5,
                      spaceBetween: 10,
                    },
                    1536: {
                      slidesPerView: 10,
                      spaceBetween: 10,
                    },
                  }}
                >
                  {genres.map((result: Genres) => (
                    <>
                      <SwiperSlide>
                        {({ isActive }) => (
                          <div>
                            <button
                              className={`${
                                type === result.params
                                  ? "bg-slate-600 text-white"
                                  : ""
                              } border-2 w-full py-2 `}
                              onClick={() => setType(result.params)}
                            >
                              {result.name}
                            </button>
                          </div>
                        )}
                      </SwiperSlide>
                    </>
                  ))}
                </Swiper>
              </div>

              <div className="container w-full px-2 mt-12">
                <div className="grid grid-cols-2 px-4 gap-x-4 gap-y-4 md:grid-cols-3 md:px-6 lg:px-0 lg:grid-cols-5 2xl:px-36 2xl:grid-cols-6 ">
                  {!loading ? (
                    category.map((data) => (
                      <ComicItem
                        key={data.slug}
                        name={data.name}
                        image={data.image}
                        url={data.url}
                        slug={data.slug}
                      />
                    ))
                  ) : (
                    <>
                      <SkeletonLoading />
                      <SkeletonLoading />
                      <SkeletonLoading />
                      <SkeletonLoading />
                      <SkeletonLoading />
                      <SkeletonLoading />
                    </>
                  )}
                </div>
                <div className="pagination my-8">
                  <Pagination
                    setPage={setPage}
                    page={page}
                    countPages={countPages}
                  />
                </div>
              </div>
            </>
          )}

          {size.width && size.width >= 1024 && (
            <div className="flex flex-1 flex-wrap 2xl:px-36 lg:px-12">
              <div className=" w-9/12 px-2 mt-6">
                <p className="text-2xl font-semibold">
                  Truyện thể loại: {type}
                </p>
                <div className="grid grid-cols-2 2xl:mt-6 px-4 gap-x-4 gap-y-4 md:grid-cols-3 md:px-6 lg:grid-cols-3 lg:px-8 2xl:px-12 2xl:grid-cols-4">
                  {!loading ? (
                    category.map((data) => (
                      <ComicItem
                        key={data.slug}
                        name={data.name}
                        image={data.image}
                        url={data.url}
                        slug={data.slug}
                      />
                    ))
                  ) : (
                    <>
                      <SkeletonLoading />
                      <SkeletonLoading />
                      <SkeletonLoading />
                      <SkeletonLoading />
                      <SkeletonLoading />
                      <SkeletonLoading />
                    </>
                  )}
                </div>
                <div className="pagination my-8">
                  <Pagination
                    setPage={setPage}
                    page={page}
                    countPages={countPages}
                  />
                </div>
              </div>
              <div className=" w-3/12 mt-8 2xl:grid-cols-8 px-4">
                <p className="py-2 bg-slate-700 text-white">
                  <span>Thể Loại</span>
                </p>
                <Sidebar type={type} setType={setType} />
              </div>
            </div>
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default Category;
