import PropTypes from "prop-types";
import "./Buttons.scss";

function Buttons(props) {
  const { buttontype, classNames } = props;
  return (
    <button className={`button-360 ${buttontype} ${classNames}`} {...props}>
      {props.children}
    </button>
  );
}

Buttons.propTypes = {
  buttontype: PropTypes.oneOf(["primary", "secondary"]).isRequired,
  children: PropTypes.element.isRequired,
};

export default Buttons;
