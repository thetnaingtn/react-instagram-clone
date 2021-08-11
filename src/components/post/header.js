import PropTypes from "prop-types";
import { Link } from "react-router-dom";
export default function Header({ username }) {
  return (
    <div className="flex border-gray-primary border-b h-4 px-4 py-8">
      <div className="flex items-center">
        <Link className="flex items-center" to={`/p/${username}`}>
          <img
            src={`/images/avatars/${username}.jpg`}
            alt={`${username} profile`}
            className="flex rounded-full w-8 h-8 mr-3"
          />
          <p className="font-bold">{username}</p>
        </Link>
      </div>
    </div>
  );
}

Header.propTypes = {
  username: PropTypes.string,
};
