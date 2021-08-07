import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import FirebaseContext from "../context/firebase";

export default function Login() {
  const history = useHistory();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  let invalid = !emailAddress || !password;

  function handleLogin() {}

  useEffect(() => {
    document.title = "Instagram - Login";
  }, []);

  return <h1>Login Page</h1>;
}
