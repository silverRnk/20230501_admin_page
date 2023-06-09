import { FormInput } from "../../../utils/interfaces";
import { AddTeacherLabels } from "../utils/FormInputNames";
import { FormActions } from "../utils/types";

const addTeachersInputFieldsInitValue: Array<FormInput> = Object.keys(
  AddTeacherLabels
).map((key) => {
  return {
    name: AddTeacherLabels[key].name,
    value: "",
    isInvalid: false,
    feedbackMessage: "",
  };
});

const addTeachersInputFieldReducer = (
  state: Array<FormInput>,
  action: {
    type: FormActions;
    name: string;
    value?: string | undefined;
    feedbackMessage?: string;
    files?: FileList;
  }
) => {
  switch (action.type) {
    case "INPUT":
      return state.map((form) => {
        return form.name === action.name
          ? { ...form, value: action.value }
          : form;
      });
    case "INVALID":
      return state.map((form) => {
        return form.name === action.name
          ? {
              ...form,
              isInvalid: true,
              feedbackMessage: action.feedbackMessage,
            }
          : form;
      });
    case "RESET_INVALID":
        return state.map(form => {
            return {...form, isInvalid: false, feedbackMessage: ""}
        })
    default:
      return state;
  }
};

export {addTeachersInputFieldReducer, addTeachersInputFieldsInitValue}