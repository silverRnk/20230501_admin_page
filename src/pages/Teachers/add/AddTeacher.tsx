// @ts-ignore

import React, { FormEventHandler, createRef, useState } from "react";
import styled from "styled-components";
import DefaultImg from "../../../assets/profile_default.svg";
import axiosClient from "../../../utils/AxiosClient";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import TimeLimitedDialog from "../../../compenents/TimeLimitedDialog";
import {
  AddStudentProps,
  FormValidationFeedback,
} from "../utils/interface";
import { useFormFeedback } from "../utils/CustomHooks";
import { AddTeacherLabels } from "../utils/FormInputNames";

const Container = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: white;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 2rem;
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
  font-weight: 400;
  font-size: 1.5rem;
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
  background-color: red;
  background-color: #${(props) => props.type === "reset" && "2A5B84"};
  margin-right: 20px;
`;

const IsRequired = (isRequired: boolean) => {
  return (
    <IsRequiredIndicator>{isRequired ? "*" : ""}</IsRequiredIndicator>
  );
};

const AddTeacher = () => {
  const formRef = createRef<HTMLFormElement>();
  //Input Ref
  const firstNameRef = createRef<HTMLInputElement>();
  const lastNameRef = createRef<HTMLInputElement>();
  const genderRef = createRef<HTMLSelectElement>();
  const dateOfBirthRef = createRef<HTMLInputElement>();
  const stdReligionRef = createRef<HTMLInputElement>();
  const cpNumberRef = createRef<HTMLInputElement>();
  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  const passwordConfirmationRef = createRef<HTMLInputElement>();
  const classRef = createRef<HTMLSelectElement>();
  const sectionRef = createRef<HTMLSelectElement>();
  const studentPhotoRef = createRef<HTMLInputElement>();


  //Form Feedback
  const [firstNameFeedback, setFirstNameFeedback] = useFormFeedback();
  const [lastNameFeedback, setLastNameFeedback] = useFormFeedback();
  const [genderFeedback, setGenderFeedback] = useFormFeedback();
  const [dobFeedback, setDOBFeedback] = useFormFeedback();
  const [stdReligionFeedback, setStdReligionFeedback] =
    useFormFeedback();
  const [stdEmailFeedback, setStdEmailFeedback] = useFormFeedback();
  const [stdPhoneFeedback, setStdPhoneFeedback] = useFormFeedback();
  const [passwordFeedback, setPasswordFeedback] = useFormFeedback();
  const [
    passwordConfirmationFeedback,
    setPasswordConfirmationFeedback,
  ] = useFormFeedback();
  const [gradeFeedback, setGradeFeedback] = useFormFeedback();
  const [sectionFeedback, setSectionFeedback] = useFormFeedback();

  const [fathersNameFeedback, setFathersNameFeedback] =
    useFormFeedback();
  const [mothersNameFeedback, setMothersNameFeedback] =
    useFormFeedback();
  const [fathersOccupationFeedback, setFathersOccupationFeedback] =
    useFormFeedback();
  const [parentsReligionFeedback, setParentsReligionFeedback] =
    useFormFeedback();
  const [parentsEmailFeedback, setParentsEmailFeedback] =
    useFormFeedback();
  const [parentsPhoneFeedback, setParentsPhoneFeedback] =
    useFormFeedback();
  const [studentPhotoFeedback, setStudentPhotoFeedback] =
    useFormFeedback();

  const [studentImage, setStudentImage] = useState<
    string | ArrayBuffer | null
  >("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({});
  const FormField = AddTeacherLabels;

  const handlerForm = (e: any) => {
    e.preventDefault();
    resetForm(e);
    const payload = new FormData();
    payload.append(
      FormField.first_name.name,
      firstNameRef.current?.value ?? ""
    );
    payload.append(
      FormField.last_name.name,
      lastNameRef.current?.value ?? ""
    );
    payload.append(FormField.gender.name, genderRef.current?.value!);
    payload.append(
      FormField.dob.name,
      dateOfBirthRef.current?.value!
    );
    payload.append(
      FormField.religion.name,
      stdReligionRef.current?.value!
    );
    payload.append(FormField.email.name, emailRef.current?.value!);
    payload.append(FormField.phone.name, cpNumberRef.current?.value!);
    payload.append(
      FormField.password.name,
      passwordRef.current?.value!
    );
    payload.append(
      FormField.password_conf.name,
      passwordConfirmationRef.current?.value!
    );
    payload.append(
      FormField.profile_img.name,
      studentPhotoRef.current?.files?.[0]!
    );
    console.log(payload);
    // const payload = {
    //   first_name: firstNameRef.current?.value,
    //   last_name: lastNameRef.current?.value,
    //   gender: genderRef.current?.value,
    //   date_of_birth: dateOfBirthRef.current?.value,
    //   parents_guardian: parentsGuardianRef.current?.value,
    //   cp_number: cpNumberRef.current?.value,
    //   Email: emailRef.current?.value,
    //   Password: passwordRef.current?.value,
    //   Password_confirmation:
    //     passwordConfirmationRef.current?.value,
    //   class: classRef.current?.value,
    //   photo: null,
    // };

    axiosClient
      .post("/admin/add_student", payload)
      .then((data) => {
        if (data && data.status === 201) {
          console.log(data.data);
          setMessage(data.data);
          setOpen(true);
        }
      })
      .catch((err) => {
        const response = err.response;
        console.log(err.response.data);
        if (response && response.status === 422) {
          setMessage(response.data.message);
          setOpen(true);
          const errors = response.data.errors;
          Object.keys(errors).forEach((key) => {
            switch (key) {
              case FormField.first_name.name:
                setFirstNameFeedback({
                  isInvalid: true,
                  isVisible: true,
                  message: errors[key],
                });
                break;
              case FormField.last_name.name:
                setLastNameFeedback({
                  isInvalid: true,
                  isVisible: true,
                  message: errors[key],
                });
                break;
              case FormField.gender.name:
                setGenderFeedback({
                  isInvalid: true,
                  isVisible: true,
                  message: errors[key],
                });
                break;
              case FormField.password.name:
                setPasswordFeedback({
                  isInvalid: true,
                  isVisible: true,
                  message: errors[key],
                });
                break;

              case FormField.password_conf.name:
                setPasswordConfirmationFeedback({
                  isInvalid: true,
                  isVisible: true,
                  message: errors[key],
                });
                break;
              case FormField.profile_img.name:
                setStdPhoneFeedback({
                  isInvalid: true,
                  isVisible: true,
                  message: errors[key],
                });
                break;
              default:
                break;
            }
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

  const handleTimeOut = () => {
    setOpen(false);
  };

  const handleFormInput = (e) => {};

  return (
    <Container>
      <TimeLimitedDialog
        open={open}
        onTimeOut={handleTimeOut}
        duration={1500}
      >
        {Object.keys(message).map((key) => (
          <p key={key}>{message[key][0]}</p>
        ))}
      </TimeLimitedDialog>
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
            <InputItem>
              <Label htmlFor={FormField.first_name.name}>
                {FormField.first_name.label}
                <IsRequiredIndicator>
                  {FormField.first_name.isRequired ? "*" : ""}
                </IsRequiredIndicator>
                :
              </Label>
              <Input
                ref={firstNameRef}
                type="text"
                id={FormField.first_name.name}
                name={FormField.first_name.name}
                isInvalid={firstNameFeedback.isInvalid}
                required
              />
              <ValidationFeedback
                isVisible={firstNameFeedback.isVisible}
                isInvalid={firstNameFeedback.isInvalid}
              >
                {firstNameFeedback.message}
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
                ref={lastNameRef}
                type="text"
                id={FormField.last_name.name}
                name={FormField.last_name.name}
                isInvalid={lastNameFeedback.isInvalid}
                required
              />
              <ValidationFeedback
                isVisible={lastNameFeedback.isVisible}
                isInvalid={lastNameFeedback.isInvalid}
              >
                {lastNameFeedback.message}
              </ValidationFeedback>
            </InputItem>
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
                  ref={genderRef}
                  id={FormField.gender.name}
                  name={FormField.gender.name}
                  isInvalid={genderFeedback.isInvalid}
                  required
                >
                  <Option value={""}>--Select Gender--</Option>
                  <Option value={"male"}>Male</Option>
                  <Option value={"female"}>Female</Option>
                </Selection>
                <ValidationFeedback
                  isVisible={genderFeedback.isVisible}
                  isInvalid={genderFeedback.isInvalid}
                >
                  first name is required
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
                  ref={dateOfBirthRef}
                  type="date"
                  id={FormField.dob.name}
                  name={FormField.dob.name}
                  isInvalid={dobFeedback.isInvalid}
                  required
                />
                <ValidationFeedback
                  isVisible={dobFeedback.isVisible}
                  isInvalid={dobFeedback.isInvalid}
                >
                  {dobFeedback.message}
                </ValidationFeedback>
              </InputItem>
            </InputRow>
            <InputItem>
              <Label htmlFor={FormField.religion.name}>
                {FormField.religion.label}
                <IsRequiredIndicator>
                  {FormField.religion.isRequired ? "*" : ""}
                </IsRequiredIndicator>
                :
              </Label>
              <Input
                ref={stdReligionRef}
                type="text"
                name={FormField.religion.name}
                id={FormField.religion.name}
                isInvalid={stdReligionFeedback.isInvalid}
                required
              />
              <ValidationFeedback
                isVisible={stdReligionFeedback.isInvalid}
                isInvalid={stdReligionFeedback.isInvalid}
              >
                {stdReligionFeedback.message}
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
                  ref={emailRef}
                  type="email"
                  id={FormField.email.name}
                  name={FormField.email.name}
                  isInvalid={stdEmailFeedback.isInvalid}
                  required={FormField.email.isRequired}
                />
                <ValidationFeedback
                  isVisible={stdEmailFeedback.isVisible}
                  isInvalid={stdEmailFeedback.isInvalid}
                >
                  {stdEmailFeedback.message}
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
                  ref={cpNumberRef}
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]+"
                  name={FormField.phone.name}
                  id={FormField.phone.name}
                  isInvalid={stdPhoneFeedback.isInvalid}
                  required
                />
                <ValidationFeedback
                  isVisible={stdPhoneFeedback.isVisible}
                  isInvalid={stdPhoneFeedback.isInvalid}
                >
                  {stdPhoneFeedback.message}
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
                  ref={passwordRef}
                  type="password"
                  id={FormField.password.name}
                  name={FormField.password.name}
                  minLength={6}
                  isInvalid={passwordFeedback.isInvalid}
                  required
                />
                <ValidationFeedback
                  isVisible={passwordFeedback.isVisible}
                  isInvalid={passwordFeedback.isVisible}
                >
                  {passwordFeedback.message}
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
                  ref={passwordConfirmationRef}
                  type="password"
                  id={FormField.password_conf.name}
                  name={FormField.password_conf.name}
                  isInvalid={passwordConfirmationFeedback.isInvalid}
                  required
                />
                <ValidationFeedback
                  isVisible={passwordConfirmationFeedback.isVisible}
                  isInvalid={passwordConfirmationFeedback.isInvalid}
                >
                  {passwordConfirmationFeedback.message}
                </ValidationFeedback>
              </InputItem>
            </InputRow>

            {/* <InputRow>
              <InputItem>
                <Label htmlFor={FormField.grade.name}>
                  {FormField.grade.label}*:
                </Label>
                <Selection
                  ref={classRef}
                  id={FormField.grade.name}
                  name={FormField.grade.name}
                  isInvalid={gradeFeedback.isInvalid}
                  required
                >
                  <Option value={""}>--Select Class--</Option>
                  <Option value={1}>I</Option>
                  <Option value={2}>II</Option>
                  <Option value={3}>III</Option>
                </Selection>
                <ValidationFeedback
                  isVisible={gradeFeedback.isVisible}
                  isInvalid={gradeFeedback.isInvalid}
                >
                  {gradeFeedback.message}
                </ValidationFeedback>
              </InputItem>
              <InputItem>
                <Label htmlFor={FormField.section.name}>
                  {FormField.section.label}*:
                </Label>
                <Selection
                  ref={sectionRef}
                  id={FormField.section.name}
                  name={FormField.section.name}
                  isInvalid={sectionFeedback.isInvalid}
                  required
                >
                  <Option value={""}> --Select Section-- </Option>
                  <Option value={1}>Acacia</Option>
                  <Option value={2}>Nara</Option>
                  <Option value={3}>Kawayan</Option>
                </Selection>
                <ValidationFeedback
                  isVisible={sectionFeedback.isVisible}
                  isInvalid={sectionFeedback.isInvalid}
                >
                  {sectionFeedback.message}
                </ValidationFeedback>
              </InputItem>
            </InputRow> */}
          </FormSection>

          <StudentImage>
            <Image
              src={studentImage || DefaultImg}
              alt="student_img"
            />

            <InputItem>
              <Label htmlFor={FormField.profile_img.name}>
                {FormField.profile_img.label}
              </Label>
              <Input
                ref={studentPhotoRef}
                type="file"
                id={FormField.profile_img.name}
                name={FormField.profile_img.name}
                onInput={handlerSelectImg}
                accept="image/jpeg"
              />
              <ValidationFeedback
                isVisible={studentPhotoFeedback.isVisible}
                isInvalid={studentPhotoFeedback.isInvalid}
              >
                {studentPhotoFeedback.message}
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
