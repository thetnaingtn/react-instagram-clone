//eslint-disable-next-line
import { useEffect, useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
//eslint-disable-next-line
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";

export default function Login() {
  //eslint-disable-next-line
  const history = useHistory();
  //eslint-disable-next-line
  const [error, setError] = useState(null);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  let isInvalid = !emailAddress || !password;

  function handleLogin() {}

  useEffect(() => {
    document.title = "Instagram - Login";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="iPhone with Instagram app"
        />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center border border-gray-primary rounded bg-white p-4 mb-4">
          <h1 className="flex justify-center">
            <img
              src="images/logo.png"
              alt="Logo"
              className="mt-2 mb-4 w-6/12"
            />
          </h1>
          {/* form */}
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
          <form onSubmit={handleLogin} method="POST">
            <input
              type="text"
              value={emailAddress}
              onChange={({ target: { value } }) => setEmailAddress(value)}
              aria-label="Enter your email address"
              className="w-full text-sm text-gray-base border border-gray-primary rounded h-2 py-5 px-4 mr-3 mb-4"
              placeholder="Enter email address"
            />
            <input
              type="password"
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
              aria-label="Enter your password"
              className="w-full px-4 py-5 mb-4 mr-3 text-sm h-2 text-gray-base border border-gray-primary rounded"
              placeholder="Enter password"
            />
            <button
              disabled={isInvalid}
              className={`bg-blue-medium text-white rounded h-8 font-bold w-full ${
                isInvalid && "opacity-50"
              }`}
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            Don't have an account?{` `}
            <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
