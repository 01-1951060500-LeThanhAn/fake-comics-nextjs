import { ChangeEvent, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

import { InfoSlider } from "../Interface/Interface";
import ComicItem from "../components/Comics/ComicItem";
import Paginations from "../components/Pagination/Paginations";
import SkeletonLoading from "../components/Skeleton/SkeletonLoading";

import useStore from "../zustand";

import MainLayout from "../components/LayOut/MainLayout";
import MetaTitle from "./title";

const Search = () => {
  const [sliders, setSliders] = useState<any[]>([]);
  const { loading, setLoading } = useStore();
  const [searchItems, setSearchItems] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [countPages, setCountPages] = useState<any>();

  const fetchSlider = async () => {
    fetch(`https://thanhan.vercel.app/search/${searchItems}?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setSliders(data[0].thumbnails);

        setCountPages(100);

        setLoading(false);
      });
  };

  useEffect(() => {
    try {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      fetchSlider();
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      console.log(err.message);
    }
  }, [page, setLoading]);

  return (
    <>
      <MainLayout>
        <MetaTitle
          title="Comics App | Website đọc truyện tranh"
          description="Tìm kiếm"
          image="https://firebasestorage.googleapis.com/v0/b/nhattruyen-af981.appspot.com/o/Screenshot%202022-12-02%20094444.jpg?alt=media&token=adf77c98-b5fc-4b57-aa31-bf1530994db9"
        />
        <div className=" text-center pb-4 min-h-screen">
          <div className="w-full flex items-center px-4 lg:px-24 2xl:px-36">
            <div className="w-11/12">
              <input
                className="w-full  my-8 border-2 outline-none px-2 inline-block py-2"
                type="text"
                placeholder="Enter Comic"
                value={searchItems}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearchItems(e.target.value)
                }
              />
            </div>
            <div
              onClick={fetchSlider}
              className="bg-slate-800 w-1/12 py-[6px] cursor-pointer"
            >
              <button className="text-white text-xl md:text-2xl">
                <AiOutlineSearch />
              </button>
            </div>
          </div>

          <div className="mt-6 w-full mb-6 grid grid-cols-2 px-6 gap-x-4 gap-y-4 md:grid-cols-3 lg:grid-cols-4 lg:px-24 2xl:grid-cols-6 2xl:px-36">
            {!loading ? (
              sliders.map((slider: InfoSlider) => (
                <ComicItem
                  key={slider.slug}
                  name={slider.name}
                  image={slider?.image}
                  url={slider.url}
                  slug={slider.slug}
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

          <div className="pagination mb-12 mt-8">
            <Paginations
              setPage={setPage}
              page={page}
              countPages={countPages}
            />
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Search;
