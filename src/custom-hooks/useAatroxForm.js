// Functionalities:
//  1. Form Validation for picklist item input field
//  2. Form Handling on Change for picklist item input field
//  3. Form Handling on Blur for picklist item input field
//  4. Form Submission
//  5. Event Handler when adding items to the selected area
//  6. Event Handler when removing items from the selected area
//
// Args:
//  1. form_schema(dictionary): form fields schema
//  2. validate_fn(function): form validation function
//  3. api_path(string): collection api_path
//  4. callback_fn(function): callback function after submitting the form
//
// Return:
// 1. handleSubmit(function): handle form on submit
// 2. handleBlur(function): handle form fields on blur
// 3. handleChange(function): handle form field input of type text/email/password/number value on change
// 4. handleSelectChange(function): handle form field input of type react-select value on change
// 5. handleSelectedProductValuesChange(function): handle form picklist item input field value on change
// 6. addSelectedProducts(function): event handler when adding items[s] to the selected area
// 7. addAllSelectedProducts(function): event handler when adding all items at once to the selected area
// 8. removeSelectedProducts(function): event handler when removing items[s] from the selected area
// 9. removeAllSelectedProducts(function): event handler when removing all items at once from the selected area
// 10. rowID(int): target doc ID for patching
// 11. setRowID(function): set the row ID we want to patch
// 12. values(array of objects): form fields values
// 13. setObjectValues(function): set form fields values
// 14. errors(array of objects): form validation errors
// 15. isSubmitting(boolean): submit state of to prevent form multi submission

import { useState, useEffect, useReducer } from "react";
import { apiCall } from "../api/mockServer/server";

export default function useAatroxForm({
  form_schema,
  validate_fn,
  api_path,
  show_toast_success,
  toast_success_message,
  callback_fn = null,
  collectionHandler = null,
  documentHandler = null,
}) {
  const [objectValues, setObjectValues] = useState(form_schema);

  const initialState = {
    errors: {},
    isSubmitting: false,
    toasts: null,
    api_method: null,
    selected_object: null,
    selected_row: null,
    selected_row_id: null,
    modal_state: false,
    uploadFilesObjectValues: null,
    refreshVar: 0,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "SELECT_DYNAMIC_ARRAY_ROW":
        return {
          ...state,
          selected_row: action.row,
          selected_row_id: action.row_id,
          modal_state: true,
        };
      case "UNSELECT_DYNAMIC_ARRAY_ROW":
        return {
          ...state,
          selected_row: null,
          selected_row_id: null,
          modal_state: false,
        };
      case "SET_SELECTED_OBJECT":
        setObjectValues(action.selected_object);
        return {
          ...state,
          api_method: "PUT",
          selected_object: action.selected_object,
          errors: {},
        };
      case "SET_FORM_OBJECT":
        setObjectValues(action.form_object);
        return {
          ...state,
          selected_object: action.form_object,
          errors: {},
        };
      case "SET_API":
        return {
          ...state,
          api_method: action.api_method,
        };
      case "CREATE_NEW":
        setObjectValues(form_schema);
        return {
          ...state,
          api_method: "POST",
          selected_object: form_schema,
          errors: {},
        };
      case "CLEAR_FORM_OBJECT":
        setObjectValues(form_schema);
        return {
          ...state,
          api_method: null,
          selected_object: null,
          errors: {},
        };
      case "UNDO_FORM_OBJECT":
        setObjectValues(state.selected_object);
        return {
          ...state,
          selected_object: state.selected_object ? state.selected_object : null,
          errors: {},
        };
      case "SUBMIT_FORM":
        return {
          ...state,
          errors: action.validate_fn,
          isSubmitting: true,
        };
      case "SUBMIT_FORM_WITH_FILE_UPLOAD":
        return {
          ...state,
          errors: action.validate_fn,
          uploadFilesObjectValues: action.uploadFilesObjectValues,
          isSubmitting: true,
        };
      case "SUBMIT_OFF":
        let error_detail = "";
        // if (Object.keys(state.errors).length > 0) {
        //   if (Object.keys(state.errors.required).length > 0) {
        //     error_detail = renderLabel("fill_required_fields");
        //   } else {
        //     error_detail = renderLabel(
        //       state.errors[Object.keys(state.errors)[0]]
        //     );
        //   }
        // }
        // addToasts([{ severity: "error", detail: error_detail }]);
        return {
          ...state,
          isSubmitting: false,
        };
      case "POST_SUCCESS":
        show_toast_success &&
          // addToasts([
          //   {
          //     severity: "success",
          //     detail: toast_success_message
          //       ? renderLabel(toast_success_message)
          //       : action.payload.message
          //       ? renderLabel(action.payload.message)
          //       : renderLabel("data_saved_successfully"),
          //   },
          // ]);
          setObjectValues(form_schema);
        collectionHandler &&
          collectionHandler.dispatch({ type: "HANDLE_REFRESH" });
        documentHandler && documentHandler.syncDoc();
        callback_fn && callback_fn(action.payload.data);
        return {
          ...state,
          isSubmitting: false,
          selected_object: null,
          api_method: "POST",
          refreshVar: state.refreshVar + 1,
        };
      case "POST_FAILED":
        // addToasts([
        //   {
        //     severity: "error",
        //     detail: action.error,
        //   },
        // ]);
        return {
          ...state,
          errors: action.error,
          isSubmitting: false,
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.isSubmitting) {
      if (Object.keys(state.errors).length === 0 || state.errors.length === 0) {
        let values = { ...objectValues };
        Object.keys(values).forEach((key) => {
          if (values[key] === "") delete values[key];
        });

        if (state.api_method === "POST") {
          apiCall(api_path, values)
            .then((res) => {
              dispatch({
                type: "POST_SUCCESS",
                payload: res.data,
              });
            })
            .catch((error) => {
              dispatch({
                type: "POST_FAILED",
                error: "error",
                // error.response && typeof error.response !== "undefined"
                //   ? error.response.data && error.response.data.message
                //     ? error.response.data.message
                //     : renderLabel("connection_error")
                //   : renderLabel("connection_error"),
              });
            });
        } else if (state.api_method === "PUT") {
          apiCall(
            // `${api_path}/${objectValues.id ? objectValues.id + "/" : ""}`,
            `${api_path}`,
            values
          )
            .then((res) => {
              dispatch({
                type: "POST_SUCCESS",
                payload: res.data,
              });
            })
            .catch((error) => {
              dispatch({
                type: "POST_FAILED",
                error: "error",
                // error.response && typeof error.response !== "undefined"
                //   ? error.response.data && error.response.data.message
                //     ? error.response.data.message
                //     : renderLabel("connection_error")
                //   : renderLabel("connection_error"),
              });
            });
        }
      } else {
        dispatch({
          type: "SUBMIT_OFF",
        });
      }
    }
    // eslint-disable-next-line
  }, [state.isSubmitting]);

  // handle form onSubmit
  const handleSubmit = (event, uploadFilesObjectValues) => {
    if (event) {
      event.preventDefault();
    }
    if (uploadFilesObjectValues) {
      dispatch({
        type: "SUBMIT_FORM_WITH_FILE_UPLOAD",
        uploadFilesObjectValues: uploadFilesObjectValues,
        validate_fn: validate_fn(objectValues),
      });
    } else {
      dispatch({
        type: "SUBMIT_FORM",
        validate_fn: validate_fn(objectValues),
      });
    }
  };

  //handle form field onChange
  const handleChange = (prop_path, value) => {
    let _values = { ...objectValues };
    let _values_ = _values;

    var x = prop_path.split(".");

    // get the target prop value
    var last = x.pop();

    // dive deep down to the target prop
    x.forEach((p) => (_values = _values[p]));

    // assign target prop value
    _values[last] = value;

    dispatch({ type: "SET_FORM_OBJECT", form_object: _values_ });
  };

  const traverseTreeValues = (
    parent_leaf,
    parent_leaf_path,
    childrenPropName,
    value
  ) => {
    // eslint-disable-next-line
    parent_leaf[childrenPropName].map((child, index) => {
      let leaf_path;
      leaf_path = `${parent_leaf_path}.${childrenPropName}.${index}`;
      child.value = value;

      child[childrenPropName] &&
        child[childrenPropName].length > 0 &&
        traverseTreeValues(child, leaf_path, childrenPropName, value);
    });
  };

  const handleCheckboxTreeChange = (leaf_path, childrenPropName, value) => {
    let _values = { ...objectValues };
    let _values_ = _values;

    var x = leaf_path.split(".");

    // get the target prop value
    var last = x.pop();

    // dive deep down to the target prop
    // and make an array of parents that reference every leaf
    let parents = [];
    x.forEach((p) => {
      _values = _values[p];
      if (!Array.isArray(_values)) {
        parents.push({ parent: _values, children: _values[childrenPropName] });
      }
    });

    // assign target prop value
    _values[last].value = value;

    // go back top to the root leaf
    // and mark parents leaves partially or totally or unmark
    for (let index = parents.length - 1; index > -1; index--) {
      let _parent = parents[index];

      let some = false;
      let every = false;

      if (
        _parent.children.some(
          (child) => child.value === true || child.value === false
        )
      ) {
        _parent.parent.value = false;
        some = true;
      }

      if (_parent.children.every((child) => child.value === true)) {
        _parent.parent.value = true;
        every = true;
      }

      if (!some && !every) {
        _parent.parent.value = null;
      }
    }

    // traverse tree leaves to change children to same value
    _values[last][childrenPropName] &&
      _values[last][childrenPropName].length > 0 &&
      // eslint-disable-next-line
      _values[last][childrenPropName].map((child, index) => {
        let _leaf_path;
        _leaf_path = `${childrenPropName}.${index}`;
        child.value = value;
        child[childrenPropName] &&
          child[childrenPropName].length > 0 &&
          traverseTreeValues(child, _leaf_path, childrenPropName, value);
      });

    dispatch({ type: "SET_FORM_OBJECT", form_object: _values_ });
  };

  // handle multiple form fields change at once
  const handleMultiChange = (values_array) => {
    let obj = { ...objectValues };
    values_array.forEach((el) => {
      obj[el.input_name] = el.input_value;
    });
    dispatch({ type: "SET_FORM_OBJECT", form_object: obj });
  };

  // handling adding new element in a dynamic array form field
  function addNewElement(field_array, field_values) {
    let arr = [...objectValues[field_array]];
    arr.push(field_values);
    dispatch({
      type: "SET_FORM_OBJECT",
      form_object: {
        ...objectValues,
        [field_array]: arr,
      },
    });
  }

  // handling removing an existing element from the dynamic array form field
  function removeElement(field_array, child_index) {
    let arr = [...objectValues[field_array]];
    arr.splice(child_index, 1);
    dispatch({
      type: "SET_FORM_OBJECT",
      form_object: {
        ...objectValues,
        [field_array]: arr,
      },
    });
  }

  // handling reset all form fields
  function resetForm() {
    dispatch({
      type: "SET_FORM_OBJECT",
      form_object: form_schema,
    });
  }

  let AatroxForm = {
    handleSubmit,
    handleChange,
    handleCheckboxTreeChange,
    handleMultiChange,
    addNewElement,
    removeElement,
    resetForm,
    objectValues,
    state,
    dispatch,
  };

  return AatroxForm;
}
