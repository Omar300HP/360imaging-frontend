import { Buttons } from "../../../../components/Buttons";
import renderStaticText from "../../../../locale";

function FormCtrls(props) {
  return (
    <div className="form-ctrl">
      <Buttons buttontype="secondary" classNames="submit" type="button">
        <i className="pi pi-refresh" /> <span>{renderStaticText("reset")}</span>
      </Buttons>
      <Buttons buttontype="primary" classNames="submit" type="submit">
        <i className="pi pi-pencil" /> <span>{renderStaticText("post")}</span>
      </Buttons>
    </div>
  );
}

export default FormCtrls;
