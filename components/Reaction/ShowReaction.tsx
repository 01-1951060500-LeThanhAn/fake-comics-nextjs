import { FC, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { reactionImg } from "../../constant/emoji";

import ShowUserReaction from "./ShowUserReaction";

interface ShowReactionProps {
  reactions: any[];
}

const ShowReaction: FC<ShowReactionProps> = ({ reactions }) => {
  const [filter, setFilter] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  useEffect(() => {
    const arrayTmp: any[] = [];
    reactions.forEach((item) => {
      if (!arrayTmp.includes(item.name)) {
        arrayTmp.push(item.name);
      }
    });

    setFilter(arrayTmp);
  }, [reactions]);

  const renderEmoji = (name: string) => {
    if (name === "like") {
      return reactionImg.like;
    } else if (name === "love") {
      return reactionImg.love;
    } else if (name === "angry") {
      return reactionImg.angry;
    } else if (name === "care") {
      return reactionImg.care;
    } else if (name === "haha") {
      return reactionImg.haha;
    } else if (name === "sad") {
      return reactionImg.sad;
    } else if (name === "wow") {
      return reactionImg.wow;
    }
  };

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="absolute -bottom-1 right-0 flex items-center bg-slate-500 rounded-md p-1 text-white"
      >
        {filter.map((item) => (
          <div key={item} className="text-text-color flex items-center">
            <div className="w-4 h-4 mr-1">
              <LazyLoadImage effect="blur" src={renderEmoji(item)} alt={item} />
            </div>
          </div>
        ))}
        <span className="text-sm text-text-color">{reactions.length}</span>
      </div>

      {showModal && (
        <ShowUserReaction
          reactions={reactions}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export default ShowReaction;
