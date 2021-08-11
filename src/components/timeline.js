import Skeleton from "react-loading-skeleton";

import usePhotos from "../hooks/use-photos";

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
      ) : (
        <div className="">{photos.username}</div>
      )}
    </div>
  );
}
