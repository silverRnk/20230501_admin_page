import { Meta, StoryObj } from "@storybook/react";
import DraggableFileInput from "./DraggableFileInput";
import Theme from "../../Theme";

const meta: Meta<typeof DraggableFileInput> = {
  title: "Draggable File Input",
  component: DraggableFileInput,
  decorators: [
    (Story) => (
      <Theme>
        <Story/>
      </Theme>
    ),
  ]
}

export default meta
type Story = StoryObj<typeof DraggableFileInput>

export const Empty: Story = {

}