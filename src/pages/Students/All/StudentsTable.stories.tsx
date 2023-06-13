import { Meta, StoryObj } from "@storybook/react";
import StudentsTable from "./StudentsTable";
import Theme from "../../../Theme";
import { faker } from "@faker-js/faker";

const meta: Meta<typeof StudentsTable> = {
  title: "Students Table",
  component: StudentsTable,
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StudentsTable>;

export const empty: Story = {
  args: {
    data: [],
    isLoading: false,
  },
};

let students = [];
for (let i = 0; i < 5; i++) {
  students.push({
    std_id: faker.string.alphanumeric({ length: 8, casing: "upper" }),
    std_name: faker.person.fullName(),
    std_gender: faker.helpers.arrayElement(["Male", "Female"]),
    std_date_of_birth: faker.date
      .birthdate({ min: 15, max: 25 })
      .toLocaleDateString(),
    std_grade: faker.helpers.arrayElement([
      "Grade1",
      "Grade2",
      "Grade3",
    ]),
    std_section: faker.location.city(),
    std_status: faker.helpers.arrayElement([
      "old",
      "new",
      "transferee",
    ]),
    parents_phone: faker.phone.number(),
  });
}

export const loading: Story = {
  args: {
    data: [...students],
    isLoading: true,
  },
};

export const filled: Story = {
  args: {
    data: [...students],
    isLoading: false,
  },
};
