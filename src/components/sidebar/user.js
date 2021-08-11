import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const User = ({ fullName, username }) =>
  !fullName || !username ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link
      to={`/p/${username}`}
      className="grid-cols-4 gap-4 grid mb-6 items-center"
    >
      <div className="flex items-center justify-between col-span-1">
        <img
          src={`/images/avatars/${username}.jpg`}
          alt={`${username}`}
          className="rounded-full w-16 flex mr-3"
        />
      </div>
      <div className="col-span-3">
        <p className="text-sm font-bold">{username}</p>
        <p className="text-sm">{fullName}</p>
      </div>
    </Link>
  );

User.propTypes = {
  fullName: PropTypes.string,
  username: PropTypes.string,
};

export default User;
