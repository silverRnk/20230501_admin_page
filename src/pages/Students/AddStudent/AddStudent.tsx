// @ts-ignore

import React, {
  FormEventHandler,
  createRef,
  useReducer,
  useState,
} from "react";
import styled from "styled-components";
import DefaultImg from "../../../assets/profile_default.svg";
import axiosClient from "../../../utils/AxiosClient";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import {
  AddStudentProps,
  FormValidationFeedback,
} from "../utils/interface";
import { useFormFeedback } from "../utils/CustomHooks";
import { AddStudentLabels } from "../utils/FormInputNames";
import { useStateContext } from "../../../context/ContextProvider";
import PopupDialog from "../../../compenents/PopupDialog";
import {
  formFieldsInitValue,
  formFieldsReducer,
} from "./reducer";

const Container = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 0px 7px lightgray;
`;

const Title = styled.h1`
  ${(props) => props.theme.fontThemes.h2}
`;
const Reminder = styled.p`
  font-size: 0.75rem;
  color: gray;
`;
const Form = styled.form``;
const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
`;

const FormSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 20px;
`;
const SectionTitle = styled.h2`
  ${(props) => props.theme.fontThemes.h4}
`;

const InputItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const Label = styled.label``;
const Input = styled.input<AddStudentProps>`
  height: 30px;
  padding: 5px;
  border-radius: 2px;
  border: 1px solid ${(props) => (props.isInvalid ? "red" : "gray")};
`;
const ValidationFeedback = styled.small<AddStudentProps>`
  font-weight: 400;
  margin-top: 2px;
  margin-left: 5px;
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  color: ${(props) => (props.isInvalid ? "red" : "gray")};
`;

const InputRow = styled.div`
  display: flex;
  gap: 20px;
`;
const Selection = styled.select<AddStudentProps>`
  padding-left: 5px;
  height: 30px;
  border-radius: 2px;
  border: 1px solid ${(props) => (props.isInvalid ? "red" : "gray")};
`;
const Option = styled.option``;
const StudentImage = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 10px;
`;
const Image = styled.img`
  height: 200px;
  width: 200px;
  border-radius: 50%;
`;
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

function AddStudent() {
  const { addDialogMessages } = useStateContext();
  const formRef = createRef<HTMLFormElement>();
  const studentPhotoRef = createRef<HTMLInputElement>();

  const [studentImage, setStudentImage] = useState<
    string | ArrayBuffer | null
  >("");

  const [formInputs, formInputsReducer] = useReducer(
    formFieldsReducer,
    formFieldsInitValue
  );

  const handlerOnInput = (
    e: any,
    name: string,
    value: string | undefined
  ) => {
    formInputsReducer({
      type: "INPUT",
      name: name,
      value: value,
    });
  };

  const handlerForm = (e: any) => {
    e.preventDefault();
    resetForm(e);
    const payload = new FormData();
    formInputs.forEach((form) => {
      if (form.name === "std_photo") {
        return;
      }
      payload.append(form.name, form.value!);
    });
    payload.append(
      AddStudentLabels.std_photo.name,
      studentPhotoRef.current?.files?.[0]!
    );

    console.log(payload);

    axiosClient
      .post("/admin/add_student", payload)
      .then((data) => {
        if (data && data.status === 201) {
          addDialogMessages({
            message: "Student has been successfully added",
            messageType: "Successful",
          });
        }
      })
      .catch((err) => {
        const response = err.response;
        console.log(err.response.data);
        if (response && response.status === 422) {
          const errors = response.data.errors;
          const errorKey = Object.keys(errors);
          addDialogMessages({
            message: `You have ${errorKey.length} input `,
            messageType: "Error",
          });
          errorKey.forEach((key) => {
            formInputsReducer({
              type: "INVALID",
              name: key,
              feedbackMessage: errors[key],
            });
          });
        }
      });
  };

  const handlerSelectImg = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      setStudentImage(reader.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const resetForm = (e) => {
    console.log(e);
  };


  const handleFormInput = (e) => {
    if (e.target.name === "std_photo") {
      return;
    }
    formInputsReducer({
      type: "INPUT",
      name: e.target.name,
      value: e.target.value,
    });
  };

  const getFormInput = (name: string) => {
    return formInputs.filter((form) => form.name === name)[0];
  };

  return (
    <Container>
      <Form
        ref={formRef}
        onSubmit={handlerForm}
        onInput={handleFormInput}
        method="post"
      >
        <Title>Add Student</Title>
        <Reminder>Required(*)</Reminder>
        <InputContainer>
          <FormSection>
            <SectionTitle>Student Info</SectionTitle>
            <InputItem>
              <Label htmlFor={AddStudentLabels.std_first_name.name}>
                {AddStudentLabels.std_first_name.label}*:
              </Label>
              <Input
                onChange={(e) =>
                  handlerOnInput(
                    e,
                    AddStudentLabels.std_first_name.name,
                    e.target.value
                  )
                }
                type="text"
                id={AddStudentLabels.std_first_name.name}
                name={AddStudentLabels.std_first_name.name}
                isInvalid={
                  getFormInput(AddStudentLabels.std_first_name.name)
                    .isInvalid
                }
                required
              />
              <ValidationFeedback
                isVisible={
                  getFormInput(AddStudentLabels.std_first_name.name)
                    .isInvalid
                }
                isInvalid={
                  getFormInput(AddStudentLabels.std_first_name.name)
                    .isInvalid
                }
              >
                {
                  getFormInput(AddStudentLabels.std_first_name.name)
                    .feedbackMessage
                }
              </ValidationFeedback>
            </InputItem>
            <InputItem>
              <Label htmlFor={AddStudentLabels.std_last_name.name}>
                {AddStudentLabels.std_last_name.label}*:
              </Label>
              <Input
                type="text"
                id={AddStudentLabels.std_last_name.name}
                name={AddStudentLabels.std_last_name.name}
                isInvalid={
                  getFormInput(AddStudentLabels.std_last_name.name)
                    .isInvalid
                }
                required
              />
              <ValidationFeedback
                isVisible={
                  getFormInput(AddStudentLabels.std_last_name.name)
                    .isInvalid
                }
                isInvalid={
                  getFormInput(AddStudentLabels.std_last_name.name)
                    .isInvalid
                }
              >
                {
                  getFormInput(AddStudentLabels.std_last_name.name)
                    .feedbackMessage
                }
              </ValidationFeedback>
            </InputItem>
            <InputRow>
              <InputItem>
                <Label htmlFor={AddStudentLabels.std_gender.name}>
                  {AddStudentLabels.std_gender.label}*:
                </Label>
                <Selection

                  id={AddStudentLabels.std_gender.name}
                  name={AddStudentLabels.std_gender.name}
                  isInvalid={
                    getFormInput(AddStudentLabels.std_gender.name)
                      .isInvalid
                  }
                  required
                >
                  <Option value={""}>--Select Gender--</Option>
                  <Option value={"male"}>Male</Option>
                  <Option value={"female"}>Female</Option>
                </Selection>
                <ValidationFeedback
                  isVisible={
                    getFormInput(AddStudentLabels.std_gender.name)
                      .isInvalid
                  }
                  isInvalid={
                    getFormInput(AddStudentLabels.std_gender.name)
                      .isInvalid
                  }
                >
                  {
                    getFormInput(AddStudentLabels.std_gender.name)
                      .feedbackMessage
                  }
                </ValidationFeedback>
              </InputItem>

              <InputItem>
                <Label htmlFor={AddStudentLabels.std_dob.name}>
                  {AddStudentLabels.std_dob.label}*
                </Label>
                <Input

                  type="date"
                  id={AddStudentLabels.std_dob.name}
                  name={AddStudentLabels.std_dob.name}
                  isInvalid={
                    getFormInput(AddStudentLabels.std_dob.name)
                      .isInvalid
                  }
                  required
                />
                <ValidationFeedback
                  isVisible={
                    getFormInput(AddStudentLabels.std_dob.name)
                      .isInvalid
                  }
                  isInvalid={
                    getFormInput(AddStudentLabels.std_dob.name)
                      .isInvalid
                  }
                >
                  {
                    getFormInput(AddStudentLabels.std_dob.name)
                      .feedbackMessage
                  }
                </ValidationFeedback>
              </InputItem>
            </InputRow>
            <InputItem>
              <Label htmlFor={AddStudentLabels.std_religion.name}>
                {AddStudentLabels.std_religion.label}*:
              </Label>
              <Input

                type="text"
                name={AddStudentLabels.std_religion.name}
                id={AddStudentLabels.std_religion.name}
                isInvalid={
                  getFormInput(AddStudentLabels.std_religion.name)
                    .isInvalid
                }
                required
              />
              <ValidationFeedback
                isVisible={
                  getFormInput(AddStudentLabels.std_religion.name)
                    .isInvalid
                }
                isInvalid={
                  getFormInput(AddStudentLabels.std_religion.name)
                    .isInvalid
                }
              >
                {
                  getFormInput(AddStudentLabels.std_religion.name)
                    .feedbackMessage
                }
              </ValidationFeedback>
            </InputItem>
            <InputRow>
              <InputItem>
                <Label htmlFor={AddStudentLabels.std_email.name}>
                  {AddStudentLabels.std_email.label}*:
                </Label>
                <Input

                  type="email"
                  id={AddStudentLabels.std_email.name}
                  name={AddStudentLabels.std_email.name}
                  isInvalid={
                    getFormInput(AddStudentLabels.std_email.name)
                      .isInvalid
                  }
                  required
                />
                <ValidationFeedback
                  isVisible={
                    getFormInput(AddStudentLabels.std_email.name)
                      .isInvalid
                  }
                  isInvalid={
                    getFormInput(AddStudentLabels.std_email.name)
                      .isInvalid
                  }
                >
                  {
                    getFormInput(AddStudentLabels.std_email.name)
                      .isInvalid
                  }
                </ValidationFeedback>
              </InputItem>
              <InputItem>
                <Label htmlFor={AddStudentLabels.std_phone.name}>
                  {AddStudentLabels.std_phone.label}*:
                </Label>
                <Input

                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]+"
                  name={AddStudentLabels.std_phone.name}
                  id={AddStudentLabels.std_phone.name}
                  isInvalid={
                    getFormInput(AddStudentLabels.std_phone.name)
                      .isInvalid
                  }
                  required
                />
                <ValidationFeedback
                  isVisible={
                    getFormInput(AddStudentLabels.std_phone.name)
                      .isInvalid
                  }
                  isInvalid={
                    getFormInput(AddStudentLabels.std_phone.name)
                      .isInvalid
                  }
                >
                  {
                    getFormInput(AddStudentLabels.std_phone.name)
                      .isInvalid
                  }
                </ValidationFeedback>
              </InputItem>
            </InputRow>

            <InputRow>
              <InputItem>
                <Label htmlFor={AddStudentLabels.std_password.name}>
                  {AddStudentLabels.std_password.label}*:
                </Label>
                <Input

                  type="password"
                  id={AddStudentLabels.std_password.name}
                  name={AddStudentLabels.std_password.name}
                  minLength={6}
                  isInvalid={
                    getFormInput(AddStudentLabels.std_password.name)
                      .isInvalid
                  }
                  required
                />
                <ValidationFeedback
                  isVisible={
                    getFormInput(AddStudentLabels.std_password.name)
                      .isInvalid
                  }
                  isInvalid={
                    getFormInput(AddStudentLabels.std_password.name)
                      .isInvalid
                  }
                >
                  {
                    getFormInput(AddStudentLabels.std_password.name)
                      .feedbackMessage
                  }
                </ValidationFeedback>
              </InputItem>
              <InputItem>
                <Label htmlFor={AddStudentLabels.std_passconf.name}>
                  {AddStudentLabels.std_passconf.label}*:
                </Label>
                <Input

                  type="password"
                  id={AddStudentLabels.std_passconf.name}
                  name={AddStudentLabels.std_passconf.name}
                  isInvalid={
                    getFormInput(AddStudentLabels.std_passconf.name)
                      .isInvalid
                  }
                  required
                />
                <ValidationFeedback
                  isVisible={
                    getFormInput(AddStudentLabels.std_passconf.name)
                      .isInvalid
                  }
                  isInvalid={
                    getFormInput(AddStudentLabels.std_passconf.name)
                      .isInvalid
                  }
                >
                  {
                    getFormInput(AddStudentLabels.std_passconf.name)
                      .feedbackMessage
                  }
                </ValidationFeedback>
              </InputItem>
            </InputRow>

            <InputRow>
              <InputItem>
                <Label htmlFor={AddStudentLabels.std_grade.name}>
                  {AddStudentLabels.std_grade.label}*:
                </Label>
                <Selection
                  id={AddStudentLabels.std_grade.name}
                  name={AddStudentLabels.std_grade.name}
                  isInvalid={
                    getFormInput(AddStudentLabels.std_grade.name)
                      .isInvalid
                  }
                  required
                >
                  <Option value={""}>--Select Class--</Option>
                  <Option value={1}>I</Option>
                  <Option value={2}>II</Option>
                  <Option value={3}>III</Option>
                </Selection>
                <ValidationFeedback
                  isVisible={
                    getFormInput(AddStudentLabels.std_grade.name)
                      .isInvalid
                  }
                  isInvalid={
                    getFormInput(AddStudentLabels.std_grade.name)
                      .isInvalid
                  }
                >
                  {
                    getFormInput(AddStudentLabels.std_grade.name)
                      .feedbackMessage
                  }
                </ValidationFeedback>
              </InputItem>
              <InputItem>
                <Label htmlFor={AddStudentLabels.std_section.name}>
                  {AddStudentLabels.std_section.label}*:
                </Label>
                <Selection
                  id={AddStudentLabels.std_section.name}
                  name={AddStudentLabels.std_section.name}
                  isInvalid={
                    getFormInput(AddStudentLabels.std_section.name)
                      .isInvalid
                  }
                  required
                >
                  <Option value={""}> --Select Section-- </Option>
                  <Option value={1}>Acacia</Option>
                  <Option value={2}>Nara</Option>
                  <Option value={3}>Kawayan</Option>
                </Selection>
                <ValidationFeedback
                  isVisible={
                    getFormInput(AddStudentLabels.std_section.name)
                      .isInvalid
                  }
                  isInvalid={
                    getFormInput(AddStudentLabels.std_section.name)
                      .isInvalid
                  }
                >
                  {
                    getFormInput(AddStudentLabels.std_section.name)
                      .isInvalid
                  }
                </ValidationFeedback>
              </InputItem>
            </InputRow>
          </FormSection>

          <FormSection>
            <SectionTitle>Parent's Info</SectionTitle>
            <InputItem>
              <Label htmlFor={AddStudentLabels.fth_name.name}>
                {AddStudentLabels.fth_name.label}*:
              </Label>
              <Input
                type="text"
                name={AddStudentLabels.fth_name.name}
                id={AddStudentLabels.fth_name.name}
                isInvalid={
                  getFormInput(AddStudentLabels.fth_name.name)
                    .isInvalid
                }
                required
              />
              <ValidationFeedback
                isVisible={
                  getFormInput(AddStudentLabels.fth_name.name)
                    .isInvalid
                }
                isInvalid={
                  getFormInput(AddStudentLabels.fth_name.name)
                    .isInvalid
                }
              >
                {
                  getFormInput(AddStudentLabels.fth_name.name)
                    .feedbackMessage
                }
              </ValidationFeedback>
            </InputItem>
            <InputItem>
              <Label htmlFor={AddStudentLabels.mth_name.name}>
                {AddStudentLabels.mth_name.label}*:
              </Label>
              <Input
                type="text"
                name={AddStudentLabels.mth_name.name}
                id={AddStudentLabels.mth_name.name}
                isInvalid={
                  getFormInput(AddStudentLabels.mth_name.name)
                    .isInvalid
                }
                required
              />
              <ValidationFeedback
                isVisible={
                  getFormInput(AddStudentLabels.mth_name.name)
                    .isInvalid
                }
                isInvalid={
                  getFormInput(AddStudentLabels.mth_name.name)
                    .isInvalid
                }
              >
                {
                  getFormInput(AddStudentLabels.mth_name.name)
                    .feedbackMessage
                }
              </ValidationFeedback>
            </InputItem>
            <InputItem>
              <Label htmlFor={AddStudentLabels.fth_occupation.name}>
                {AddStudentLabels.fth_occupation.label}*:
              </Label>
              <Input
                type="text"
                name={AddStudentLabels.fth_occupation.name}
                id={AddStudentLabels.fth_occupation.name}
                isInvalid={
                  getFormInput(AddStudentLabels.fth_occupation.name)
                    .isInvalid
                }
                required
              />
              <ValidationFeedback
                isVisible={
                  getFormInput(AddStudentLabels.fth_occupation.name)
                    .isInvalid
                }
                isInvalid={
                  getFormInput(AddStudentLabels.fth_occupation.name)
                    .isInvalid
                }
              >
                {
                  getFormInput(AddStudentLabels.fth_occupation.name)
                    .feedbackMessage
                }
              </ValidationFeedback>
            </InputItem>

            <InputItem>
              <Label htmlFor={AddStudentLabels.prn_religion.name}>
                {AddStudentLabels.prn_religion.label}*:
              </Label>
              <Input
                type="text"
                name={AddStudentLabels.prn_religion.name}
                id={AddStudentLabels.prn_religion.name}
                isInvalid={
                  getFormInput(AddStudentLabels.prn_religion.name)
                    .isInvalid
                }
                required
              />
              <ValidationFeedback
                isVisible={
                  getFormInput(AddStudentLabels.prn_religion.name)
                    .isInvalid
                }
                isInvalid={
                  getFormInput(AddStudentLabels.prn_religion.name)
                    .isInvalid
                }
              >
                {
                  getFormInput(AddStudentLabels.prn_religion.name)
                    .feedbackMessage
                }
              </ValidationFeedback>
            </InputItem>
            <InputItem>
              <Label htmlFor={AddStudentLabels.prn_email.name}>
                {AddStudentLabels.prn_email.label}*:
              </Label>
              <Input
                type="email"
                name={AddStudentLabels.prn_email.name}
                id={AddStudentLabels.prn_email.name}
                isInvalid={
                  getFormInput(AddStudentLabels.prn_email.name)
                    .isInvalid
                }
                required
              />
              <ValidationFeedback
                isVisible={
                  getFormInput(AddStudentLabels.prn_email.name)
                    .isInvalid
                }
                isInvalid={
                  getFormInput(AddStudentLabels.prn_email.name)
                    .isInvalid
                }
              >
                {
                  getFormInput(AddStudentLabels.prn_email.name)
                    .feedbackMessage
                }
              </ValidationFeedback>
            </InputItem>
            <InputItem>
              <Label htmlFor={AddStudentLabels.prn_phone.name}>
                {AddStudentLabels.prn_phone.label}*:
              </Label>
              <Input
                type="number"
                name={AddStudentLabels.prn_phone.name}
                id={AddStudentLabels.prn_phone.name}
                isInvalid={
                  getFormInput(AddStudentLabels.prn_phone.name)
                    .isInvalid
                }
                required
              />
              <ValidationFeedback
                isVisible={
                  getFormInput(AddStudentLabels.prn_phone.name)
                    .isInvalid
                }
                isInvalid={
                  getFormInput(AddStudentLabels.prn_phone.name)
                    .isInvalid
                }
              >
                {
                  getFormInput(AddStudentLabels.prn_phone.name)
                    .feedbackMessage
                }
              </ValidationFeedback>
            </InputItem>
          </FormSection>

          <StudentImage>
            <Image
              src={studentImage || DefaultImg}
              alt="student_img"
            />

            <InputItem>
              <Label htmlFor={AddStudentLabels.std_photo.name}>
                {AddStudentLabels.std_photo.label}
              </Label>
              <Input
                ref={studentPhotoRef}
                type="file"
                id={AddStudentLabels.std_photo.name}
                name={AddStudentLabels.std_photo.name}
                onInput={handlerSelectImg}
                accept="image/jpeg"
              />
              <ValidationFeedback
                isVisible={
                  getFormInput(AddStudentLabels.std_photo.name)
                    .isInvalid
                }
                isInvalid={
                  getFormInput(AddStudentLabels.std_photo.name)
                    .isInvalid
                }
              >
                {
                  getFormInput(AddStudentLabels.std_photo.name)
                    .feedbackMessage
                }
              </ValidationFeedback>
            </InputItem>
          </StudentImage>
        </InputContainer>
        <ButtonContainer>
          <Button type="submit">Save</Button>
          <Button type="reset">Reset</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
}

export default AddStudent;
