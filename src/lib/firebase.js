import Firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase();

export { firebase, FieldValue };
