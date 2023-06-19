import { Meta, StoryObj } from "@storybook/react";
import ActivitiesTable from "./ActivitiesTable";
import Theme from "../../../Theme";
import { Activities } from "./ClassSubjectsTable";
import { EmptyArrayGenerator } from "../../../utils/ArrayGenerator";
import { faker } from "@faker-js/faker";
import {withRouter} from "storybook-addon-react-router-v6"

const meta: Meta<typeof ActivitiesTable> = {
  title: "Activities Table",
  component: ActivitiesTable,
  decorators: [
    (Story) => (
      <Theme>
        <Story/>
      </Theme>
    ), withRouter
  ]
}

export default meta

type Story = StoryObj<typeof ActivitiesTable>

const data: Array<Activities> = [
  ...EmptyArrayGenerator(4).map(() => {
    return {id: faker.string.numeric(4),
    name: faker.lorem.lines(1),
    dateOfSubmission: faker.date.anytime(),
    description: "",
    activityResources: [
      {type: "Files", url:faker.internet.url()},
      {type: "Link", url:faker.internet.url()},
      {type: "Files", url:faker.internet.url()}
    ]} as Activities
  })
]

export const Empty: Story = {
  args: {
    activities: [],
    state: "SELECTED"
  }
}

export const Filled: Story = {
  args: {
    activities: data,
    state: "SELECTED"
  }
}
