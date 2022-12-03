import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { db } from "../../config/firebase";
import reactionGif from "../../constant/emoji";
import useStore from "../../zustand";

import { ListComment } from "../Comment/Comment";

interface Emoji {
  comment: ListComment;
}

interface Reaction {
  name: string;
  image: string;
}

const ReactionEmoji: React.FC<Emoji> = ({ comment }) => {
  const { user } = useStore();

  const handleReactionEmoji = (reaction: Reaction) => {
    if (!user) return;

    const reactionExist = comment.reactions.find(
      (item) => item.userId === user.uid
    );

    const ref = doc(db, `comments/${comment.id}`);

    if (!reactionExist) {
      const newReaction = [
        ...comment.reactions,
        {
          userId: user?.uid,
          userName: user?.displayName,
          avatar: user?.photoURL,
          name: reaction.name,
          img: reaction.image,
        },
      ];

      updateDoc(ref, { reactions: newReaction });
    } else {
      if (reactionExist.name === reaction.name) {
        const newReacttion = comment.reactions.filter(
          (item) => item?.userId !== reactionExist?.userId
        );

        updateDoc(ref, { reactions: newReacttion });
      } else {
        const newReaction = comment.reactions.map((item) => {
          if (item?.userId === user.uid) {
            return {
              userId: user?.uid,
              userName: user?.displayName,
              avatar: user?.photoURL,
              name: reaction.name,
              img: reaction.image,
            };
          }
          return item;
        });
        updateDoc(ref, { reactions: newReaction });
      }
    }
  };

  return (
    <div className="flex items-center justify-between p-2 rounded-full bg-primary-200">
      {reactionGif.map((item) => (
        <div
          className="w-8 h-8 mx-1"
          key={item.name}
          onClick={() => handleReactionEmoji(item)}
        >
          <LazyLoadImage
            effect="blur"
            className="emoji"
            src={item.image}
            alt={item.name}
          />
        </div>
      ))}
    </div>
  );
};

export default ReactionEmoji;
