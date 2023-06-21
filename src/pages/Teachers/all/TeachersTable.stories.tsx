import { Meta, StoryObj } from "@storybook/react";
import TeachersTable from "./TeachersTable";
import { EmptyArrayGenerator } from "../../../utils/ArrayGenerator";
import { faker } from "@faker-js/faker";
import { TeacherProfileShort } from "../utils/interface";
import Theme from "../../../Theme";

const meta: Meta<typeof TeachersTable> = {
  title: "Teachers Table",
  component: TeachersTable,
  decorators: [
    (Story) => (
        <Theme>
            <Story/>
        </Theme>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof TeachersTable>;

export const Empty: Story = {
  args: {
    data: [],
    isLoading: false,
  },
};

const teachers: Array<TeacherProfileShort> = EmptyArrayGenerator(
  5
).map(() => ({
  teacher_id: faker.string.alphanumeric({ length: 8 }),
  teacher_name: faker.person.fullName(),
  teacher_address: faker.location.secondaryAddress(),
  teacher_gender: faker.helpers.arrayElement(["Male"]),
  teacher_advisory_class: faker.helpers.arrayElement(["", "class1", "class2"]),
  teacher_dob: faker.date
    .birthdate({ min: 20, max: 65 })
    .toLocaleDateString(),
  teacher_phone: faker.phone.number(),
}));

export const Loading: Story = {
  args: {
    data: [...teachers],
    isLoading: true,
  },
};

export const Filled: Story = {
  args: {
    data: [...teachers],
    isLoading: false,
  },
};
