import { useContext, useState } from "react";
import PropTypes from "prop-types";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";

export default function AddComment({
  comments,
  setComments,
  docId,
  commentInput,
}) {
  const {
    user: { displayName },
  } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const { firebase, FieldValue } = useContext(FirebaseContext);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    setComments([...comments, { comment, displayName }]);
    setComment("");
    firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment }),
      });
  };

  const handleFormSubmit = (e) => {
    comment.length >= 1 ? handleSubmitComment(e) : e.preventDefault();
  };

  return (
    <div className="border-t border-gray-primary">
      <form
        onSubmit={handleFormSubmit}
        method="POST"
        className="flex justify-between pl-0 pr-5"
      >
        <input
          className="text-sm text-gray-base w-full py-5 px-4 mr-3"
          arial-label="Enter a comment"
          autoComplete="off"
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
          placeholder="Add a comment..."
        />
        <button
          type="submit"
          className={`text-sm font-bold text-blue-medium ${
            !comment && "opacity-25"
          }`}
          disabled={comment.length < 1}
        >
          Post
        </button>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object.isRequired,
  docId: PropTypes.string.isRequired,
};
