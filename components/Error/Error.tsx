import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import MetaTitle from "../../pages/title";
import NotFound from "../storeActions/Notfound.jpg";
const Error = () => {
  return (
    <>
      <MetaTitle
        title="Comics App | Website đọc truyện tranh"
        description="Not Found"
        image="https://firebasestorage.googleapis.com/v0/b/nhattruyen-af981.appspot.com/o/Screenshot%202022-12-02%20094444.jpg?alt=media&token=adf77c98-b5fc-4b57-aa31-bf1530994db9"
      />
      <div className="h-screen">
        <LazyLoadImage
          effect="blur"
          src={`https://raw.githubusercontent.com/01-1951060500-LeThanhAn/baotangweb/master/src/storeActions/Notfound.jpg`}
          className=" mx-auto w-full lg:h-[500px] lg:object-cover 2xl:mt-8 2xl:h-[600px]"
          alt=""
        />
        <div className="w-[100px] mx-auto">
          <Link href="/">
            <p className=" bg-blue-600 text-white text-center px-2 py-1 cursor-pointer w-[150px]">
              Về trang chủ
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Error;
