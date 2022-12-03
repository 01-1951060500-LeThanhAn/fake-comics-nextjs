import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Spin } from "react-cssfx-loading";
import { Chapter, DetailInfo, DetailItem } from "../../Interface/Interface";

import useStore from "../../zustand";
import { baseApi } from "../../constant/constant";
import InfoDetail from "../../components/InfoDetail/InfoDetail";
import MainLayout from "../../components/LayOut/MainLayout";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { getDetailsApi } from "../../service/detail";
import axios from "axios";

// interface Details {
//   data: DetailInfo[];
//   slug: string;
// }
const Detail = ({
  data,
  slug,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  // const slug = router.query?.slug as string;
  // console.log(slug);
  // const [infos, setInfos] = useState<DetailInfo[]>([]);
  // const { loading, setLoading } = useStore();
  // const [chapters, setChapters] = useState<Chapter[]>([]);

  // useEffect(() => {
  //   try {
  //     const fetchComicsDetails = async () => {
  //       fetch(`https://thanhan.vercel.app/truyentranh/${slug}`)
  //         .then((res) => res.json())
  //         .then((data) => {
  //           setInfos(data[0].thumbnails);
  //           setChapters(data[0].listChapters);
  //           setLoading(false);
  //         });
  //     };

  //     setLoading(true);
  //     fetchComicsDetails();
  //   } catch (error: any) {
  //     console.log(error.message);
  //   }
  // }, [setLoading, slug]);
  return (
    <>
      <MainLayout>
        {!data ? (
          <div className="m-auto h-screen flex justify-center items-center">
            <Spin width="80px" height="80px" />
          </div>
        ) : (
          <div className="w-full m-auto">
            {data[0].thumbnails.map((info: any) => (
              <>
                <InfoDetail
                  chapters={data[0].listChapters}
                  info={info}
                  slug={slug}
                />
              </>
            ))}
          </div>
        )}
      </MainLayout>
    </>
  );
};

export default Detail;

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  try {
    const slug = context.params?.slug as string;
    const res = await fetch(`https://thanhan.vercel.app/truyentranh/${slug}`);
    const data: DetailInfo[] = await res.json();

    return {
      props: {
        data: data,
        slug: slug,
      },
    };
  } catch (error: any) {
    console.log(error.message);
  }
};
