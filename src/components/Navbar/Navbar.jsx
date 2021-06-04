import "./Navbar.scss";
import PropTypes from "prop-types";

import projectLogo from "../../assets/png/360Imaging_logo.png";

function Navbar(props) {
  return (
    <div className="navbar">
      <img src={projectLogo} alt="" className="logo" />
      <i className="pi pi-bars" />
    </div>
  );
}

Navbar.propTypes = {};

export default Navbar;
