import { useEffect } from "react";
import { FormGroup } from "../../../../components/FormGroup";
import useAatroxForm from "../../../../custom-hooks/useAatroxForm";
import renderStaticText from "../../../../locale";
import { usePostsContext } from "../../postsContext";
import { FormCtrls } from "../FormCtrls";
import { ImageUpload } from "../ImageUpload";
import { FormContext } from "./formContext";
import { POST_FORM, POST_FORM_VALIDATION } from "./POST_FORM";

function NewBlogForm(props) {
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
    },
  ];

  const { addNewPost } = usePostsContext();

  const newPost = useAatroxForm({
    form_schema: POST_FORM,
    validate_fn: POST_FORM_VALIDATION,
    api_path: "post_new_blog",
    show_toast_success: false,
  });

  useEffect(() => {
    newPost.dispatch({ type: "CREATE_NEW" });
  }, []);

  return (
    <FormContext.Provider value={{ formHandler: newPost }}>
      <form
        className={"newblog"}
        onSubmit={(e) => {
          e.preventDefault();
          const tempValues = { ...newPost.objectValues };
          addNewPost({
            ...tempValues,
            id: Date.now(),
            poster: "Actual User",
          });
          newPost.handleSubmit(e);
          newPost.resetForm();
        }}
      >
        <h3>{renderStaticText("create_blog")}</h3>
        <FormGroup
          className={"group-container"}
          inputs={formGroup1}
          formHandler={newPost}
        />
        <ImageUpload />
        <FormCtrls />
      </form>
    </FormContext.Provider>
  );
}

export default NewBlogForm;
