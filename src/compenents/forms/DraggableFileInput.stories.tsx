import { Meta, StoryObj } from "@storybook/react";
import DraggableFileInput from "./DraggableFileInput";
import Theme from "../../Theme";
import { EmptyArrayGenerator } from "../../utils/ArrayGenerator";

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

const fileList: File[] = [
  new File([""], "exmaple.jpeg", {type: "image/jpeg", lastModified: Date.now()}),
  new File([""], "exmaple.pdf", {type: "application/pdf", lastModified: Date.now()}),
  new File([""], "exmaple.html", {type: "text/html", lastModified: Date.now()}),
  new File([""], "exmaple.aac", {type: "audio/aac", lastModified: Date.now()}),
  new File([""], "exmaple.zip", {type: "application/zip", lastModified: Date.now()}),
  

  
] 

export const Filled: Story = {
  args: {
    files:fileList
  }
}