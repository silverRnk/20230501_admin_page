import { Meta, StoryObj } from "@storybook/react";
import ClassSubjectsTable, { ClassSubjects} from "./ClassSubjectsTable";
import Theme from "../../../Theme";
import { EmptyArrayGenerator } from "../../../utils/ArrayGenerator";
import { count } from "console";
import { faker } from "@faker-js/faker";

const meta: Meta<typeof ClassSubjectsTable> = {
  title: "Subjects Activities",
  component: ClassSubjectsTable,
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ClassSubjectsTable>;

const data: Array<ClassSubjects> = [
  ...EmptyArrayGenerator(5).map(() => {
    return {
      className: faker.location.city(),
      subjects: [
        ...["English", "Math", "Science", "History", "English"].map((name) => {
          return {
            id: faker.string.numeric(4),
            name: name
          };
        }),
      ],
    } as ClassSubjects;
  }),
];

export const empty: Story = {
  args: {
    classSubjects: [],
    isLoading: false,
    schoolYear: 2019,
  },
};

export const loading: Story = {
  args: {
    classSubjects: [...data],
    isLoading: true,
    schoolYear: 2019,
  },
};

export const filled: Story = {
  args: {
    classSubjects: [...data],
    isLoading: false,
    schoolYear: 2019,
  },
};
