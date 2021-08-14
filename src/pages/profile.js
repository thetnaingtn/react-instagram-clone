import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { getUserByUsername } from "../services/firebase";
import * as ROUTES from "../constants/routes";

import Header from "../components/header";
import UserProfile from "../components/profile";

export default function Profile() {
  const { username } = useParams();
  const history = useHistory();
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async function () {
      let [user] = await getUserByUsername(username);
      if (user?.userId) {
        setUser(user);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    })();
  }, [username, history]);
  return user?.username ? (
    <div className="bg-gray-background">
      <Header />
      <div className="max-w-screen-lg mx-auto">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
}
