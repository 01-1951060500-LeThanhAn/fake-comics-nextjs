import React from "react";
import { ReactionArr } from "../../Interface/Interface";
import { AiOutlineClose } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
interface ItemReact {
  reaction: ReactionArr;

  setShowModal: (showModal: boolean) => void;
}

const ReactionItem: React.FC<ItemReact> = ({ reaction, setShowModal }) => {
  return (
    <>
      <div className=" px-3 py-2 flex justify-between items-center mt-6">
        <div className="flex items-center">
          <LazyLoadImage
            effect="blur"
            className="w-14 rounded-full h-14"
            src={reaction.avatar}
            alt={reaction.userName}
          />
          <p className="pl-2 font-semibold mt-3">{reaction.userName}</p>
        </div>

        <div className="">
          <LazyLoadImage
            effect="blur"
            className="w-8 h-8"
            src={`https://raw.githubusercontent.com/napthedev/fireverse/master/public/reactions/${reaction.name}.gif`}
            alt={reaction.name}
          />
        </div>
      </div>

      <div
        onClick={() => setShowModal(false)}
        className="absolute top-2 right-2 text-xl cursor-pointer"
      >
        <AiOutlineClose />
      </div>
    </>
  );
};

export default ReactionItem;
