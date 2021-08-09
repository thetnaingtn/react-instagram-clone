import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import * as ROUTES from "../constants/routes";
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";
import { HomeIcon, LogoutIcon } from "./static/icon";

export default function Header() {
  const history = useHistory();
  const { user: loggedInUser } = useContext(UserContext);
  const { firebase } = useContext(FirebaseContext);

  function handleSignout() {
    firebase.auth().signOut();
    history.push(ROUTES.LOGIN);
  }

  return (
    <header className="bg-white border-b border-gray-primary h-16 mb-8">
      <div className="container max-w-screen-lg mx-auto h-full">
        <div className="flex justify-between h-full">
          <div className="items-center flex cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link to={ROUTES.DASHBOARD} arial-label="Instagram">
                <img
                  src="/images/logo.png"
                  alt="Instagram logo"
                  className="w-6/12"
                />
              </Link>
            </h1>
          </div>
          <div className="text-gray-700 flex items-center text-center">
            {loggedInUser ? (
              <>
                <Link to={ROUTES.DASHBOARD} arial-label="Dashboard">
                  <HomeIcon />
                </Link>
                <button
                  title="Sign out"
                  onClick={handleSignout}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSignout();
                  }}
                >
                  <LogoutIcon />
                </button>
                {loggedInUser && (
                  <div className="flex items-center cursor-pointer">
                    <Link
                      to={`/p/${loggedInUser.displayName}`}
                      arial-label="User Profile"
                    >
                      <img
                        src={`/images/avatars/${loggedInUser.displayName}.jpg`}
                        alt="User avatar"
                        className="flex h-8 w-8 rounded-full"
                      />
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button className="text-white bg-blue-medium rounded text-sm w-20 h-8 font-bold">
                    Login
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button className="text-blue-medium w-20 h-8 font-bold text-sm rounded">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
