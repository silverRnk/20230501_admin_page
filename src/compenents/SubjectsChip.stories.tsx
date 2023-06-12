import { Meta, StoryObj } from "@storybook/react";
import SubjectsChip from "./SubjectsChip";
import Theme from "../Theme";

const meta: Meta<typeof SubjectsChip> = {
  title: "Subjects Chips",
  component: SubjectsChip,
  decorators: [
    (Story) => (
      <Theme>
        <Story/>
      </Theme>
    )
  ]
}

export default meta;

type Story = StoryObj<typeof SubjectsChip>

export const type1: Story = {
  args: {
    name: "English",
    onClick: () => {}
  }
}