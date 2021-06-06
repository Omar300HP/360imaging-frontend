import { Buttons } from "../../../../components/Buttons";
import { FormGroup } from "../../../../components/FormGroup";
import renderStaticText from "../../../../locale";

function CommentForm(props) {
  const formGroup1 = [
    {
      inputType: "inputTextarea",
      name: "description",
      label: "",
      inputClassName: "textarea-noborder",
      labelClassName: "no-label",
      containerClassName: "textarea-container",
      autoResize: true,
      placeholder: "write_comment",
      rows: 1,
      cols: 30,
    },
  ];

  return (
    <form className={"comment-form"}>
      <FormGroup className={"group-container"} inputs={formGroup1} />
      <Buttons buttontype="primary" classNames="submit" type="submit">
        <i className="pi pi-pencil" />
        <span>{renderStaticText("comment")}</span>
      </Buttons>
    </form>
  );
}

export default CommentForm;
