import "./Sidebar.scss";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

function Sidebar(props) {
  const { isSideBarOpen } = props;
  return (
    <CSSTransition in={isSideBarOpen} timeout={600} classNames="side-collapse">
      <nav className={`sidebar ${isSideBarOpen ? "open" : ""}`}>
        <ul>
          <li>
            <a href="#">Menu Option 1</a>
          </li>
          <li>
            <a href="#">Menu Option 2</a>
          </li>
        </ul>
      </nav>
    </CSSTransition>
  );
}

Sidebar.prototype = { isSideBarOpen: PropTypes.bool };

export default Sidebar;
