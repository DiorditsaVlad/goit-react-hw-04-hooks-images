import s from "./Button.module.css";
import PropTypes from "prop-types";

export default function Button({ onClick }) {
  return (
    <button type="button" className={s.Button} onClick={onClick}>
      Load more
    </button>
  );
}
Button.propTypes = {
  onClick: PropTypes.func,
};
