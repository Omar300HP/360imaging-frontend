import "./NewBlogForm.scss";
import PropTypes from "prop-types";
import { FormGroup } from "../../../../components/FormGroup";
import renderStaticText from "../../../../locale";

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
      row: 10,
      placeholder: "whats_up",
    },
  ];
  return (
    <form className={"newblog"} onsubmit>
      <h3>{renderStaticText("create_blog")}</h3>
      <FormGroup className={"group-container"} inputs={formGroup1} />
    </form>
  );
}

NewBlogForm.propTypes = {};

export default NewBlogForm;
