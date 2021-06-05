import PropTypes from "prop-types";
import "./BlogPage.scss";
import { NewBlog } from "./NewBlog";

function BlogPage(props) {
  return (
    <div className="blog-page">
      <NewBlog />
    </div>
  );
}

BlogPage.propTypes = {};

export default BlogPage;
