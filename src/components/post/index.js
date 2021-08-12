import { useRef } from "react";
import PropTypes from "prop-types";
import Actions from "./actions";
import Comments from "./comments";

import Footer from "./footer";
import Header from "./header";
import Image from "./image";

export default function Post({ content }) {
  const commentInput = useRef(null);
  const handleInput = () => commentInput.current.focus();
  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
      <Header username={content.username} />
      <Image
        src={content.imageSrc}
        caption={content.caption}
        username={content.username}
      />
      <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikePhoto}
        handleInput={handleInput}
      />
      <Footer username={content.username} caption={content.caption} />
      <Comments
        commentInput={commentInput}
        docId={content.docId}
        posted={content.dateCreated}
        comments={content.comments}
      />
    </div>
  );
}

Post.propTypes = {
  content: PropTypes.shape({
    username: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    userLikePhoto: PropTypes.bool.isRequired,
    likes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired,
  }),
};
