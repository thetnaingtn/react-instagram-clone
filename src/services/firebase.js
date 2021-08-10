//eslint-disable-next-line
import { firebase } from "../lib/firebase";

export async function doesUserExist(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.length;
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
