import Firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// import { seedDatabase } from "../seed";

const config = {
  apiKey: "AIzaSyBjhJQgJaTfdbnqv4kB0j7o55ktRw3HQq4",
  authDomain: "instagram-clone-34b9d.firebaseapp.com",
  projectId: "instagram-clone-34b9d",
  storageBucket: "instagram-clone-34b9d.appspot.com",
  messagingSenderId: "1039355220774",
  appId: "1:1039355220774:web:d19f93b8a9c5269c8d27e7",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// seedDatabase(firebase);

export { firebase, FieldValue };
