import { useState } from "react";
import { FormValidationFeedback } from "./interfaces";

export const formFeedbackInitialState: FormValidationFeedback = {
  message: 'valid',
  isInvalid: false,
  isVisible: false
}

export const useFormFeedback = (): [FormValidationFeedback, (arg0: FormValidationFeedback) => void] => {
  const [feedback, setFeedback] = useState<FormValidationFeedback>({
    message: "valid",
    isInvalid: false,
    isVisible: false,
  });

  return [feedback, setFeedback]
};