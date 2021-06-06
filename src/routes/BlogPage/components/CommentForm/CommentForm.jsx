import { useEffect, useState } from "react";
import { Buttons } from "../../../../components/Buttons";
import { FormGroup } from "../../../../components/FormGroup";
import renderStaticText from "../../../../locale";
import { usePostsContext } from "../../postsContext";

function CommentForm(props) {
  const { post, editIndex, Initialcomment } = props;
  const { updatePost } = usePostsContext();

  const [comment, setComment] = useState("");

  useEffect(() => {
    if (editIndex || editIndex === 0) setComment(Initialcomment);
  }, [editIndex]);

  const formGroup1 = [
    {
      inputType: "inputTextarea",
      name: "comment",
      label: "",
      inputClassName: "textarea-noborder",
      labelClassName: "no-label",
      containerClassName: "textarea-container",
      autoResize: true,
      placeholder: "write_comment",
      rows: 1,
      cols: 30,
      value: comment,
      handleChange: (value) => {
        setComment(value);
      },
    },
  ];

  return (
    <form
      className={"comment-form"}
      onSubmit={(e) => {
        e.preventDefault();
        if (editIndex || editIndex === 0) {
          let tempComments = [...post.comments];
          tempComments[editIndex] = {
            user: "Actual User",
            textContent: comment,
          };
          console.log(tempComments);
          updatePost(post.id, {
            ...post,
            comments: tempComments,
          });
        } else {
          updatePost(post.id, {
            ...post,
            comments: post.comments?.length
              ? [
                  ...post.comments,
                  { user: "Actual User", textContent: comment },
                ]
              : [{ user: "Actual User", textContent: comment }],
          });
        }

        setComment(" ");
      }}
    >
      <FormGroup className={"group-container"} inputs={formGroup1} />
      <Buttons buttontype="primary" classNames="submit" type="submit">
        <i className="pi pi-pencil" />
        <span>{renderStaticText("comment")}</span>
      </Buttons>
    </form>
  );
}

export default CommentForm;
