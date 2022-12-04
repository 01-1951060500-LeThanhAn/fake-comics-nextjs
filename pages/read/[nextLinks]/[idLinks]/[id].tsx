import { Button } from "antd";

import { Modal } from "antd";

import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Spin } from "react-cssfx-loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import MainLayout from "../../../../components/LayOut/MainLayout";
import { baseApi } from "../../../../constant/constant";
import useWidthSize from "../../../../hooks/useWidthSize";
import { SelectChap, Size } from "../../../../Interface/Interface";
import useStore from "../../../../zustand";
import MetaTitle from "../../../title";

import "react-lazy-load-image-component/src/effects/blur.css";
import ImagesSkeleton from "../../../../components/Read/ImagesSkeleton";
import ChapterItem from "../../../../components/Read/ChapterItem";

const ReadChap = () => {
  const [images, setImages] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectChapter, setSelectChapter] = useState<SelectChap[]>([]);
  const { loading, setLoading } = useStore();
  const [searchChapter, setSearchChapter] = useState("");
  const router = useRouter();
  const { nextLinks, idLinks, id } = router.query;

  const size: Size = useWidthSize();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getImages = async () => {
      const response = await baseApi.get(
        `/comic/${nextLinks}/${idLinks}/${id}`
      );
      setImages(response.data[0].listImages);
      setSelectChapter(response.data[0].selectChapter);
    };
    getImages();
    setLoading(true);

    const timing = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timing);
  }, [nextLinks, idLinks, id, setLoading]);
  return (
    <>
      <MainLayout>
        <MetaTitle
          title="Comics App | Website đọc truyện tranh"
          description="Website được tạo bởi Nextjs"
          image="https://firebasestorage.googleapis.com/v0/b/nhattruyen-af981.appspot.com/o/Screenshot%202022-12-02%20094444.jpg?alt=media&token=adf77c98-b5fc-4b57-aa31-bf1530994db9"
        />
        <div className="relative">
          {size.width && size.width < 1024 && (
            <>
              {/* <div className="absolute top-6 ml-4 md:ml-8 left-0 z-20 right-0 w-11/12">
                <input
                  value={searchChapter}
                  onChange={(e) => setSearchChapter(e.target.value)}
                  type="text"
                  className="w-full py-2 px-2  border-2 border-slate-300"
                  placeholder="Tìm kiếm chap..."
                />
              </div>
              <div className="w-full pt-24 px-2 overflow-x-hidden overflow-y-scroll h-60 grid grid-cols-2 md:grid-cols-3">
                {!loading ? (
                  selectChapter
                    .filter((value) => {
                      if (searchChapter === "") {
                        return value;
                      } else {
                        return value.title
                          .toLowerCase()
                          .includes(searchChapter.toLowerCase());
                      }
                    })
                    .map((chapter: SelectChap, i: number) => (
                      <ChapterItem
                        chapter={chapter}
                        key={i}
                        nextLinks={nextLinks}
                      />
                    ))
                ) : (
                  <>
                    <ImagesSkeleton />
                    <ImagesSkeleton />
                    <ImagesSkeleton />
                    <ImagesSkeleton />
                    <ImagesSkeleton />
                    <ImagesSkeleton />
                    <ImagesSkeleton />
                    <ImagesSkeleton />
                    <ImagesSkeleton /> 
                    <ImagesSkeleton />
                  </>
                )}
              </div> */}
              <div className="text-center my-4">
                <Button onClick={showModal}>Xem các chương</Button>
              </div>
              <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className="ml-6">
                  <input
                    value={searchChapter}
                    onChange={(e) => setSearchChapter(e.target.value)}
                    type="text"
                    className="w-[250px] md:w-[350px] outline-none py-2 px-2 border-2 rounded-lg border-slate-300"
                    placeholder="Tìm kiếm chap..."
                  />
                </div>
                <div className="grid grid-cols-2">
                  {selectChapter
                    .filter((value) => {
                      if (searchChapter === "") {
                        return value;
                      } else {
                        return value.title
                          .toLowerCase()
                          .includes(searchChapter.toLowerCase());
                      }
                    })
                    .map((chapter: SelectChap, i: number) => (
                      <ChapterItem
                        chapter={chapter}
                        key={i}
                        idLinks={idLinks}
                      />
                    ))}
                </div>
              </Modal>
            </>
          )}

          <div className="flex justify-between relative h-screen lg:mx-auto">
            <div className="overflow-y-auto ml-8 text-center mt-14 xl:w-1/5 lg:w-1/3 hidden lg:block">
              <div className="absolute top-2 left-10 rounded-lg">
                <input
                  value={searchChapter}
                  onChange={(e) => setSearchChapter(e.target.value)}
                  type="text"
                  className="w-[290px] py-2 px-2 border-2 rounded-lg border-slate-300"
                  placeholder="Tìm kiếm chap..."
                />
              </div>
              {!loading ? (
                selectChapter
                  .filter((value) => {
                    if (searchChapter === "") {
                      return value;
                    } else {
                      return value.title
                        .toLowerCase()
                        .includes(searchChapter.toLowerCase());
                    }
                  })
                  .map((chapter: SelectChap, i: number) => (
                    <ChapterItem chapter={chapter} key={i} idLinks={idLinks} />
                  ))
              ) : (
                <>
                  <ImagesSkeleton />
                  <ImagesSkeleton />
                  <ImagesSkeleton />
                  <ImagesSkeleton />
                  <ImagesSkeleton />
                  <ImagesSkeleton />
                  <ImagesSkeleton />
                  <ImagesSkeleton />
                  <ImagesSkeleton />
                  <ImagesSkeleton />
                </>
              )}
            </div>

            {!loading ? (
              <div className=" mt-8 mx-auto w-full 2xl:w-3/5 xl:w-4/5 lg:w-3/4 overflow-y-auto px-3 md:px-12 lg:px-20 2xl:px-24">
                {images.map((item: string) => (
                  <div key={item}>
                    <LazyLoadImage
                      effect="blur"
                      className="mx-auto w-full py-0 z-10"
                      src={item}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="text-center mx-auto  mt-12">
                  <Spin width="70px" height="70px" />
                </div>
              </>
            )}
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default ReadChap;
