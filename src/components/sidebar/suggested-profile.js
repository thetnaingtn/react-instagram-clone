import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import {
  updateFollowedUserFollowers,
  updateLoggedInUserFollowing,
} from "../../services/firebase";

export default function SuggestedProfile({
  username,
  profileDocId,
  profileId,
  userId,
  loggedInUserDocId,
}) {
  const [followed, setFollowed] = useState(false);

  async function handleFollowUser() {
    setFollowed(true);
    await updateLoggedInUserFollowing(false, profileId, loggedInUserDocId);
    await updateFollowedUserFollowers(false, profileDocId, userId);
  }
  return !followed ? (
    <div className="flex flex-row items-center justify-between">
      <div className="flex items-center justify-between">
        <img
          src={`images/avatars/${username}.jpg`}
          className="rounded-full mr-3 w-8 flex"
          alt={`${username}`}
        />
        <Link to={`/p/${username}`}>
          <p className="text-sm font-bold">{username}</p>
        </Link>
      </div>
      <button
        className="text-blue-medium font-bold text-sm"
        type="button"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  username: PropTypes.string.isRequired,
  profileDocId: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired,
};
