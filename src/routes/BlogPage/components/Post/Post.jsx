import PropTypes from "prop-types";
import { Fragment, useEffect, useRef, useState } from "react";
import { Buttons } from "../../../../components/Buttons";
import { FormGroup } from "../../../../components/FormGroup";
import renderStaticText from "../../../../locale";
import { usePostsContext } from "../../postsContext";
import { CommentForm } from "../CommentForm";
import { ImagesPreview } from "../ImagesPreview";

function Post(props) {
  const { postData } = props;
  const { deletePost, updatePost } = usePostsContext();

  const [isEditable, setIsEditable] = useState(false);
  const [post, setPost] = useState(postData);

  const uploadImageRef = useRef(null);

  useEffect(() => {
    if (postData) {
      setPost(postData);
      setIsEditable(false);
    }
  }, [postData]);

  const formGroup1 = [
    {
      inputType: "inputTextarea",
      name: "textContent",
      label: "",
      inputClassName: "textarea-noborder",
      labelClassName: "no-label",
      containerClassName: "textarea-container",
      autoResize: true,
      placeholder: "whats_up",
      rows: 15,
      cols: 30,
      value: post.textContent,
      handleChange: (value) => {
        let tempPost = { ...post, textContent: value };
        setPost(tempPost);
      },
    },
  ];

  return (
    <section className="post-wrapper">
      <div className="first-row">
        <h5 className="poster">{postData.poster}</h5>
        {postData.poster === "Actual User" && (
          <div className="ctrls">
            <Buttons
              buttontype="secondary"
              classNames="submit"
              type="button"
              onClick={(e) => {
                deletePost(postData.id);
              }}
            >
              <i className="pi pi-refresh" />
              <span>delete</span>
            </Buttons>
            <Buttons
              buttontype="primary"
              classNames="submit"
              type="button"
              onClick={() => {
                let tempIsEditable = isEditable;
                if (tempIsEditable) {
                  updatePost(postData.id, post);
                }
                !tempIsEditable && setIsEditable(!tempIsEditable);
              }}
            >
              <i className="pi pi-pencil" />
              <span>{isEditable ? "Submit Edit" : "Edit Blog"}</span>
            </Buttons>
          </div>
        )}
      </div>
      {isEditable ? (
        <FormGroup className={"group-container"} inputs={formGroup1} />
      ) : (
        <p className="post-content">{post.textContent}</p>
      )}
      {isEditable && (
        <Buttons
          buttontype={"secondary"}
          type="button"
          classNames="image-upload-btn"
          onClick={() => uploadImageRef.current.click()}
        >
          <input
            ref={uploadImageRef}
            type="file"
            style={{ display: "none" }}
            onChange={(e) => {
              let tempPost = { ...post };
              tempPost.images = [
                ...tempPost.images,
                URL.createObjectURL(e.target.files[0]),
              ];
              setPost(tempPost);
            }}
          />
          <i className="pi pi-image" />
        </Buttons>
      )}
      <ImagesPreview images={post.images} />

      <h6 className="comments">{renderStaticText("comments")}</h6>
      {post.comments?.length > 0 &&
        post.comments.map((comment, index) => {
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
