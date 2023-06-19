import type { Meta, StoryObj } from "@storybook/react";

//component
import GradesTable from "./GradesTable";
import { Grade } from "../../../utils/interfaces";
import Theme from "../../../Theme";

const meta: Meta<typeof GradesTable> = {
  title: "Grades",
  component: GradesTable,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Theme>
        <Story/>
      </Theme>
    ),
  ]
};

export default meta;
type Story = StoryObj<typeof GradesTable>;

const grades: Array<Grade> = [
    {subject: "English", q1: 100, q2: 100, remarks: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Condimentum vitae sapien pellentesque habitant. Sem et tortor consequat id porta nibh. Magna etiam tempor orci eu lobortis elementum nibh tellus. Nec sagittis aliquam malesuada bibendum arcu. Morbi tristique senectus et netus. Neque egestas congue quisque egestas diam in arcu. Quis enim lobortis scelerisque fermentum dui faucibus in ornare. Vitae tortor condimentum lacinia quis vel eros donec ac odio. Tempor id eu nisl nunc mi. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla. Orci nulla pellentesque dignissim enim. Id velit ut tortor pretium viverra suspendisse potenti. Eget nunc lobortis mattis aliquam faucibus purus. Odio eu feugiat pretium nibh ipsum consequat nisl vel."},
    {subject: "Math"},
    {subject: "Science"}
]

export const Filled: Story = {
  args: {
    grades: grades,
    isEmpty: false
  }
};

export const Empty: Story = {
  args: {
    grades: grades,
    isEmpty: true
  }
}
