import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { CommentIcon, HeartIcon } from "../static/icon";

export default function Photos({ photos }) {
  return (
    <div className="h-16 border-t border-gray-primary mt-12 pt-4">
      <div className="grid grid-cols-3 gap-8 mt-4 mb-12">
        {!photos
          ? Array(12)
              .fill(0)
              .map((_, i) => <Skeleton key={i} width={230} height={400} />)
          : photos.length
          ? photos.map((photo) => (
              <div key={photo.docId} className="relative group">
                <img src={photo.imageSrc} alt={photo.caption} />
                <div className="absolute bottom-0 left-0 top-0 right-0 bg-gray-200  justify-evenly items-center bg-black-faded group-hover:flex hidden">
                  <p className="flex items-center text-white font-bold">
                    <HeartIcon fill="currentColor" className="w-8 mr-4" />
                    {photo.likes.length}
                  </p>
                  <p className="flex items-center text-white font-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-8 mr-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {photo.comments.length}
                  </p>
                </div>
              </div>
            ))
          : null}
      </div>
      {!photos ||
        (photos.length === 0 && (
          <p className="text-center text-2xl">No Posts Yet</p>
        ))}
    </div>
  );
}

Photos.propTypes = {
  photos: PropTypes.array.isRequired,
};
