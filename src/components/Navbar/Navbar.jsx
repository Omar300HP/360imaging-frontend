import "./Navbar.scss";
import PropTypes from "prop-types";

import projectLogo from "../../assets/png/360Imaging_logo.png";

function Navbar(props) {
  const { toggleSidebar } = props;
  return (
    <header className="navbar">
      <img src={projectLogo} alt="" className="logo" />
      <i className="pi pi-bars" onClick={toggleSidebar} />
    </header>
  );
}

Navbar.propTypes = { toggleSidebar: PropTypes.func };

export default Navbar;
