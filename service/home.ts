import { baseApi } from "../constant/constant";
import { InfoSlider } from "../Interface/Interface";

export const getBanner = async () => {
  const res = await baseApi.get("/truyentranh");
  return res.data[0].thumbnails.slice(0, 50);
};

export const getHomeApi = async (type: string): Promise<InfoSlider[]> => {
  const response = baseApi.get(`${type}`);
  return (await response).data[0].thumbnails;
};

export const genresComics = [
  {
    title: "Truyện top ngày",
    type: "top-ngay",
  },
  {
    title: "Truyện top tuần",
    type: "top-tuan",
  },
  {
    title: "Truyện top tháng",
    type: "top-thang",
  },
  {
    title: "Truyện All",
    type: "top-all",
  },
  {
    title: "Truyện Full",
    type: "top-comment",
  },
  {
    title: "Truyện yêu thích",
    type: "top-follow",
  },
  {
    title: "Truyện Mới",
    type: "top-truyen-moi",
  },
  {
    title: "Truyện mới cập nhật",
    type: "top-update",
  },
  {
    title: "Truyện nhiều chap nhất",
    type: "top-chapter",
  },
  {
    title: "Truyện đang hoàn thành",
    type: "completing",
  },
  {
    title: "Truyện đã hoàn thành",
    type: "completed",
  },
];
