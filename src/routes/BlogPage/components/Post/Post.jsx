import { Galleria } from "primereact/galleria";
import PropTypes from "prop-types";
import renderStaticText from "../../../../locale";
import { CommentForm } from "../CommentForm";
import { ImagesPreview } from "../ImagesPreview";

function Post(props) {
  const { postData } = props;
  return (
    <section className="post-wrapper">
      <h5 className="poster">{postData.poster}</h5>
      <p className="post-content">{postData.textContent}</p>
      <ImagesPreview images={postData.images} />

      <h6 className="comments">{renderStaticText("comments")}</h6>
      {postData.comments?.length > 0 &&
        postData.comments.map((comment, index) => {
          return (
            <div className="comment-wrapper" key={index}>
              <h5 className="poster">{comment.user}</h5>
              <p className="post-content">{comment.textContent}</p>
            </div>
          );
        })}
      <CommentForm />
    </section>
  );
}

Post.propTypes = {
  postData: PropTypes.objectOf({
    id: PropTypes.string,
    poster: PropTypes.string,
    textContent: PropTypes.string,
    images: PropTypes.array,
    comments: PropTypes.arrayOf(
      PropTypes.objectOf({
        user: PropTypes.string,
        textContent: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default Post;
