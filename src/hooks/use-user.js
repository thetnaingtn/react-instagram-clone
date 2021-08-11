import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getUserByUserId } from "../services/firebase";

export default function useUser() {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getUserObjectByUserId() {
      const [authUser] = await getUserByUserId(user.uid);
      setActiveUser(authUser || {});
    }

    if (user?.uid) {
      getUserObjectByUserId();
    }
  }, [user]);
  return { user: activeUser };
}
