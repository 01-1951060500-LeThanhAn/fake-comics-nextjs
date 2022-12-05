import React, { useState, useEffect, useId } from "react";
import {
  Chapter,
  DetailInfo,
  DetailItem,
  Size,
} from "../../Interface/Interface";
import {
  AiOutlineEye,
  AiOutlineUser,
  AiOutlineLike,
  AiFillHeart,
  AiFillTags,
  AiOutlineLink,
} from "react-icons/ai";

import { IoMdStar } from "react-icons/io";
import { MdStarRate } from "react-icons/md";
import { FaRegComments } from "react-icons/fa";
import { AiTwotoneFileText } from "react-icons/ai";
import { toast } from "react-toastify";
import { addDoc, collection, Timestamp } from "firebase/firestore";
// import { addComicHistory } from "../../storeActions/history";
// import Helmet from "../../Helmet/Helmet";
// import TippySocial from "../Tippy/TippySocial";
import "tippy.js/dist/tippy.css";
// import { BASE_URL, copyLinktoClipboard } from "../../storeActions/constant";

import Link from "next/link";
import { db } from "../../config/firebase";
import useWidthSize from "../../hooks/useWidthSize";
import useStore from "../../zustand";
import { addComicsHistory } from "../../constant/history";
import TippySocial from "../Tippy/TippySocial";
import { FacebookIcon } from "react-share";
import FacebookShareButton from "react-share/lib/FacebookShareButton";
import TwitterShareButton from "react-share/lib/TwitterShareButton";
import TwitterIcon from "react-share/lib/TwitterIcon";
import { BASE_URL, copyLinktoClipboard } from "../../constant/copy";
import Comment from "../Comment/Comment";

import "react-lazy-load-image-component/src/effects/blur.css";
import MetaTitle from "../../pages/title";
import { LazyLoadImage } from "react-lazy-load-image-component";
interface Infos {
  info: DetailItem;
  slug: any;
  chapters: Chapter[];
}

const InfoDetail: React.FC<Infos> = ({ info, slug, chapters }) => {
  const { following, addFollow } = useStore();
  const { user } = useStore();
  const size: Size = useWidthSize();
  const [loading, setLoading] = useState(false);
  const [searchChapter, setSearchChapter] = useState<string>("");
  const handleFollowComic = (comic: any) => {
    if (!user) return toast.error("Please LogIn");

    if (following.some((item) => item.slug === slug)) {
      return toast.warn("Bạn đã theo dõi truyện này rồi!");
    }

    const newFollowing = {
      uid: user?.uid,
      ...comic,
    };

    addDoc(collection(db, "favouriteComics"), newFollowing);

    addFollow(newFollowing);
    return toast.success("Bạn đã theo dõi truyện này ");
  };

  useEffect(() => {
    setLoading(following.some((item) => item.slug === `${slug}`));
  }, [following, slug]);
  useEffect(() => {
    if (slug) {
      addComicsHistory({
        name: info.name,
        image: info.images,
        id: info.status,
        slug: slug,
        uid: user?.uid,
      });
    }
  }, [info, user, slug]);

  return (
    <>
      <MetaTitle
        title={info.name}
        description={info.description}
        image={info?.images}
      />
      <div className=" mt-8 2xl:px-32 px-3" key={slug}>
        <p className="text-3xl text-center font-bold">{info.name}</p>
        <div className="flex flex-col lg:flex-row lg:justify-start mx-auto mt-4 lg:px-8">
          <div className="lg:mr-16 mx-auto 2xl:ml-0">
            <LazyLoadImage
              effect="blur"
              className="w-56 h-74 object-cover"
              src={info.images}
              alt={info.name}
            />
          </div>
          <div className="mt-3 xl:mt-0 2xl:mt-0">
            <div className="pb-4  mt-3 flex items-center">
              <TippySocial title="Facebook">
                <FacebookShareButton
                  url={`https://comics-basic.vercel.app/detail/${slug}`}
                  hashtag={"#hashtag"}
                  className="mr-3"
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
              </TippySocial>
              <TippySocial title="Twitter">
                <TwitterShareButton
                  title={"test"}
                  url={`https://comics-basic.vercel.app/detail/${slug}`}
                  hashtags={["hashtag1", "hashtag2"]}
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
              </TippySocial>

              <TippySocial title="Copy link">
                <div
                  onClick={() =>
                    copyLinktoClipboard(`${BASE_URL}/detail/${slug}`)
                  }
                  className="ml-4 text-xl bg-slate-600 rounded-full p-1 text-white cursor-pointer"
                >
                  <AiOutlineLink />
                </div>
              </TippySocial>
            </div>
            <div className="">
              <button
                onClick={() =>
                  handleFollowComic({
                    name: info.name,
                    image: info.images,
                    slug: slug,
                    createAt: Timestamp.now(),
                  })
                }
                className={`${
                  loading ? "bg-yellow-600" : "bg-blue-600"
                } text-white px-6 py-2 -mt-8 font-semibold cursor-pointer rounded-md`}
              >
                {loading ? "Đã theo dõi" : "Theo dõi"}
              </button>

              <Link
                href={`/read/${chapters[1].nextLinks}/${chapters[1].idLinks}/${chapters[1].id}`}
              >
                <button className="text-white ml-2 px-6 py-2 -mt-8 font-semibold cursor-pointer rounded-md bg-red-600">
                  Chap mới nhất
                </button>
              </Link>
              <Link
                href={`/read/${chapters[chapters.length - 1].nextLinks}/${
                  chapters[chapters.length - 1].idLinks
                }/${chapters[chapters.length - 1].id}`}
              >
                <button className="text-white ml-2 px-6 py-2 mt-4 font-semibold cursor-pointer rounded-md bg-green-600">
                  Đọc từ đầu
                </button>
              </Link>
            </div>

            <p className="my-2 flex items-center">
              <div className="flex items-center">
                <div className="text-orange-500 text-[15px] pr-1">
                  <AiOutlineEye />
                </div>
                <span className="font-bold text-[15px]">Lượt xem:</span>
              </div>
              <span className="ml-3 text-[15px] ">{info.views}</span>
            </p>
            <p className="text-[15px] my-2 flex items-center">
              <div className="flex items-center">
                <div className="text-blue-500 text-[15px] pr-1">
                  <AiOutlineUser />
                </div>
                <span className="font-bold">Tác giả:</span>
              </div>
              <span className="ml-3 text-[15px] ">{info.author}</span>
            </p>

            <p className="text-[15px] my-2 flex items-center ">
              <div className="flex items-center">
                <div className="text-yellow-200 text-[15px] pr-1">
                  <IoMdStar />
                </div>
                <span className="font-bold">Xếp hạng:</span>
              </div>
              <span className="ml-3 text-[15px] ">
                <span className="flex items-center justify-center">
                  4 / 5
                  <span className="pl-2 text-yellow-400 text-2xl">
                    <MdStarRate />
                  </span>
                </span>
              </span>
            </p>

            <p className="text-[15px] my-2 flex items-center">
              <div className="flex items-center">
                <div className="text-pink-500 text-[15px] pr-1">
                  <AiFillHeart />
                </div>
                <span className="font-bold">Lượt follow:</span>
              </div>
              <span className="ml-3 text-[15px] ">{info.follow}</span>
            </p>

            <div className="flex items-center">
              <div className="flex items-center">
                <div className="text-red-500 text-md pr-1">
                  <AiFillTags />
                </div>
                <span className="font-bold text-md">Thể loại:</span>
              </div>
              <div className="flex items-center flex-wrap flex-1">
                {info.actions.map((action) => (
                  <>
                    <button className="bg-blue-500 mx-2 mt-2 px-2 py-2 text-white rounded-md">
                      {action.category}
                    </button>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 lg:px-8">
          <p className="inline-flex items-center font-semibold text-xl">
            <span className="text-blue-600 mr-1">
              <AiTwotoneFileText />
            </span>{" "}
            Nội dung
          </p>
          <p className="font-semibold">{info.description}</p>
        </div>

        <p className="ml-2 text-xl mb-3 font-semibold 2xl:px-6 lg:px-6">
          Danh sách các chương
        </p>
        <div className="mb-2 px-2 lg:px-8 2xl:px-8">
          <input
            value={searchChapter}
            onChange={(e) => setSearchChapter(e.target.value)}
            type="text"
            className="w-full py-2 px-2 border-2 border-slate-300"
            placeholder="Tìm kiếm chap..."
          />
        </div>
        <p className="ml-2 items-center overflow-y-scroll overflow-x-hidden h-60 font-semibold 2xl:px-6 lg:px-6">
          {chapters
            .filter((value) => {
              if (searchChapter === "") {
                return value;
              } else {
                return value.title
                  .toLowerCase()
                  .includes(searchChapter.toLowerCase());
              }
            })
            .map((chapter: Chapter) => (
              <>
                <Link
                  className="text-black font-semibold"
                  href={`/read/${chapter.nextLinks}/${chapter.idLinks}/${chapter.id}`}
                >
                  <div
                    key={chapter.id}
                    className="flex justify-between items-center"
                  >
                    <p className="text-[15px] my-2 cursor-pointer">
                      {chapter.title}
                    </p>
                    <p className="text-[15px] cursor-pointer">
                      {info.name.length > 15 && size.width && size.width < 600
                        ? info.name.substring(0, 14)
                        : info.name}
                    </p>
                    <p className="text-[15px] text-slate-400 cursor-pointer">
                      {chapter.debut}
                    </p>
                  </div>
                </Link>
              </>
            ))}
        </p>

        <p className="inline-flex ml-2 mb-3 mt-6 items-center font-semibold text-xl 2xl:px-6 lg:px-6">
          <span className="text-blue-600 mr-1">
            <FaRegComments />
          </span>{" "}
          Bình luận
        </p>

        <Comment slug={slug} />
      </div>
    </>
  );
};

export default InfoDetail;
