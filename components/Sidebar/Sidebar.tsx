import { useState, useEffect } from "react";
import { baseApi } from "../../constant/constant";
import { Genres } from "../../Interface/Interface";
import useStore from "../../zustand";
import SideBarskeleton from "./SidebarSkeleton";

interface Types {
  type: string;
  setType: (type: string) => void;
}

const Sidebar = ({ setType, type }: Types) => {
  const [genres, setGenres] = useState<Genres[]>([]);
  const { loading, setLoading } = useStore();
  useEffect(() => {
    const getResults = async () => {
      const response = await baseApi.get(`/truyen/the-loai`);
      setLoading(false);
      setGenres(response.data);
    };

    setLoading(true);
    getResults();
  }, [setLoading]);

  return (
    <>
      <div className="grid grid-cols-2 mt-2 px-0 gap-x-[8px] gap-y-[6px]">
        {!loading ? (
          genres.map((genre: Genres) => (
            <div key={genre.params} onClick={() => setType(genre.params)}>
              <button
                className={`${
                  type === genre.params ? "bg-slate-600 text-white" : ""
                } border-2 w-full py-2 `}
              >
                {genre.name}
              </button>
            </div>
          ))
        ) : (
          <>
            <div className="grid grid-cols-2 2xl:gap-x-[140px] lg:gap-x-24 2xl:gap-y-8 lg:gap-y-8">
              <SideBarskeleton />
              <SideBarskeleton />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Sidebar;
