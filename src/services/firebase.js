//eslint-disable-next-line
import { firebase, FieldValue } from "../lib/firebase";

export function doesUserExist(username) {
  return firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get()
    .then((result) => result.docs.length);
}
