import PropTypes from "prop-types";
import { FormGroup } from "../../../../components/FormGroup";
import renderStaticText from "../../../../locale";
import { FormCtrls } from "../FormCtrls";
import { ImageUpload } from "../ImageUpload";

function NewBlogForm(props) {
  const formGroup1 = [
    {
      inputType: "inputTextarea",
      name: "description",
      label: "description",
      inputClassName: "textarea-noborder",
      labelClassName: "no-label",
      containerClassName: "textarea-container",
      autoResize: true,
      placeholder: "whats_up",
      rows: 15,
      cols: 30,
    },
  ];

  return (
    <form
      className={"newblog"}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h3>{renderStaticText("create_blog")}</h3>
      <FormGroup className={"group-container"} inputs={formGroup1} />
      <ImageUpload />
      <FormCtrls />
    </form>
  );
}

NewBlogForm.propTypes = {};

export default NewBlogForm;
