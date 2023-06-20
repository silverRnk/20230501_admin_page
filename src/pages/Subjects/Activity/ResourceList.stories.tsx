import { Meta, StoryObj } from "@storybook/react";
import ResourceList, { ResourceObj } from "./ResourceList";
import Theme from "../../../Theme";
import { EmptyArrayGenerator } from "../../../utils/ArrayGenerator";
import { faker } from "@faker-js/faker";

const meta: Meta<typeof ResourceList> = {
  title: "Resource List",
  component: ResourceList,
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ResourceList>;

export const Empty: Story = {
  args: {
    resourceList: [],
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    resourceList: [],
    isLoading: true,
  },
};

export const Filled: Story = {
  args: {
    resourceList: [
      ...EmptyArrayGenerator(5).map(() => {
        return {
          type: faker.helpers.arrayElement(["Files", "Link"]),
          url: faker.internet.url(),
          label: faker.lorem.lines(1)
        } as ResourceObj;
      }),
    ],
  },
};
