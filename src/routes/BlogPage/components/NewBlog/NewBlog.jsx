import PropTypes from "prop-types";
import { NewBlogForm } from "../NewBlogForm";

function NewBlog(props) {
  return (
    <section className="new-blog">
      <NewBlogForm />
    </section>
  );
}

NewBlog.propTypes = {};

export default NewBlog;
