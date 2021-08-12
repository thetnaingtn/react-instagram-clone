import PropTypes from "prop-types";

export default function Image({ username, caption, src }) {
  return <img src={src} alt={`${caption}`} />;
}

Image.propTypes = {
  caption: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};
