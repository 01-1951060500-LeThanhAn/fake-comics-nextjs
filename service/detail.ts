import axios from "axios";
import { baseApi } from "../constant/constant";
import { DetailInfo } from "../Interface/Interface";

export const getDetailsApi = async (slug: string): Promise<DetailInfo> => {
  const res = await axios.get(`https://thanhan.vercel.app/truyentranh/${slug}`);
  return res.data[0].thumbnails;
};
