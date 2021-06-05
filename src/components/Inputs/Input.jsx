import PropTypes from "prop-types";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import renderStaticText from "../../locale";

Input.propTypes = {
  inputType: PropTypes.string,
  label: PropTypes.string,
  inputClassName: PropTypes.string,
  containerClassName: PropTypes.string,
  labelClassName: PropTypes.string,
};

export default function Input(props) {
  const {
    inputType,
    label,
    inputClassName,
    containerClassName,
    labelClassName,
    placeholder,
  } = props;

  const inputText = (
    <InputText
      {...props}
      className={inputClassName}
      placeholder={renderStaticText(placeholder)}
    />
  );

  const inputTextarea = (
    <InputTextarea
      {...props}
      className={inputClassName}
      placeholder={renderStaticText(placeholder)}
    />
  );

  const inputNumber = (
    <InputNumber
      {...props}
      className={inputClassName}
      placeholder={renderStaticText(placeholder)}
    />
  );

  const inputTypes = {
    inputNumber: inputNumber,
    inputText: inputText,
    inputTextarea: inputTextarea,
  };

  return (
    <div className={containerClassName}>
      <label className={labelClassName}>{renderStaticText(label)}</label>
      {inputTypes[inputType]}
    </div>
  );
}
