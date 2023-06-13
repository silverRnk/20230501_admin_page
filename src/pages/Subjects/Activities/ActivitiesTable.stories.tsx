import { Meta, StoryObj } from "@storybook/react";
import ActivitiesTable from "./ActivitiesTable";
import Theme from "../Theme";

const meta: Meta<typeof ActivitiesTable> = {
  title: "Activities Table",
  component: ActivitiesTable,
  decorators: [
    (Story) => (
      <Theme>
        <Story/>
      </Theme>
    )
  ]
}

export default meta

type Story = StoryObj<typeof ActivitiesTable>

export const Empty: Story = {}
