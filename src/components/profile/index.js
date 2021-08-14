import { useEffect, useReducer } from "react";
import PropTypes from "prop-types";

import { getUserPhotosByUserId } from "../../services/firebase";

import Header from "./header";
import Photos from "./photos";

export default function Profile({ user }) {
  const initialState = {
    profile: {},
    photosCollection: [],
    followersCount: 0,
  };

  const reducer = (state, newState) => ({ ...state, ...newState });

  const [{ profile, photosCollection, followersCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    (async function () {
      let photos = await getUserPhotosByUserId(user);
      dispatch({
        profile: user,
        photosCollection: photos,
        followersCount: user.followers.length,
      });
    })();
  }, [user]);

  return (
    <>
      <Header
        followersCount={followersCount}
        photosCount={photosCollection?.length}
        setFollowersCount={dispatch}
        profile={profile}
      />
      <Photos photos={photosCollection} />
    </>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number,
    emailAddress: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
    fullName: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string,
  }),
};
