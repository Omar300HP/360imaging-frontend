import { form_required_validation } from "../../../../utils";

export const POST_FORM = {
  poster: "actual user",
  textContent: "",
  images: [],
};

export const POST_FORM_VALIDATION = (form_values) => {
  let errors = {};

  const required_values = ["poster", "textContent"];

  errors = { ...form_required_validation(form_values, required_values) };

  return errors;
};
