import type { Meta, StoryObj } from "@storybook/react";

//component
import GradesTable from "./GradesTable";
import { Grade } from "../utils/interfaces";

const meta: Meta<typeof GradesTable> = {
  title: "Grades",
  component: GradesTable,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof GradesTable>;

const grades: Array<Grade> = [
    {subject: "English", q1: 100, q2: 100},
    {subject: "Math"},
    {subject: "Science"}
]

export const Filled: Story = {
  args: {
    grades: grades,
    year: 2019
  }
};
