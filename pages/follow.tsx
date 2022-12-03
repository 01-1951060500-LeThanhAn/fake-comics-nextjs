import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import "react-lazy-load-image-component/src/effects/blur.css";
import Link from "next/link";
import React, { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { toast } from "react-toastify";
import MainLayout from "../components/LayOut/MainLayout";
import { db } from "../config/firebase";
import { ComicFollow } from "../Interface/Interface";
import useStore from "../zustand";
import MetaTitle from "./title";

const Following: React.FC = () => {
  const { following, setFollow } = useStore();

  const { user } = useStore();
  useEffect(() => {
    const q = query(
      collection(db, "favouriteComics"),
      orderBy("createAt", "desc")
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      setFollow(
        querySnapshot.docs.map((doc: any) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });

    return () => unsub();
  }, [following, setFollow]);

  const handleRemoveFollow = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn bỏ theo dõi truyện này!")) {
      try {
        const Ref = doc(db, "favouriteComics", id);
        await deleteDoc(Ref);
        toast.success("Đã hủy theo dõi truyện này");
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <MainLayout>
        <MetaTitle
          title="Comics App | Website đọc truyện tranh"
          description="Theo dõi"
          image="https://firebasestorage.googleapis.com/v0/b/nhattruyen-af981.appspot.com/o/Screenshot%202022-12-02%20094444.jpg?alt=media&token=adf77c98-b5fc-4b57-aa31-bf1530994db9"
        />
        <div className="min-h-screen pb-12">
          {user ? (
            <>
              {following.length > 0 ? (
                <div className=" mt-8 2xl:px-36 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:px-24 2xl:grid-cols-6 py-2 px-6 gap-x-6 gap-y-7">
                  {following.map(
                    (item: ComicFollow) =>
                      item.uid === user?.uid && (
                        <div className="relative" key={item.slug}>
                          <Link href={`/detail/${item.slug}`}>
                            <div className="bg-slate-200 h-80 lg:w-48">
                              <div className="  h-64 w-auto">
                                <LazyLoadImage
                                  className="h-64 w-full object-cover"
                                  src={item.image}
                                  width="100%"
                                  effect="blur"
                                />
                              </div>
                              <div className="mt-4">
                                <p>{item.name.slice(0, 20)}...</p>
                              </div>
                            </div>
                          </Link>

                          <div className="bg-teal-600 mt-3 px-3 py-2 max-w-max">
                            <button
                              className="text-white"
                              onClick={() => handleRemoveFollow(item.id)}
                            >
                              Bỏ theo dõi
                            </button>
                          </div>
                        </div>
                      )
                  )}
                </div>
              ) : (
                <div className="text-2xl font-semibold text-center mt-4">
                  Bạn chưa theo dõi truyện nào!
                </div>
              )}
            </>
          ) : (
            <div className="flex justify-center items-center ">
              <span className="mt-4 text-2xl font-semibold">
                Bạn cần <Link href="/signup">đăng nhập</Link> để xem truyện đã
                theo dõi
              </span>
            </div>
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default Following;
