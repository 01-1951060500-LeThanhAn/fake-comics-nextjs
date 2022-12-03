import { useEffect, useState } from "react";

import { genresComics } from "../service/home";
import { Category } from "../Interface/Interface";
import SelectItem from "../components/Filter/SelectItem";
import SelectCategory from "../components/Filter/SelectCategory";
import SelectComplete from "../components/Filter/SelectComplete";
import MainFitler from "../components/Filter/MainFitler";
import MainLayout from "../components/LayOut/MainLayout";
import MetaTitle from "./title";

const FilterComic = () => {
  const [genres, setGenres] = useState<Category[]>(genresComics.slice(0, 4));
  const [category, setCategory] = useState<Category[]>(
    genresComics.slice(4, 9)
  );
  const [complete, setComplete] = useState<Category[]>(genresComics.slice(9));
  const [filters, setFilters] = useState<{
    page: number;
    type: string;
  }>({
    page: 1,
    type: "top-truyen-moi",
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setGenres(genres);
    setCategory(category);
    setComplete(complete);
  }, [filters.page, filters.type, genres, category, complete]);

  const handlePageChange = (pageNumber: number) => {
    setFilters({ ...filters, page: Number(pageNumber) });
  };

  const setTypes = (value: string) => {
    setFilters({ ...filters, type: value });
  };

  return (
    <>
      <MainLayout>
        <MetaTitle
          title="Comics App | Website đọc truyện tranh"
          description="Website được tạo bởi Nextjs"
          image="https://firebasestorage.googleapis.com/v0/b/nhattruyen-af981.appspot.com/o/Screenshot%202022-12-02%20094444.jpg?alt=media&token=adf77c98-b5fc-4b57-aa31-bf1530994db9"
        />
        <div className="min-h-screen ">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:px-24 2xl:px-36 gap-x-2 px-4">
            <SelectItem
              genres={genres}
              selected={filters.type}
              setSelected={setTypes}
            />

            <SelectCategory
              category={category}
              selected={filters.type}
              setSelected={setTypes}
            />
            <SelectComplete
              complete={complete}
              selected={filters.type}
              setSelected={setTypes}
            />
          </div>

          <MainFitler filters={filters} handlePageChange={handlePageChange} />
        </div>
      </MainLayout>
    </>
  );
};

export default FilterComic;
