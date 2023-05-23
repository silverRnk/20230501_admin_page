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
import { AddStudentLabels } from "../utils/FormInputNames";

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
  background-color: red;
  background-color: #${(props) => props.type === "reset" && "2A5B84"};
  margin-right: 20px;
`;

function AddStudent() {
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

  const fathersNameRef = createRef<HTMLInputElement>();
  const mothersNameRef = createRef<HTMLInputElement>();
  const fathersOccupationRef = createRef<HTMLInputElement>();
  const parentsReligionRef = createRef<HTMLInputElement>();
  const parentsEmailRef = createRef<HTMLInputElement>();
  const parentsPhoneRef = createRef<HTMLInputElement>();

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

  const handlerForm = (e: any) => {
    e.preventDefault();
    resetForm(e);
    const payload = new FormData();
    payload.append(
      AddStudentLabels.std_first_name.name,
      firstNameRef.current?.value ?? ""
    );
    payload.append(
      AddStudentLabels.std_last_name.name,
      lastNameRef.current?.value ?? ""
    );
    payload.append(
      AddStudentLabels.std_gender.name,
      genderRef.current?.value!
    );
    payload.append(
      AddStudentLabels.std_dob.name,
      dateOfBirthRef.current?.value!
    );
    payload.append(
      AddStudentLabels.std_religion.name,
      stdReligionRef.current?.value!
    );
    payload.append(
      AddStudentLabels.std_email.name,
      emailRef.current?.value!
    );
    payload.append(
      AddStudentLabels.std_phone.name,
      cpNumberRef.current?.value!
    );
    payload.append(
      AddStudentLabels.std_password.name,
      passwordRef.current?.value!
    );
    payload.append(
      AddStudentLabels.std_passconf.name,
      passwordConfirmationRef.current?.value!
    );
    payload.append(
      AddStudentLabels.std_grade.name,
      classRef.current?.value!
    );
    payload.append(
      AddStudentLabels.std_section.name,
      sectionRef.current?.value!
    );
    payload.append(
      AddStudentLabels.fth_name.name,
      fathersNameRef.current?.value!
    );
    payload.append(
      AddStudentLabels.mth_name.name,
      mothersNameRef.current?.value!
    );
    payload.append(
      AddStudentLabels.fth_occupation.name,
      fathersOccupationRef.current?.value!
    );
    payload.append(
      AddStudentLabels.prn_religion.name,
      parentsReligionRef.current?.value!
    );
    payload.append(
      AddStudentLabels.prn_email.name,
      parentsEmailRef.current?.value!
    );
    payload.append(
      AddStudentLabels.prn_phone.name,
      parentsPhoneRef.current?.value!
    );
    payload.append(
      AddStudentLabels.std_photo.name,
      studentPhotoRef.current?.files?.[0]!
    );
    console.log(payload);
    // const payload = {
    //   std_first_name: firstNameRef.current?.value,
    //   std_last_name: lastNameRef.current?.value,
    //   std_gender: genderRef.current?.value,
    //   std_date_of_birth: dateOfBirthRef.current?.value,
    //   std_parents_guardian: parentsGuardianRef.current?.value,
    //   std_cp_number: cpNumberRef.current?.value,
    //   std_Email: emailRef.current?.value,
    //   std_Password: passwordRef.current?.value,
    //   std_Password_confirmation:
    //     passwordConfirmationRef.current?.value,
    //   std_class: classRef.current?.value,
    //   std_photo: null,
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
              case AddStudentLabels.std_first_name.name:
                setFirstNameFeedback({
                  isInvalid: true,
                  isVisible: true,
                  message: errors[key],
                });
                break;
              case AddStudentLabels.std_last_name.name:
                setLastNameFeedback({
                  isInvalid: true,
                  isVisible: true,
                  message: errors[key],
                });
                break;
              case AddStudentLabels.std_gender.name:
                setGenderFeedback({
                  isInvalid: true,
                  isVisible: true,
                  message: errors[key],
                });
                break;
              case AddStudentLabels.std_first_name.name:
                setFirstNameFeedback({
                  isInvalid: true,
                  isVisible: true,
                  message: errors[key],
                });
                break;
              case AddStudentLabels.std_password.name:
                setPasswordFeedback({
                  isInvalid: true,
                  isVisible: true,
                  message: errors[key],
                });
                break;

              case AddStudentLabels.std_passconf.name:
                setPasswordConfirmationFeedback({
                  isInvalid: true,
                  isVisible: true,
                  message: errors[key],
                });
                break;
              case AddStudentLabels.std_photo.name:
                setStdPhoneFeedback({
                  isInvalid: true,
                  isVisible: true,
                  message: errors[key]
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
                ref={firstNameRef}
                type="text"
                id={AddStudentLabels.std_first_name.name}
                name={AddStudentLabels.std_first_name.name}
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
              <Label htmlFor={AddStudentLabels.std_last_name.name}>
                {AddStudentLabels.std_last_name.label}*:
              </Label>
              <Input
                ref={lastNameRef}
                type="text"
                id={AddStudentLabels.std_last_name.name}
                name={AddStudentLabels.std_last_name.name}
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
                <Label htmlFor={AddStudentLabels.std_gender.name}>
                  {AddStudentLabels.std_gender.label}*:
                </Label>
                <Selection
                  ref={genderRef}
                  id={AddStudentLabels.std_gender.name}
                  name={AddStudentLabels.std_gender.name}
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
                <Label htmlFor={AddStudentLabels.std_dob.name}>
                  {AddStudentLabels.std_dob.label}*
                </Label>
                <Input
                  ref={dateOfBirthRef}
                  type="date"
                  id={AddStudentLabels.std_dob.name}
                  name={AddStudentLabels.std_dob.name}
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
              <Label htmlFor={AddStudentLabels.std_religion.name}>
                {AddStudentLabels.std_religion.label}*:
              </Label>
              <Input
                ref={stdReligionRef}
                type="text"
                name={AddStudentLabels.std_religion.name}
                id={AddStudentLabels.std_religion.name}
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
                <Label htmlFor={AddStudentLabels.std_email.name}>
                  {AddStudentLabels.std_email.label}*:
                </Label>
                <Input
                  ref={emailRef}
                  type="email"
                  id={AddStudentLabels.std_email.name}
                  name={AddStudentLabels.std_email.name}
                  isInvalid={stdEmailFeedback.isInvalid}
                  required
                />
                <ValidationFeedback
                  isVisible={stdEmailFeedback.isVisible}
                  isInvalid={stdEmailFeedback.isInvalid}
                >
                  {stdEmailFeedback.message}
                </ValidationFeedback>
              </InputItem>
              <InputItem>
                <Label htmlFor={AddStudentLabels.std_phone.name}>
                  {AddStudentLabels.std_phone.label}*:
                </Label>
                <Input
                  ref={cpNumberRef}
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]+"
                  name={AddStudentLabels.std_phone.name}
                  id={AddStudentLabels.std_phone.name}
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
                <Label htmlFor={AddStudentLabels.std_password.name}>
                  {AddStudentLabels.std_password.label}*:
                </Label>
                <Input
                  ref={passwordRef}
                  type="password"
                  id={AddStudentLabels.std_password.name}
                  name={AddStudentLabels.std_password.name}
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
                <Label htmlFor={AddStudentLabels.std_passconf.name}>
                  {AddStudentLabels.std_passconf.label}*:
                </Label>
                <Input
                  ref={passwordConfirmationRef}
                  type="password"
                  id={AddStudentLabels.std_passconf.name}
                  name={AddStudentLabels.std_passconf.name}
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

            <InputRow>
              <InputItem>
                <Label htmlFor={AddStudentLabels.std_grade.name}>
                  {AddStudentLabels.std_grade.label}*:
                </Label>
                <Selection
                  ref={classRef}
                  id={AddStudentLabels.std_grade.name}
                  name={AddStudentLabels.std_grade.name}
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
                <Label htmlFor={AddStudentLabels.std_section.name}>
                  {AddStudentLabels.std_section.label}*:
                </Label>
                <Selection
                  ref={sectionRef}
                  id={AddStudentLabels.std_section.name}
                  name={AddStudentLabels.std_section.name}
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
            </InputRow>
          </FormSection>

          <FormSection>
            <SectionTitle>Parent's Info</SectionTitle>
            <InputItem>
              <Label htmlFor={AddStudentLabels.fth_name.name}>
                {AddStudentLabels.fth_name.label}*:
              </Label>
              <Input
                ref={fathersNameRef}
                type="text"
                name={AddStudentLabels.fth_name.name}
                id={AddStudentLabels.fth_name.name}
                isInvalid={fathersNameFeedback.isInvalid}
                required
              />
              <ValidationFeedback
                isVisible={fathersNameFeedback.isVisible}
                isInvalid={fathersNameFeedback.isInvalid}
              >
                {fathersNameFeedback.message}
              </ValidationFeedback>
            </InputItem>
            <InputItem>
              <Label htmlFor={AddStudentLabels.mth_name.name}>
                {AddStudentLabels.mth_name.label}*:
              </Label>
              <Input
                ref={mothersNameRef}
                type="text"
                name={AddStudentLabels.mth_name.name}
                id={AddStudentLabels.mth_name.name}
                required
              />
              <ValidationFeedback
                isVisible={mothersNameFeedback.isVisible}
                isInvalid={mothersNameFeedback.isInvalid}
              >
                {mothersNameFeedback.message}
              </ValidationFeedback>
            </InputItem>
            <InputItem>
              <Label htmlFor={AddStudentLabels.fth_occupation.name}>
                {AddStudentLabels.fth_occupation.label}*:
              </Label>
              <Input
                ref={fathersOccupationRef}
                type="text"
                name={AddStudentLabels.fth_occupation.name}
                id={AddStudentLabels.fth_occupation.name}
                isInvalid={fathersOccupationFeedback.isInvalid}
                required
              />
              <ValidationFeedback
                isVisible={fathersOccupationFeedback.isVisible}
                isInvalid={fathersOccupationFeedback.isInvalid}
              >
                {fathersOccupationFeedback.message}
              </ValidationFeedback>
            </InputItem>

            <InputItem>
              <Label htmlFor={AddStudentLabels.prn_religion.name}>
                {AddStudentLabels.prn_religion.label}*:
              </Label>
              <Input
                ref={parentsReligionRef}
                type="text"
                name={AddStudentLabels.prn_religion.name}
                id={AddStudentLabels.prn_religion.name}
                isInvalid={parentsReligionFeedback.isInvalid}
                required
              />
              <ValidationFeedback
                isVisible={parentsReligionFeedback.isVisible}
                isInvalid={parentsReligionFeedback.isInvalid}
              >
                {parentsReligionFeedback.message}
              </ValidationFeedback>
            </InputItem>
            <InputItem>
              <Label htmlFor={AddStudentLabels.prn_email.name}>
                {AddStudentLabels.prn_email.label}*:
              </Label>
              <Input
                ref={parentsEmailRef}
                type="email"
                name={AddStudentLabels.prn_email.name}
                id={AddStudentLabels.prn_email.name}
                isInvalid={parentsEmailFeedback.isInvalid}
                required
              />
              <ValidationFeedback
                isVisible={parentsEmailFeedback.isVisible}
                isInvalid={parentsEmailFeedback.isInvalid}
              >
                {parentsEmailFeedback.message}
              </ValidationFeedback>
            </InputItem>
            <InputItem>
              <Label htmlFor={AddStudentLabels.prn_phone.name}>
                {AddStudentLabels.prn_phone.label}*:
              </Label>
              <Input
                ref={parentsPhoneRef}
                type="number"
                name={AddStudentLabels.prn_phone.name}
                id={AddStudentLabels.prn_phone.name}
                required
              />
              <ValidationFeedback
                isVisible={parentsPhoneFeedback.isVisible}
                isInvalid={parentsPhoneFeedback.isInvalid}
              >
                {parentsPhoneFeedback.message}
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
}

export default AddStudent;
