import React, {
  createRef,
  useEffect,
  useReducer,
  useState,
} from "react";
import { PageContainer } from "../../compenents/style-components/PageStyleComponents";
import styled from "styled-components";
import {
  Form,
  FormReminder,
  FormSectionTitle,
  InputContainer,
  Input,
  InputRow,
  Label,
  ValidationFeedback,
  Option,
  Selection,
  ButtonContainer,
  FormSection,
  FormTitle,
  IsRequiredIndicator,
  Button,
  RadioContainer,
  RadioWrapper,
  RadioButton,
} from "../../compenents/forms/Forms";
import axiosClient from "../../utils/AxiosClient";
import { GradeLevels, Section } from "../Students/utils/interface";
import { formFieldsInitValue, formFieldsReducer } from "./reducer";
import { AddStudentLabels } from "./objects";

const Container = styled.div`
  display: grid;
  max-height: 100vh;
  justify-items: center;
  overflow-y: scroll;
  padding: 40px;
  background-color: ${(props) => props.theme.colors.background};
`;

const Registration = () => {
  const formRef = createRef<HTMLFormElement>();
  const sectionSelectionRef = createRef<HTMLSelectElement>();
  const studentPhotoRef = createRef<HTMLInputElement>();
  const [selectedGrade, setSelectedGrade] = useState("");
  const [studentImage, setStudentImage] = useState<
    string | ArrayBuffer | null
  >("");

  const [formInputs, formInputsReducer] = useReducer(
    formFieldsReducer,
    formFieldsInitValue
  );

  const [gradeLevelAndSections, setGradeLevelAndSections] = useState<
    GradeLevels[]
  >([]);
  const selectedGradeSections: Section[] =
    gradeLevelAndSections.find((gradeLevel) => {
      return gradeLevel.grade_level_id === selectedGrade;
    })?.sections ?? [];

  useEffect(() => {
    axiosClient
      .get("/admin/gradesAndSections")
      .then((data) => {
        setGradeLevelAndSections(
          data?.data?.data ?? ([] as GradeLevels[])
        );
        console.log(data?.data?.data);
      })
      .catch((err) => {
        const errorMessage = err;
        // addDialogMessages({
        //   message: errorMessage?.toString(),
        //   messageType: "Error",
        // });
      });
  }, []);

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

  const handlerFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    formInputsReducer({ type: "INVALID", name: "" });
    const payload = new FormData();

    formInputs.forEach((form) => {
      if (form.name === "std_photo") {
        return;
      }
      payload.append(form.name, form.value!);
    });
    // if (studentPhotoRef.current.files.length !== 0) {
    //   payload.append(
    //     AddStudentLabels.std_photo.name,
    //     studentPhotoRef.current?.files?.[0]!
    //   );
    // }

    axiosClient
      .post("/admin/add_student", payload)
      .then((data) => {
        if (data && data.status === 201) {
          //Notify user for successful
          resetForm();
          // addDialogMessages({
          //   message: "Student has been successfully added",
          //   messageType: "Successful",
          // });
        }
      })
      .catch((err) => {
        const response = err.response;
        console.log(err.response.data);
        if (response && response.status === 422) {
          const errors = response.data.errors;
          const errorKey = Object.keys(errors);

          //Notify user for invalid
          // addDialogMessages({
          //   message: `You have ${errorKey.length} input `,
          //   messageType: "Error",
          // });

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

  const resetForm = () => {
    formRef.current.reset();
    setStudentImage("");
  };

  const handleFormInput = (e) => {
    // if (e.target.name === "std_photo") {
    //   return;
    // }
    // formInputsReducer({
    //   type: "INPUT",
    //   name: e.target.name,
    //   value: e.target.value,
    // });
    // console.log(formInputs);
  };

  const handleGradeSelection = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    // sectionSelectionRef.current.value = "";
    // setSelectedGrade(e.target.value);
  };

  const getFormInput = (name: string) => {
    return formInputs.filter((form) => form.name === name)[0];
  };

  return (
    <Container>
      <PageContainer>
        <Form
          ref={formRef}
          onSubmit={handlerFormSubmit}
          onInput={handleFormInput}
          method="post"
        >
          <FormTitle>Enrollment Form</FormTitle>
          <FormReminder>Required(*)</FormReminder>
          <InputContainer>
            <FormSection>
              <FormSectionTitle>Student Info</FormSectionTitle>
              <InputRow columnCount={2}>
                <InputContainer>
                  <Label
                    htmlFor={AddStudentLabels.std_first_name.name}
                  >
                    {AddStudentLabels.std_first_name.label}
                    <IsRequiredIndicator>*</IsRequiredIndicator>:
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
                      getFormInput(
                        AddStudentLabels.std_first_name.name
                      ).isInvalid
                    }
                    required
                  />
                  <ValidationFeedback
                    isVisible={
                      getFormInput(
                        AddStudentLabels.std_first_name.name
                      ).isInvalid
                    }
                    isInvalid={
                      getFormInput(
                        AddStudentLabels.std_first_name.name
                      ).isInvalid
                    }
                  >
                    {
                      getFormInput(
                        AddStudentLabels.std_first_name.name
                      ).feedbackMessage
                    }
                  </ValidationFeedback>
                </InputContainer>
                <InputContainer>
                  <Label
                    htmlFor={AddStudentLabels.std_last_name.name}
                  >
                    {AddStudentLabels.std_last_name.label}
                    <IsRequiredIndicator>*</IsRequiredIndicator>:
                  </Label>
                  <Input
                    type="text"
                    id={AddStudentLabels.std_last_name.name}
                    name={AddStudentLabels.std_last_name.name}
                    isInvalid={
                      getFormInput(
                        AddStudentLabels.std_last_name.name
                      ).isInvalid
                    }
                    required
                  />
                  <ValidationFeedback
                    isVisible={
                      getFormInput(
                        AddStudentLabels.std_last_name.name
                      ).isInvalid
                    }
                    isInvalid={
                      getFormInput(
                        AddStudentLabels.std_last_name.name
                      ).isInvalid
                    }
                  >
                    {
                      getFormInput(
                        AddStudentLabels.std_last_name.name
                      ).feedbackMessage
                    }
                  </ValidationFeedback>
                </InputContainer>
              </InputRow>

              <InputRow columnCount={2}>
                <InputContainer>
                  <Label htmlFor={AddStudentLabels.std_gender.name}>
                    {AddStudentLabels.std_gender.label}
                    <IsRequiredIndicator>*</IsRequiredIndicator>:
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
                </InputContainer>

                <InputContainer>
                  <Label htmlFor={AddStudentLabels.std_dob.name}>
                    {AddStudentLabels.std_dob.label}
                    <IsRequiredIndicator>*</IsRequiredIndicator>:
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
                </InputContainer>
              </InputRow>
              <InputContainer>
                <Label htmlFor={AddStudentLabels.place_of_birth.name}>
                  {AddStudentLabels.place_of_birth.label}
                </Label>
                <Input
                  id={AddStudentLabels.place_of_birth.name}
                  name={AddStudentLabels.place_of_birth.name}
                  isInvalid={
                    getFormInput(AddStudentLabels.place_of_birth.name)
                      .isInvalid
                  }
                />
                <ValidationFeedback
                  isInvalid={
                    getFormInput(AddStudentLabels.place_of_birth.name)
                      .isInvalid
                  }
                  isVisible={
                    getFormInput(AddStudentLabels.place_of_birth.name)
                      .isInvalid
                  }
                >
                  {
                    getFormInput(AddStudentLabels.place_of_birth.name)
                      .feedbackMessage
                  }
                </ValidationFeedback>
              </InputContainer>
              <InputContainer>
                <Label htmlFor={AddStudentLabels.address.name}>
                  {AddStudentLabels.address.label}:
                </Label>
                <Input
                  type="text"
                  name={AddStudentLabels.address.name}
                  id={AddStudentLabels.address.name}
                  isInvalid={
                    getFormInput(AddStudentLabels.address.name)
                      .isInvalid
                  }
                />
                <ValidationFeedback
                  isVisible={
                    getFormInput(AddStudentLabels.address.name)
                      .isInvalid
                  }
                  isInvalid={
                    getFormInput(AddStudentLabels.address.name)
                      .isInvalid
                  }
                >
                  {
                    getFormInput(AddStudentLabels.address.name)
                      .feedbackMessage
                  }
                </ValidationFeedback>
              </InputContainer>
              <InputRow columnCount={2}>
                <InputContainer>
                  <Label>Enrollee Type</Label>
                  <RadioContainer>
                    <RadioWrapper>
                      <Label htmlFor="new_student">New</Label>
                      <RadioButton
                        id="new_student"
                        name="enrollee_type"
                        value={"new"}
                      />
                    </RadioWrapper>
                    <RadioWrapper>
                      <Label htmlFor="transferee_student">
                        Transferee
                      </Label>
                      <RadioButton
                        id="transferee_student"
                        name="enrollee_type"
                        value={"transferee"}
                      />
                    </RadioWrapper>
                    <RadioWrapper>
                      <Label htmlFor="old_student">Old</Label>
                      <RadioButton
                        id="old_student"
                        name="enrollee_type"
                        value={"old"}
                      />
                    </RadioWrapper>
                  </RadioContainer>
                  <ValidationFeedback
                    isInvalid
                    isVisible
                  ></ValidationFeedback>
                </InputContainer>
                <InputContainer>
                  <Label htmlFor={AddStudentLabels.prev_school.name}>
                    {AddStudentLabels.prev_school.label}
                    <IsRequiredIndicator>*</IsRequiredIndicator>:
                  </Label>
                  <Input
                    type="text"
                    id={AddStudentLabels.prev_school.name}
                    name={AddStudentLabels.prev_school.name}
                    isInvalid={
                      getFormInput(AddStudentLabels.prev_school.name)
                        .isInvalid
                    }
                    required
                  />
                  <ValidationFeedback
                    isVisible={
                      getFormInput(AddStudentLabels.prev_school.name)
                        .isInvalid
                    }
                    isInvalid={
                      getFormInput(AddStudentLabels.prev_school.name)
                        .isInvalid
                    }
                  >
                    {
                      getFormInput(AddStudentLabels.prev_school.name)
                        .isInvalid
                    }
                  </ValidationFeedback>
                </InputContainer>
              </InputRow>
              <InputRow columnCount={2}>
                <InputContainer>
                  <Label htmlFor={AddStudentLabels.std_grade.name}>
                    {AddStudentLabels.std_grade.label}
                    <IsRequiredIndicator>*</IsRequiredIndicator>:
                  </Label>
                  <Selection
                    id={AddStudentLabels.std_grade.name}
                    name={AddStudentLabels.std_grade.name}
                    isInvalid={
                      getFormInput(AddStudentLabels.std_grade.name)
                        .isInvalid
                    }
                    onChange={handleGradeSelection}
                  >
                    <Option value={""}>--Select Class--</Option>
                    {gradeLevelAndSections.map((gradeLevel) => {
                      return (
                        <Option value={gradeLevel.grade_level_id}>
                          {gradeLevel.grade_level}
                        </Option>
                      );
                    })}
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
                </InputContainer>
                <InputContainer>
                  <Label htmlFor={AddStudentLabels.std_email.name}>
                    {AddStudentLabels.std_email.label}
                    <IsRequiredIndicator>*</IsRequiredIndicator>:
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
                </InputContainer>
              </InputRow>

              <InputRow columnCount={2}>
                <InputContainer>
                  <Label htmlFor={AddStudentLabels.std_phone.name}>
                    {AddStudentLabels.std_phone.label}
                    <IsRequiredIndicator>*</IsRequiredIndicator>:
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
                </InputContainer>
                <InputContainer>
                  <Label htmlFor={AddStudentLabels.std_password.name}>
                    {AddStudentLabels.std_password.label}
                    <IsRequiredIndicator>*</IsRequiredIndicator>:
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
                </InputContainer>
              </InputRow>

              <InputRow columnCount={2}>
                <InputContainer>
                  <Label htmlFor={AddStudentLabels.std_passconf.name}>
                    {AddStudentLabels.std_passconf.label}
                    <IsRequiredIndicator>*</IsRequiredIndicator>:
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
                </InputContainer>
              </InputRow>
            </FormSection>

            <FormSection>
              <FormSectionTitle>Parent's Info</FormSectionTitle>
              <InputRow columnCount={2}>
                <InputContainer>
                  <Label htmlFor={AddStudentLabels.fth_name.name}>
                    {AddStudentLabels.fth_name.label}
                    <IsRequiredIndicator>*</IsRequiredIndicator>:
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
                </InputContainer>
                <InputContainer>
                  <Label
                    htmlFor={AddStudentLabels.fth_occupation.name}
                  >
                    {AddStudentLabels.fth_occupation.label}
                    <IsRequiredIndicator>*</IsRequiredIndicator>:
                  </Label>
                  <Input
                    type="text"
                    name={AddStudentLabels.fth_occupation.name}
                    id={AddStudentLabels.fth_occupation.name}
                    isInvalid={
                      getFormInput(
                        AddStudentLabels.fth_occupation.name
                      ).isInvalid
                    }
                    required
                  />
                  <ValidationFeedback
                    isVisible={
                      getFormInput(
                        AddStudentLabels.fth_occupation.name
                      ).isInvalid
                    }
                    isInvalid={
                      getFormInput(
                        AddStudentLabels.fth_occupation.name
                      ).isInvalid
                    }
                  >
                    {
                      getFormInput(
                        AddStudentLabels.fth_occupation.name
                      ).feedbackMessage
                    }
                  </ValidationFeedback>
                </InputContainer>
              </InputRow>

              <InputRow columnCount={2}>
                <InputContainer>
                  <Label htmlFor={AddStudentLabels.mth_name.name}>
                    {AddStudentLabels.mth_name.label}
                    <IsRequiredIndicator>*</IsRequiredIndicator>:
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
                </InputContainer>
                <InputContainer>
                  <Label
                    htmlFor={AddStudentLabels.mth_occupation.name}
                  >
                    {AddStudentLabels.mth_occupation.label}
                    <IsRequiredIndicator>*</IsRequiredIndicator>:
                  </Label>
                  <Input
                    type="text"
                    name={AddStudentLabels.mth_occupation.name}
                    id={AddStudentLabels.mth_occupation.name}
                    isInvalid={
                      getFormInput(
                        AddStudentLabels.mth_occupation.name
                      ).isInvalid
                    }
                    required
                  />
                  <ValidationFeedback
                    isVisible={
                      getFormInput(
                        AddStudentLabels.mth_occupation.name
                      ).isInvalid
                    }
                    isInvalid={
                      getFormInput(
                        AddStudentLabels.mth_occupation.name
                      ).isInvalid
                    }
                  >
                    {
                      getFormInput(
                        AddStudentLabels.mth_occupation.name
                      ).feedbackMessage
                    }
                  </ValidationFeedback>
                </InputContainer>
              </InputRow>

              <InputRow columnCount={2}>
                <InputContainer>
                  <Label htmlFor={AddStudentLabels.prn_email.name}>
                    {AddStudentLabels.prn_email.label}
                    <IsRequiredIndicator>*</IsRequiredIndicator>:
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
                </InputContainer>
                <InputContainer>
                  <Label htmlFor={AddStudentLabels.prn_phone.name}>
                    {AddStudentLabels.prn_phone.label}
                    <IsRequiredIndicator>*</IsRequiredIndicator>:
                  </Label>
                  <Input
                    pattern="[0-9]*"
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
                </InputContainer>
              </InputRow>
            </FormSection>

            <FormSection>
              <FormSectionTitle>Required Documents</FormSectionTitle>

              <InputContainer>
                <Label>Good Moral</Label>
                <Input type="file" isInvalid={false}></Input>
              </InputContainer>
              <InputContainer>
                <Label>Form 138</Label>
                <Input type="file" isInvalid={false}></Input>
              </InputContainer>
              <InputContainer>
                <Label>Birth Cert</Label>
                <Input type="file" isInvalid={false}></Input>
              </InputContainer>
            </FormSection>
            {/* <StudentImage>
              <Image
                src={studentImage.toString() || DefaultImg}
                alt="student_img"
              />

              <InputContainer>
                <Label htmlFor={AddStudentLabels.std_photo.name}>
                  {AddStudentLabels.std_photo.label}
                </Label>
                <Input
                  ref={studentPhotoRef}
                  type="file"
                  style={{ border: "unset" }}
                  isInvalid={
                    getFormInput(AddStudentLabels.std_photo.name)
                      .isInvalid
                  }
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
              </InputContainer>
            </StudentImage> */}
          </InputContainer>
          <ButtonContainer>
            <Button type="submit">Submit</Button>
            <Button type="reset">Reset</Button>
          </ButtonContainer>
        </Form>
      </PageContainer>
    </Container>
  );
};

export default Registration;
