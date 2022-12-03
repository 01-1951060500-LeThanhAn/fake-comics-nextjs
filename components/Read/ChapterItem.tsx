import Link from "next/link";
import React from "react";

import { SelectChap } from "../../Interface/Interface";

interface ItemChapter {
  chapter: SelectChap;
  idLinks: any;
}

const ChapterItem: React.FC<ItemChapter> = ({ chapter, idLinks }) => {
  console.log(chapter, idLinks);
  return (
    <>
      <Link
        href={`/read/${chapter.newHref}/${chapter.nextHref}/${chapter.idHref}`}
      >
        <div className="flex flex-col px-3">
          <div
            className={`${
              idLinks === chapter.nextHref
                ? "bg-red-400 text-white rounded-lg "
                : "bg-white border-2 rounded-lg  border-slate-300 text-black"
            } m-3  `}
          >
            <p className="text-center my-auto py-2 cursor-pointer">
              {chapter.title}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ChapterItem;
