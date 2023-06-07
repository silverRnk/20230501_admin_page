import { Meta, StoryObj } from "@storybook/react";
import PopupDialog from "./PopupDialog";
import Theme from "../Theme";
import { faker } from "@faker-js/faker";

const meta: Meta<typeof PopupDialog> = {
  title: "Popup Dialog",
  component: PopupDialog,
  decorators: [
    (Story) => (
      <Theme>
        <Story/>
      </Theme>
    )
  ]
}

export default meta
type Story = StoryObj<typeof PopupDialog>

export const Message: Story = {
  args:{
    open: true,
    message: "Hello World",
    messageType: "Message"

  }
}

export const Successful: Story = {
  args:{
    open: true,
    message: "Hello World",
    messageType: "Successful"

  }
}

export const Error: Story = {
  args:{
    open: true,
    message: "Hello World",
    messageType: "Error"

  }
}

export const LongMessage: Story = {
  args:{
    open: true,
    message: faker.lorem.paragraph(10),
    messageType: "Message"

  }
}