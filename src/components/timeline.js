import Skeleton from "react-loading-skeleton";

import usePhotos from "../hooks/use-photos";
import Post from "./post";

export default function Timeline() {
  const { photos } = usePhotos();
  return (
    <div className="container col-span-2">
      {!photos ? (
        <Skeleton
          count={4}
          width={640}
          height={500}
          className="mb-5"
        ></Skeleton>
      ) : photos?.length ? (
        photos.map((photo) => <Post key={photo.docId} content={photo} />)
      ) : (
        <p>Follow to see photos</p>
      )}
    </div>
  );
}
