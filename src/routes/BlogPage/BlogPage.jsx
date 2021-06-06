import PropTypes from "prop-types";
import "./BlogPage.scss";
import { NewBlog } from "./components";

function BlogPage(props) {
  return (
    <div className="blog-page">
      <NewBlog />
    </div>
  );
}

BlogPage.propTypes = {};

export default BlogPage;
