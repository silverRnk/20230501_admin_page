import { Meta, StoryObj } from "@storybook/react";
import StudentDetails from "./StudentDetails";

const meta: Meta<typeof StudentDetails> = {
  title: "Student Details",
  component: StudentDetails,
};

export default meta;
type Story = StoryObj<typeof StudentDetails>;

export const Empty: Story = {
  args: {
    data: null,
    isLoading: false,
  },
};

export const Filled1: Story = {
  args: {
    data: {
      id_number: 1111,
      admission_date: "2022-06-03",
      class: "2",
      date_of_birth: "2222",
      e_mail: "email",
      father_name: "name",
      father_occupation: "occupation",
      gender: "Male",
      mother_name: "name",
      name: "name",
      religion: 'religion',
      section: "section",
      status: "Old",
      profile_img: ""

    },
    isLoading: false,
  },
};

export const Loading: Story = {
    args: {
      data: {
        id_number: 1111,
        admission_date: "2022-06-03",
        class: "2",
        date_of_birth: "2222",
        e_mail: "email",
        father_name: "name",
        father_occupation: "occupation",
        gender: "Male",
        mother_name: "name",
        name: "name",
        religion: 'religion',
        section: "section",
        status: "Old",
        profile_img: ""
  
      },
      isLoading: true,
    },
  };
