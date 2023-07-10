import { type } from "os";
import React from "react";
import styled from "styled-components";

const Container = styled.div``;
const InputField = styled.input``;

const Form = styled.form`
  width: 100%;
`;
const FormReminder = styled.p`
  font-size: 0.75rem;
  color: gray;
`;
const FormTitle = styled.h1`
  ${(props) => props.theme.fontThemes.h2}
`;
const FormSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 20px;
`;
const FormSectionTitle = styled.h2`
  ${(props) => props.theme.fontThemes.h4}
`;
const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const InputRow = styled.div<{ columnCount: number }>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${(props) => props.columnCount}, 1fr);
  gap: 20px;
`;

const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  ${(props) => props.theme.fontThemes.inputLabel}
`;
const Input = styled.input<{ isInvalid: boolean }>`
  font-size: 1rem;
  height: 35px;
  padding: 5px;
  border-radius: 2px;
  border: 1px solid
    ${(props) => (props.isInvalid ? props.theme.colors.red : "grey")};
  box-shadow: 0 0 0 2px
    ${(props) =>
      props.isInvalid ? props.theme.colors.red : "transparent"};
  transition: all 0.25s ease;
`;
const ValidationFeedback = styled.small<{
  isInvalid: boolean;
  isVisible: boolean;
}>`
  min-height: 20px;
  font-weight: 400;
  margin-top: 2px;
  margin-left: 5px;
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  color: ${(props) => (props.isInvalid ? "red" : "gray")};
`;

const Selection = styled.select<{ isInvalid: boolean }>`
  padding-left: 5px;
  font-size: 1rem;
  height: 35px;
  border-radius: 2px;
  border: 1px solid
    ${(props) => (props.isInvalid ? props.theme.colors.red : "gray")};
  box-shadow: 0 0 0 2px
    ${(props) =>
      props.isInvalid ? props.theme.colors.red : "transparent"};
  transition: all 0.5s ease;
`;
const Option = styled.option``;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const Button = styled.button`
  width: 100px;
  height: 50px;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: ${(props) => props.theme.colors.secondary};
  background-color: ${(props) =>
    props.type === "reset" && props.theme.colors.primary};
  margin-right: 20px;

  &:active {
    filter: brightness(85%);
  }
`;

const IsRequiredIndicator = styled.span`
  color: red !important;
`;

const RadioContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
  gap: 10px;
  width: auto;
  height: auto;
`;

const InputRadio = styled(Input)`
  height: 1rem !important;
  width: 1rem !important;
`;
type MyType = React.HTMLAttributes<HTMLInputElement>;
const RadioButton = (
  { props,
    name,
    id,
    value,
  }: {
    props?: MyType,
    name: string;
    id: string;
    value: string;
  },
  
) => {
  return (
    <InputRadio
      type="radio"
      id={id}
      value={value}
      name={name}
      isInvalid={false}
      {...props}
    />
  );
};

const InputWithFeedback = (props: {
  type: string | undefined;
  value?: string | number | undefined;
  invalid?: boolean;
  invalidFeedbackMessage?: string;
  onInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { type, value, invalid, invalidFeedbackMessage } = props;

  return (
    <Container>
      <InputField type={type} value={value}></InputField>
      <ValidationFeedback
        isInvalid={invalid || false}
        isVisible={invalid || false}
      >
        {invalidFeedbackMessage}
      </ValidationFeedback>
    </Container>
  );
};

const FormRow = () => {};

export default InputWithFeedback;

export {
  Form,
  FormReminder,
  FormTitle,
  FormSectionTitle,
  FormSection,
  InputContainer,
  Input,
  RadioContainer,
  RadioWrapper,
  RadioButton,
  IsRequiredIndicator,
  InputRow,
  ValidationFeedback,
  InputWrapper,
  Selection,
  Option,
  Label,
  ButtonContainer,
  Button,
};
