import React, { useState, useEffect } from "react";

import { BsTrashFill } from "react-icons/bs";
import ComicItem from "../components/Comics/ComicItem";
import MainLayout from "../components/LayOut/MainLayout";
import { historyComic } from "../constant/history";
import { ComicFollow } from "../Interface/Interface";
import MetaTitle from "./title";
const History: React.FC = () => {
  const [history, setHistory] = useState<ComicFollow[]>([]);

  useEffect(() => {
    const comics = historyComic();
    setHistory(comics);
  }, []);

  const handleDeleteComic = () => {
    if (history.length === 0) return;
    if (window.confirm("Bạn có chắc chắn xóa toàn bộ lịch sử không?")) {
      localStorage.clear();
      setHistory([]);
    }
  };

  return (
    <>
      <MainLayout>
        <MetaTitle
          title="Comics App | Website đọc truyện tranh"
          description="Lịch sử"
          image="https://firebasestorage.googleapis.com/v0/b/nhattruyen-af981.appspot.com/o/Screenshot%202022-12-02%20094444.jpg?alt=media&token=adf77c98-b5fc-4b57-aa31-bf1530994db9"
        />
        <div className="min-h-screen pb-12">
          {history.length > 0 ? (
            <>
              <div className=" px-6 lg:px-20 2xl:px-36 mt-4">
                <button
                  onClick={handleDeleteComic}
                  className="text-2xl text-red-500"
                >
                  <BsTrashFill />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:px-20 2xl:px-40 2xl:grid-cols-6 py-2 px-6 gap-x-3 gap-y-3">
                {history &&
                  history.map((item: ComicFollow) => (
                    <ComicItem
                      key={item.id}
                      image={item.image}
                      slug={item.slug}
                      name={item.name}
                      className=""
                      url=""
                    />
                  ))}
              </div>
            </>
          ) : (
            <div className="text-center mt-8 ">
              <p className="text-2xl font-semibold">Lịch sử xem trống</p>
            </div>
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default History;
