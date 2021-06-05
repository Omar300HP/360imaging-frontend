import PropTypes from "prop-types";
import renderStaticText from "../../../locale";
import "./NewBlog.scss";
import { NewBlogForm } from "../components";

function NewBlog(props) {
  return (
    <section className="new-blog">
      <NewBlogForm />
    </section>
  );
}

NewBlog.propTypes = {};

export default NewBlog;
