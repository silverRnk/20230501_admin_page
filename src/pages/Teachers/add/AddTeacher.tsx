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
import {
  AddStudentProps,
  FormValidationFeedback,
} from "../utils/interface";
import { AddTeacherLabels } from "../utils/FormInputNames";
import { useStateContext } from "../../../context/ContextProvider";
import {
  addTeachersInputFieldReducer,
  addTeachersInputFieldsInitValue,
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
  box-shadow: 0 0 0 ${props => props.isInvalid? "2px red": "0px transparent"};
`;
const ValidationFeedback = styled.small<AddStudentProps>`
  min-height: 20px;
  font-weight: 400;
  margin-top: 2px;
  margin-left: 5px;
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  color: ${(props) => (props.isInvalid ? "red" : "gray")};
`;
const IsRequiredIndicator = styled.span`
  color: red;
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
  background-color: aqua;
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

const IsRequired = (isRequired: boolean) => {
  return (
    <IsRequiredIndicator>{isRequired ? "*" : ""}</IsRequiredIndicator>
  );
};

const AddTeacher = () => {
  const formRef = createRef<HTMLFormElement>();
  const teacherPhotoRef = createRef<HTMLInputElement>();

  const [profileImage, setProfileImage] = useState<
    string | ArrayBuffer | null
  >("");
  const FormField = AddTeacherLabels;

  const [formInputs, formInputsReducer] = useReducer(
    addTeachersInputFieldReducer,
    addTeachersInputFieldsInitValue
  );

  const { addDialogMessages } = useStateContext();
  const handlerForm = (e: any) => {
    e.preventDefault();
    
    formInputsReducer({type: "RESET_INVALID", name:""})
    /* resetForm(e); */
    const payload = new FormData();
    formInputs.forEach((form) => {
      if (form.name === "profile_img") {
        return;
      }
      payload.append(form.name, form.value!);
    });

    payload.append(
      FormField.profile_img.name,
      teacherPhotoRef.current?.files?.[0]!
    );

    axiosClient
      .post("/admin/teachers/add", payload)
      .then((data) => {
        if (data && data.status === 201) {
          formRef.current?.reset();
          addDialogMessages({
            message: "Teacher has been added successfully",
            messageType: "Successful"
          })
        }
      })
      .catch((err) => {
        const response = err.response;
        console.log(err.response.data);
        if (response && response.status === 422) {
          const errors = response.data.errors;
          console.log("errors", errors)
          const keys = Object.keys(errors);
          addDialogMessages({
            message: `You have enter ${keys.length} invalid input`,
            messageType: "Error",
          });
          keys.forEach((key) => {
            console.log(errors[key][0])
            formInputsReducer({
              type: "INVALID",
              name: key,
              feedbackMessage: errors[key].toString(),
            });
          });
          console.log(formInputs)
        }
      });
  };

  const handlerSelectImg = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      setProfileImage(reader.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleFormInput = (e: React.ChangeEvent<HTMLFormElement>) => {
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
        <Title>Add Teacher</Title>
        <Reminder>Required(*)</Reminder>

        <InputContainer>
          <FormSection>
            <SectionTitle>Teacher Info</SectionTitle>
            <InputRow>
              <InputItem>
                <Label htmlFor={FormField.first_name.name}>
                  {FormField.first_name.label}
                  <IsRequiredIndicator>
                    {FormField.first_name.isRequired ? "*" : ""}
                  </IsRequiredIndicator>
                  :
                </Label>
                <Input
                  type="text"
                  id={FormField.first_name.name}
                  name={FormField.first_name.name}
                  isInvalid={
                    getFormInput(FormField.first_name.name).isInvalid
                  }
                  required
                />
                <ValidationFeedback
                  isVisible={
                    getFormInput(FormField.first_name.name).isInvalid
                  }
                  isInvalid={
                    getFormInput(FormField.first_name.name).isInvalid
                  }
                >
                  {
                    getFormInput(FormField.first_name.name)
                      .feedbackMessage
                  }
                </ValidationFeedback>
              </InputItem>
              <InputItem>
                <Label htmlFor={FormField.last_name.name}>
                  {FormField.last_name.label}
                  <IsRequiredIndicator>
                    {FormField.last_name.isRequired ? "*" : ""}
                  </IsRequiredIndicator>
                  :
                </Label>
                <Input
                  type="text"
                  id={FormField.last_name.name}
                  name={FormField.last_name.name}
                  isInvalid={
                    getFormInput(FormField.last_name.name).isInvalid
                  }
                  required
                />
                <ValidationFeedback
                  isVisible={
                    getFormInput(FormField.last_name.name).isInvalid
                  }
                  isInvalid={
                    getFormInput(FormField.last_name.name).isInvalid
                  }
                >
                  {
                    getFormInput(FormField.last_name.name)
                      .feedbackMessage
                  }
                </ValidationFeedback>
              </InputItem>
            </InputRow>

            <InputRow>
              <InputItem>
                <Label htmlFor={FormField.gender.name}>
                  {FormField.gender.label}
                  <IsRequiredIndicator>
                    {FormField.gender.isRequired ? "*" : ""}
                  </IsRequiredIndicator>
                  :
                </Label>
                <Selection
                  id={FormField.gender.name}
                  name={FormField.gender.name}
                  isInvalid={
                    getFormInput(FormField.gender.name).isInvalid
                  }
                  required
                >
                  <Option value={""}>--Select Gender--</Option>
                  <Option value={"male"}>Male</Option>
                  <Option value={"female"}>Female</Option>
                </Selection>
                <ValidationFeedback
                  isVisible={
                    getFormInput(FormField.gender.name).isInvalid
                  }
                  isInvalid={
                    getFormInput(FormField.gender.name).isInvalid
                  }
                >
                  {
                    getFormInput(FormField.gender.name)
                      .feedbackMessage
                  }
                </ValidationFeedback>
              </InputItem>

              <InputItem>
                <Label htmlFor={FormField.dob.name}>
                  {FormField.dob.label}
                  <IsRequiredIndicator>
                    {FormField.dob.isRequired ? "*" : ""}
                  </IsRequiredIndicator>
                  :
                </Label>
                <Input
                  type="date"
                  id={FormField.dob.name}
                  name={FormField.dob.name}
                  isInvalid={
                    getFormInput(FormField.dob.name).isInvalid
                  }
                  required
                />
                <ValidationFeedback
                  isVisible={
                    getFormInput(FormField.dob.name).isInvalid
                  }
                  isInvalid={
                    getFormInput(FormField.dob.name).isInvalid
                  }
                >
                  {getFormInput(FormField.dob.name).feedbackMessage}
                </ValidationFeedback>
              </InputItem>
            </InputRow>
            <InputItem>
              <Label htmlFor={FormField.addr1.name}>
                {FormField.addr1.label}
                <IsRequiredIndicator>
                  {FormField.addr1.isRequired ? "*" : ""}
                </IsRequiredIndicator>
                :
              </Label>
              <Input
                type="text"
                name={FormField.addr1.name}
                id={FormField.addr1.name}
                isInvalid={
                  getFormInput(FormField.addr1.name).isInvalid
                }
                required={FormField.addr1.isRequired}
              />
              <ValidationFeedback
                isVisible={
                  getFormInput(FormField.addr1.name).isInvalid
                }
                isInvalid={
                  getFormInput(FormField.addr1.name).isInvalid
                }
              >
                {getFormInput(FormField.addr1.name).feedbackMessage}
              </ValidationFeedback>
            </InputItem>
            <InputItem>
              <Label htmlFor={FormField.addr2.name}>
                {FormField.addr2.label}
                <IsRequiredIndicator>
                  {FormField.addr2.isRequired ? "*" : ""}
                </IsRequiredIndicator>
                :
              </Label>
              <Input
                type="text"
                name={FormField.addr2.name}
                id={FormField.addr2.name}
                isInvalid={
                  getFormInput(FormField.addr2.name).isInvalid
                }
                required={
                  getFormInput(FormField.addr2.name).isInvalid
                }
              />
              <ValidationFeedback
                isVisible={
                  getFormInput(FormField.addr2.name).isInvalid
                }
                isInvalid={
                  getFormInput(FormField.addr2.name).isInvalid
                }
              >
                {getFormInput(FormField.addr2.name).feedbackMessage}
              </ValidationFeedback>
            </InputItem>
            <InputItem>
              <Label htmlFor={FormField.religion.name}>
                {FormField.religion.label}
                <IsRequiredIndicator>
                  {FormField.religion.isRequired ? "*" : ""}
                </IsRequiredIndicator>
                :
              </Label>
              <Input
                type="text"
                name={FormField.religion.name}
                id={FormField.religion.name}
                isInvalid={
                  getFormInput(FormField.religion.name).isInvalid
                }
              />
              <ValidationFeedback
                isVisible={
                  getFormInput(FormField.religion.name).isInvalid
                }
                isInvalid={
                  getFormInput(FormField.religion.name).isInvalid
                }
              >
                {
                  getFormInput(FormField.religion.name)
                    .feedbackMessage
                }
              </ValidationFeedback>
            </InputItem>
            <InputRow>
              <InputItem>
                <Label htmlFor={FormField.email.name}>
                  {FormField.email.label}
                  <IsRequiredIndicator>
                    {FormField.email.isRequired ? "*" : ""}
                  </IsRequiredIndicator>
                  :
                </Label>
                <Input
                  type="email"
                  id={FormField.email.name}
                  name={FormField.email.name}
                  isInvalid={
                    getFormInput(FormField.email.name).isInvalid
                  }
                  required={FormField.email.isRequired}
                />
                <ValidationFeedback
                  isVisible={
                    getFormInput(FormField.email.name).isInvalid
                  }
                  isInvalid={
                    getFormInput(FormField.email.name).isInvalid
                  }
                >
                  {getFormInput(FormField.email.name).feedbackMessage}
                </ValidationFeedback>
              </InputItem>
              <InputItem>
                <Label htmlFor={FormField.phone.name}>
                  {FormField.phone.label}
                  <IsRequiredIndicator>
                    {FormField.phone.isRequired ? "*" : ""}
                  </IsRequiredIndicator>
                  :
                </Label>
                <Input
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]+"
                  name={FormField.phone.name}
                  id={FormField.phone.name}
                  isInvalid={
                    getFormInput(FormField.phone.name).isInvalid
                  }
                  required
                />
                <ValidationFeedback
                  isVisible={
                    getFormInput(FormField.phone.name).isInvalid
                  }
                  isInvalid={
                    getFormInput(FormField.phone.name).isInvalid
                  }
                >
                  {getFormInput(FormField.phone.name).feedbackMessage}
                </ValidationFeedback>
              </InputItem>
            </InputRow>

            <InputRow>
              <InputItem>
                <Label htmlFor={FormField.password.name}>
                  {FormField.password.label}
                  <IsRequiredIndicator>
                    {FormField.password.isRequired ? "*" : ""}
                  </IsRequiredIndicator>
                  :
                </Label>
                <Input
                  type="password"
                  id={FormField.password.name}
                  name={FormField.password.name}
                  minLength={6}
                  isInvalid={
                    getFormInput(FormField.password.name).isInvalid
                  }
                  required
                />
                <ValidationFeedback
                  isVisible={
                    getFormInput(FormField.password.name).isInvalid
                  }
                  isInvalid={
                    getFormInput(FormField.password.name).isInvalid
                  }
                >
                  {getFormInput(FormField.password.name).isInvalid}
                </ValidationFeedback>
              </InputItem>
              <InputItem>
                <Label htmlFor={FormField.password_conf.name}>
                  {FormField.password_conf.label}
                  <IsRequiredIndicator>
                    {FormField.password_conf.isRequired ? "*" : ""}
                  </IsRequiredIndicator>
                  :
                </Label>
                <Input
                  type="password"
                  id={FormField.password_conf.name}
                  name={FormField.password_conf.name}
                  isInvalid={
                    getFormInput(FormField.password_conf.name)
                      .isInvalid
                  }
                  required
                />
                <ValidationFeedback
                  isVisible={
                    getFormInput(FormField.password_conf.name)
                      .isInvalid
                  }
                  isInvalid={
                    getFormInput(FormField.password_conf.name)
                      .isInvalid
                  }
                >
                  {
                    getFormInput(FormField.password_conf.name)
                      .feedbackMessage
                  }
                </ValidationFeedback>
              </InputItem>
            </InputRow>

            <InputRow>
              <InputItem>
                <Label htmlFor={FormField.class.name}>
                  {FormField.class.label}
                  <IsRequiredIndicator>
                    {FormField.class.isRequired ? "*" : ""}
                  </IsRequiredIndicator>
                  :
                </Label>
                <Selection
                  id={FormField.class.name}
                  name={FormField.class.name}
                  isInvalid={
                    getFormInput(FormField.class.name).isInvalid
                  }
                >
                  <Option value={""}>--Select Class--</Option>
                  <Option value={1}>I</Option>
                  <Option value={2}>II</Option>
                  <Option value={3}>III</Option>
                </Selection>
                <ValidationFeedback
                  isVisible={
                    getFormInput(FormField.class.name).isInvalid
                  }
                  isInvalid={
                    getFormInput(FormField.class.name).isInvalid
                  }
                >
                  {getFormInput(FormField.class.name).feedbackMessage}
                </ValidationFeedback>
              </InputItem>
              <InputItem>
                <Label htmlFor={FormField.admission_date.name}>
                  {FormField.admission_date.label}
                  <IsRequiredIndicator>
                    {FormField.admission_date.isRequired ? "*" : ""}
                  </IsRequiredIndicator>
                  :
                </Label>
                <Input
                  type="date"
                  id={FormField.admission_date.name}
                  name={FormField.admission_date.name}
                  isInvalid={
                    getFormInput(FormField.admission_date.name)
                      .isInvalid
                  }
                  required
                />
                <ValidationFeedback
                  isVisible={
                    getFormInput(FormField.admission_date.name)
                      .isInvalid
                  }
                  isInvalid={
                    getFormInput(FormField.admission_date.name)
                      .isInvalid
                  }
                >
                  {
                    getFormInput(FormField.admission_date.name)
                      .feedbackMessage
                  }
                </ValidationFeedback>
              </InputItem>
            </InputRow>
          </FormSection>

          <StudentImage>
            <Image
              src={profileImage.toString() || DefaultImg}
              alt="student_img"
            />

            <InputItem>
              <Label htmlFor={FormField.profile_img.name}>
                {FormField.profile_img.label}
              </Label>
              <Input
                ref={teacherPhotoRef}
                type="file"
                id={FormField.profile_img.name}
                name={FormField.profile_img.name}
                onInput={handlerSelectImg}
                accept="image/jpeg, image/png, image/jpg"
              />
              <ValidationFeedback
                isVisible={
                  getFormInput(FormField.profile_img.name).isInvalid
                }
                isInvalid={
                  getFormInput(FormField.profile_img.name).isInvalid
                }
              >
                {
                  getFormInput(FormField.profile_img.name)
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
};

export default AddTeacher;
