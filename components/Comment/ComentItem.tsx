import React from "react";
import { ListComment } from "./Comment";
import { formatRelative } from "date-fns";
import { deleteDoc, doc } from "firebase/firestore";

import { toast } from "react-toastify";
import Tippy from "@tippyjs/react/headless";
import useStore from "../../zustand";
import { db } from "../../config/firebase";
import ShowReaction from "../Reaction/ShowReaction";
import ReactionEmoji from "../Reaction/ReactionEmoji";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface Comment {
  item: ListComment;
  comments: ListComment[];
}
const formatDate = (date: any) => {
  let formattedDate = "";
  if (date) {
    // Convert the date in words relative to the current date
    formattedDate = formatRelative(new Date(date * 1000), new Date());
    // Uppercase the first letter
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
};
const CommentItem: React.FC<Comment> = ({ item }) => {
  const { user } = useStore();

  const handleDeleteComment = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bình luận này không!")) {
      const Ref = doc(db, `comments/${item.id}`);
      if (item.userId === user.uid) {
        try {
          await deleteDoc(Ref);
        } catch (err: any) {
          alert(err.message);
        }
        return toast.success("Xóa bình luận thành công");
      } else {
        return toast.error("Delete comment failed");
      }
    }
  };

  return (
    <>
      <div className="comments mt-6 px-6 mb-6">
        <div className="flex justify-start ">
          <div className="mt-2">
            <LazyLoadImage
              effect="blur"
              className="w-10 h-10 rounded-full object-cover"
              src={item?.avatar}
              alt=""
            />
          </div>
          <div>
            <div className=" cursor-pointer ml-3 relative bg-slate-300  px-3 py-3 w-auto rounded-xl">
              <div className="flex items-center justify-center">
                <p className="font-semibold text-md">{item.userName}</p>
                <p className="pl-2 text-slate-500">
                  {formatDate(item.createAt?.seconds)}
                </p>
              </div>
              <div>
                <p className="">{item.caption}</p>

                {item.reactions.length > 0 && (
                  <ShowReaction reactions={item.reactions} />
                )}
              </div>
            </div>
            <div className="ml-3">
              {user && (
                <>
                  <Tippy
                    interactive
                    placement="top-end"
                    render={(attr) => (
                      <ReactionEmoji comment={item} {...attr} />
                    )}
                  >
                    <button
                      className={`mr-3 text-text-color mt-1 text-md capitalize ${
                        item.reactions.find((item) => item?.userId === user.uid)
                          ?.name === "like"
                          ? "text-blue-500"
                          : item.reactions.find(
                              (item) => item?.userId === user.uid
                            )?.name === "love"
                          ? "text-pink-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {item.reactions.find((item) => item?.userId === user.uid)
                        ?.name || <span className="cursor-pointer">Thích</span>}
                    </button>
                  </Tippy>
                  <span className="ml-2 cursor-pointer">Phản hồi</span>
                  {item.userId === user?.uid ? (
                    <span
                      className="ml-2 cursor-pointer"
                      onClick={handleDeleteComment}
                    >
                      Xóa
                    </span>
                  ) : null}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentItem;
