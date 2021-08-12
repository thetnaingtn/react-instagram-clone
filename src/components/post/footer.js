import PropTypes from "prop-types";

export default function Footer({ username, caption }) {
  return (
    <div className="p-4 pt-2 pb-1">
      <p className="font-bold mr-1">{username}</p>
      <p className="italic">{caption}</p>
    </div>
  );
}

Footer.propTypes = {
  username: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};
