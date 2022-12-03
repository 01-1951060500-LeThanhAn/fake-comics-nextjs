import { toast } from "react-toastify";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

export const postComment = async (newComment: any) => {
  try {
    const res = await addDoc(collection(db, "comments"), newComment);
    return {
      ...newComment,
      id: res.id,
    };
  } catch (err: any) {
    return toast.error(err.message);
  }
};
export const fetchComment = async (id: string | undefined) => {
  try {
    const q = query(collection(db, "comments"), where("id", "==", id));
    const querySnapshot = getDocs(q);
    const listComment: any[] = [];
    (await querySnapshot).forEach((doc: any) => {
      listComment.push({
        ...doc.data(),
        id: doc.id,
      });

      return listComment;
    });
  } catch (error: any) {
    return toast.error(error.message);
  }
};
