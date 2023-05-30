import { useState } from "react";
import { FormValidationFeedback } from "./interface";

export const useFormFeedback = (): [
  FormValidationFeedback,
  (arg0: FormValidationFeedback) => void,
  () => void
] => {
  const [feedback, setFeedback] = useState<FormValidationFeedback>({
    message: "valid",
    isInvalid: false,
    isVisible: false,
  });

  const reset = () => {
    setFeedback({
      message: "valid",
      isInvalid: false,
      isVisible: false,
    });
  };

  return [feedback, setFeedback, reset];
};
