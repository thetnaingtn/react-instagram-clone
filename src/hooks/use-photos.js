import { useState, useEffect, useContext } from "react";

import UserContext from "../context/user";
import { getPhotos, getUserByUserId } from "../services/firebase";
export default function usePhoto() {
  const [photos, setPhotos] = useState(null);
  const {
    user: { uid: userId = "" },
  } = useContext(UserContext);

  useEffect(() => {
    async function getTimelinePhotos() {
      let [user] = await getUserByUserId(userId);
      let followedUserPhotos = [];
      if (user?.following?.length) {
        followedUserPhotos = await getPhotos(userId, user.following);
      }
      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotos(followedUserPhotos);
    }

    getTimelinePhotos();
  }, [userId]);

  return { photos };
}
