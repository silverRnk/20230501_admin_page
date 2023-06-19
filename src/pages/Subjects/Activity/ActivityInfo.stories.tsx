import { Meta, StoryObj } from "@storybook/react";
import ActivityInfo from "./ActivityInfo";
import { faker } from "@faker-js/faker";


const meta: Meta<typeof ActivityInfo> = {
  title: "Activity Info",
  component: ActivityInfo,
};

export default meta;
type Story = StoryObj<typeof ActivityInfo>;

export const Filled: Story = {
  args: {
    info: {
      title: "Pronoun",
      subject: "English1",
      grade: "Grade 1",
      section: faker.location.city(),
      dateOfSubmission: faker.date.anytime(),
      teacher: faker.person.fullName()
    },
    state: "Show"
  },
};



export const Loading: Story = {
  args: {
    info: {
      title: "Pronoun",
      subject: "English1",
      grade: "Grade 1",
      section: faker.location.city(),
      dateOfSubmission: faker.date.anytime(),
      teacher: faker.person.fullName()
    },
    state: "Loading"
  },
};
