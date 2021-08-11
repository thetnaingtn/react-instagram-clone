import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";

import { getSuggestedProfiles } from "../../services/firebase";

import SuggestedProfile from "./suggested-profile";

export default function Suggestions({ userId, following, loggedInUserDocId }) {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    async function suggestedProfiles() {
      let profiles = await getSuggestedProfiles(userId, following);
      setProfiles(profiles);
    }

    if (userId) {
      suggestedProfiles();
    }
  }, [userId, following]);

  return !profiles ? (
    <Skeleton count={1} height={150} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div className="flex flex-col rounded">
      <div className="text-sm flex items-center justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestion for you</p>
      </div>
      <div className="mt-4 grid gap-5 ">
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.docId}
            username={profile.username}
            profileDocId={profile.docId}
            profileId={profile.userId}
            userId={userId}
            loggedInUserDocId={loggedInUserDocId}
          />
        ))}
      </div>
    </div>
  ) : null;
}

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  loggedInUserDocId: PropTypes.string,
};
