import PropTypes from "prop-types";
import { Input } from "../Inputs";

FormGroup.propTypes = {
  inputs: PropTypes.array,
  className: PropTypes.string,
  formHandler: PropTypes.shape({
    objectValues: PropTypes.object,
    handleChange: PropTypes.func,
    isEditable: PropTypes.bool,
  }),
};

export default function FormGroup(props) {
  const { inputs, className, formHandler } = props;
  const { objectValues, handleChange, isEditable } = formHandler || {
    objectValues: null,
    handleChange: null,
    isEditable: null,
  };

  return (
    <div className={className}>
      {inputs.map((input, index) => {
        return (
          <Input
            {...input}
            key={index}
            disabled={false}
            value={
              input.value
                ? input.value
                : objectValues && objectValues[input.name]
            }
            onChange={(e) =>
              input.handleChange
                ? input.handleChange(
                    e?.target?.value ? e.target.value : e.value
                  )
                : handleChange &&
                  handleChange(
                    input.name,
                    e?.target?.value ? e.target.value : e.value
                  )
            }
          />
        );
      })}
    </div>
  );
}
