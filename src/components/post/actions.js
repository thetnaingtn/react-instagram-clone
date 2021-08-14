import PropTypes from "prop-types";
import { useState, useContext } from "react";

import UserContext from "../../context/user";
import FirebaseContext from "../../context/firebase";

import { HeartIcon, CommentIcon } from "../static/icon";

export default function Actions({
  docId,
  totalLikes,
  likedPhoto,
  handleInput,
}) {
  const [toggleLike, setToggleLike] = useState(likedPhoto);
  const [likes, setLikes] = useState(totalLikes);
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const {
    user: { uid: userId = "" },
  } = useContext(UserContext);

  async function handleToggleLike() {
    setToggleLike((isLike) => !isLike);
    await firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        likes: toggleLike
          ? FieldValue.arrayRemove(userId)
          : FieldValue.arrayUnion(userId),
      });

    setLikes((likes) => (toggleLike ? likes + 1 : likes - 1));
  }

  return (
    <>
      <div className="flex justify-between p-4">
        <div className="flex">
          <HeartIcon
            className={`w-8 mr-4 cursor-pointer ${
              toggleLike ? "fill-red text-red-primary" : "text-black-light"
            } select-none focus:outline-none`}
            handleToggleLike={handleToggleLike}
          />
          <CommentIcon
            fill="none"
            className="w-8 text-black-light select-none cursor-pointer focus:outline-none"
            handleInput={handleInput}
          />
        </div>
      </div>
      <div className="p-4 py-0">
        <p className="font-bold">
          {likes > 1 ? `${likes} likes` : `${likes} like`}
        </p>
      </div>
    </>
  );
}

Actions.propTypes = {
  docId: PropTypes.string.isRequired,
  totalLikes: PropTypes.number.isRequired,
  likedPhoto: PropTypes.bool.isRequired,
};
