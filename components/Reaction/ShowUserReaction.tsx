import React from "react";
import { ReactionArr } from "../../Interface/Interface";
import ReactionItem from "./ReactionItem";

export interface UserReaction {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  reactions: ReactionArr[];
}

const ShowUserReaction: React.FC<UserReaction> = ({
  reactions,
  setShowModal,
}) => {
  console.log(reactions);
  return (
    <>
      <div className="fixed bg-[rgba(0,0,0,0.3)] top-0 right-0 left-0 bottom-0 z-10 max-w-full h-screen flex justify-center items-center">
        <div className="relative w-96 h-96 m-auto rounded-md bg-white">
          {reactions.map((reaction: ReactionArr) => (
            <ReactionItem
              setShowModal={setShowModal}
              reaction={reaction}
              key={reaction.name}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ShowUserReaction;
