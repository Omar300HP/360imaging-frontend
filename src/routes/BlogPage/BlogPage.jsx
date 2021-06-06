import PropTypes from "prop-types";
import "./BlogPage.scss";
import { NewBlog, PostsList } from "./components";

function BlogPage(props) {
  return (
    <div className="blog-page">
      <NewBlog />
      <PostsList />
    </div>
  );
}

BlogPage.propTypes = {};

export default BlogPage;
