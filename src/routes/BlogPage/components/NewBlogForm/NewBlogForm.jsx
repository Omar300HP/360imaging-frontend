import "./NewBlogForm.scss";
import PropTypes from "prop-types";
import { FormGroup } from "../../../../components/FormGroup";
import renderStaticText from "../../../../locale";
import { Buttons } from "../../../../components/Buttons";

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
      <div className="form-ctrl">
        <Buttons buttontype="secondary" classNames="submit" type="button">
          <i className="pi pi-refresh" />{" "}
          <span>{renderStaticText("reset")}</span>
        </Buttons>
        <Buttons buttontype="primary" classNames="submit" type="submit">
          <i className="pi pi-pencil" /> <span>{renderStaticText("post")}</span>
        </Buttons>
      </div>
    </form>
  );
}

NewBlogForm.propTypes = {};

export default NewBlogForm;
