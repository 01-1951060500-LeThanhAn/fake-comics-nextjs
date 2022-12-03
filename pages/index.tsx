import Link from "next/link";
import BannerComics from "../components/Banner/BannerComics";
import Comics from "../components/Comics/Comics";
import MainLayout from "../components/LayOut/MainLayout";
import MetaTitle from "./title";

export default function Home() {
  return (
    <>
      <MainLayout>
        <MetaTitle
          title="Comics App | Website đọc truyện tranh"
          description="Website được tạo bởi Nextjs"
          image="https://firebasestorage.googleapis.com/v0/b/nhattruyen-af981.appspot.com/o/Screenshot%202022-12-02%20094444.jpg?alt=media&token=adf77c98-b5fc-4b57-aa31-bf1530994db9"
        />
        <BannerComics />
        <div className="pb-16">
          <Comics
            param="home"
            type="/truyentranh"
            title="Truyện mới cập nhật"
          />
          <Comics
            param="tuan"
            type="/truyen/category/top-tuan"
            title="Truyện full"
          />
          <Comics
            param="thang"
            type="/truyen/category/top-thang"
            title="Truyện mới nhất"
          />
          <Comics
            param="yeu"
            type="/truyentranh"
            title="Truyện yêu thích nhất"
          />

          <Comics
            param="hay"
            type="/truyentranh?page=12"
            title="Truyện hay nhất"
          />
          <Comics
            param="chapter"
            type="/truyen/category/top-chapter"
            title="Truyện con trai"
          />
          <Comics
            param="comment"
            type="/truyen/category/top-comment"
            title="Truyện con gái"
          />
        </div>

        <Link href="/filter">
          <div className="text-center pb-8">
            <button className="bg-orange-600 px-3 py-3 text-white font-semibold">
              Xem thêm nhiều truyện hơn
            </button>
          </div>
        </Link>
      </MainLayout>
    </>
  );
}
