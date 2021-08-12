import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { formatDistance } from "date-fns";

import AddComment from "./add-comment";

export default function Comments({
  commentInput,
  comments: allComments,
  docId,
  posted,
}) {
  const [commentSlice, setCommentSlice] = useState(3);
  const [comments, setComments] = useState(allComments);

  const showNextComment = () => setCommentSlice((sl) => sl + 3);
  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {comments.slice(0, commentSlice).map((cmt) => (
          <p key={`${cmt.comment}-${cmt.displayName}`} className="mb-1">
            <Link to={`/p/${cmt.displayName}`}>
              <span className="mr-1 font-bold">{cmt.displayName}</span>
            </Link>
            <span>{cmt.comment}</span>
          </p>
        ))}
        {comments.length >= 3 && commentSlice < comments.length && (
          <button
            onClick={showNextComment}
            onKeyDown={(e) => {
              if (e.key === "Enter") showNextComment();
            }}
            className="text-gray-base text-sm mb-1 cursor-pointer focus:border-none"
          >
            View more comments
          </button>
        )}
        <p className="text-gray-base text-xs mt-2 uppercase">
          {formatDistance(posted, new Date())} ago
        </p>
      </div>
      <AddComment
        comments={comments}
        setComments={setComments}
        docId={docId}
        commentInput={commentInput}
      />
    </>
  );
}

Comments.propTypes = {
  commentInput: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  docId: PropTypes.string.isRequired,
  posted: PropTypes.number.isRequired,
};
