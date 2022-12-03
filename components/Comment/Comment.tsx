import {
  collection,
  onSnapshot,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import Link from "next/link";

import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { db } from "../../config/firebase";
import { postComment } from "../../constant/action";
import useStore from "../../zustand";
import CommentItem from "./ComentItem";

interface Slug {
  slug: string | undefined;
}

export interface ListComment {
  id: string | undefined;
  userId: string;
  avatar: string;
  caption: string;
  userName: string;
  reactions: any[];
  slug: string | undefined;
  createAt?: {
    seconds: number;
  };
}

const Comment = ({ slug }: Slug) => {
  const { user } = useStore();
  const [listComment, setListComment] = useState<ListComment[]>([]);
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    const q = query(collection(db, "comments"), where("id", "==", slug));
    const unsub = onSnapshot(q, (snapshot) => {
      const res = snapshot.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setListComment(res);
    });

    return () => unsub();
  }, [slug]);

  const handlePostComment = async () => {
    try {
      if (!user) return;

      if (comment.trim() === "") return;

      const response = await postComment({
        id: slug,
        userId: user?.uid,
        userName: user?.displayName,
        avatar: user?.photoURL,
        caption: comment,
        reactions: [],
        createAt: Timestamp.now(),
      });

      setListComment([...listComment, response]);

      setComment("");
    } catch (err: any) {
      console.log(err.message);
    }
  };
  return (
    <>
      {user ? (
        <div className="flex items-center flex-1 lg:px-6 2xl:px-6 mb-6">
          <div className="">
            <LazyLoadImage
              effect="blur"
              className="w-10 h-10 rounded-full"
              src={user?.photoURL}
              alt={user?.displayName}
            />
          </div>
          <div className="relative pr-20 text-left flex-auto ">
            <input
              className="border-2 ml-2 border-slate-600 py-3 px-2 w-full"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder={"Viết bình luận công khai..."}
            />
            <button
              className="absolute top-0 py-2 h-12 px-3 right-0 ml-4 text-white font-semibold bg-red-500"
              onClick={handlePostComment}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <div className="error_comment">
          <h3 className="ml-2 text-lg lg:px-6">
            Bạn cần
            <Link href={`/signup`}>
              <span className="px-1 text-blue-600">đăng nhập</span>
            </Link>
            để bình luận
          </h3>
        </div>
      )}

      {listComment.length > 0 ? (
        listComment.map((item: ListComment) => (
          <CommentItem item={item} key={item.id} comments={listComment} />
        ))
      ) : (
        <p className="text-xl font-semibold text-center">
          Chưa có nhận xét nào!
        </p>
      )}
    </>
  );
};

export default Comment;
