import { toast } from "react-toastify";
export const BASE_URL = "https://comics-basic.vercel.app";
export const copyLinktoClipboard = (text: string) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text);
      return toast.success("Copy liên kết thành công");
    }
  } catch (error) {
    return toast.error("Copy liên kết thất bại");
  }
};
