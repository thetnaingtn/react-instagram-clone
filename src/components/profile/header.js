import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";

import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";
import useUser from "../../hooks/use-user";
import UserContext from "../../context/user";

export default function Header({
  followersCount,
  photosCount,
  setFollowersCount,
  profile: {
    username: profileUsername,
    userId: profileUserId,
    docId: profileUserDocId,
    fullName,
    followers,
    following,
  },
}) {
  //   const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser();

  const [isUserFollowing, setIsUserFollowing] = useState(null);
  const activeBtnFollow = user?.username !== profileUsername;
  useEffect(() => {
    const isLoggedUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      setIsUserFollowing(!!isFollowing);
    };
    if (user?.username && profileUserId) {
      isLoggedUserFollowingProfile();
    }
  }, [user.username, profileUserId]);
  async function handleUserFollowing() {
    await toggleFollow(
      isUserFollowing,
      user.docId,
      user.userId,
      profileUserId,
      profileUserDocId
    );
    setFollowersCount({
      followersCount: isUserFollowing ? followersCount + 1 : followersCount - 1,
    });
    setIsUserFollowing(!isUserFollowing);
  }
  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="flex container justify-center items-center">
        {profileUserId ? (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img
            className="rounded-full w-40 h-40 flex"
            src={`/images/avatars/${profileUsername}.jpg`}
            alt={`${profileUsername} picture`}
          />
        ) : (
          <Skeleton circle height={150} width={150} count={1} />
        )}
      </div>
      <div className="flex container col-span-2 items-center flex-col justify-center">
        <div className="flex container items-center">
          <p className="text-2xl mr-4">{profileUsername}</p>
          {isUserFollowing === null ? (
            <Skeleton count={1} width={80} height={32} />
          ) : (
            activeBtnFollow && (
              <button
                type="button"
                onClick={handleUserFollowing}
                onKeyDown={(event) => {
                  if (event.Key === "Enter") handleUserFollowing();
                }}
                className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
              >
                {!isUserFollowing ? "Follow" : "Unfollow"}
              </button>
            )
          )}
        </div>
        <div className="flex container mt-4">
          {followers && following ? (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount} photos</span>
              </p>
              <p className="mr-10">
                <span className="font-bold">
                  {followersCount}{" "}
                  {followersCount > 1 ? "followers" : "follower"}
                </span>
              </p>
              <p className="mr-10">
                <span className="font-bold">{following.length} following</span>
              </p>
            </>
          ) : (
            <Skeleton count={1} width={677} height={24} />
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {fullName ? fullName : <Skeleton height={24} count={1} />}
          </p>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  followersCount: PropTypes.number.isRequired,
  photosCount: PropTypes.number.isRequired,
  setFollowersCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    dateCreated: PropTypes.number,
    emailAddress: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
    fullName: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string,
  }),
};
