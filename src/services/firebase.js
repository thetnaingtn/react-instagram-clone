import { FieldValue, firebase } from "../lib/firebase";

export async function doesUserExist(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.length;
}

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
}

export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();

  const user = result.docs.map((user) => ({
    ...user.data(),
    docId: user.id,
  }));

  return user;
}

export async function getSuggestedProfiles(userId, following) {
  let query = firebase.firestore().collection("users");

  /*
    **solve this later!!!!**
    if (following.length) {
      console.log("here");
      query.where("userId", "not-in", [...following, userId]);
    } else {
      query.where("userId", "!=", userId);
    }
  */

  const profiles = await query.limit(10).get();
  return profiles.docs
    .map((profile) => ({
      ...profile.data(),
      docId: profile.id,
    }))
    .filter((profile) => {
      if (following.length)
        return ![...following, userId].includes(profile.userId);
      return profile.userId !== userId;
    });
}

export async function updateLoggedInUserFollowing(
  isFollowingProfile,
  profileId,
  loggedInUserDocId
) {
  firebase
    .firestore()
    .collection("users")
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
}

export async function updateFollowedUserFollowers(
  isFollowingProfile,
  profileDocId,
  userId
) {
  firebase
    .firestore()
    .collection("users")
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(userId)
        : FieldValue.arrayUnion(userId),
    });
}

export async function getPhotos(userId, following) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following)
    .get();

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  const photoWithUserDetail = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikePhoto = false;
      if (photo.likes.includes(userId)) userLikePhoto = true;
      let [user] = await getUserByUserId(photo.userId);
      let { username } = user;
      return { username, ...photo, userLikePhoto };
    })
  );

  return photoWithUserDetail;
}

export async function getUserPhotosByUserId(user) {
  let result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", user.userId)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
}

export async function isUserFollowingProfile(
  loggedInUserUsername,
  profileUserId
) {
  let result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", loggedInUserUsername)
    .where("following", "array-contains", profileUserId)
    .get();

  let [response = {}] = result.docs.map((item) => ({
    ...item.data(),
  }));

  return response.userId;
}

export async function toggleFollow(
  isFollowing,
  loggedInUserDocId,
  loggedInUserId,
  profileUserId,
  profileDocId
) {
  console.log(
    isFollowing,
    loggedInUserDocId,
    loggedInUserId,
    profileUserId,
    profileDocId
  );
  await updateLoggedInUserFollowing(
    isFollowing,
    profileUserId,
    loggedInUserDocId
  );
  await updateFollowedUserFollowers(isFollowing, profileDocId, loggedInUserId);
}
