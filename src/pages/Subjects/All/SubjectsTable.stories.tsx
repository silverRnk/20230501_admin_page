import { Meta, StoryObj } from "@storybook/react";

// Components
import SubjectsTable from "./SubjectsTable";
import Theme from "../../../Theme";


const meta: Meta<typeof SubjectsTable> = {
    title: "Subjects Tables",
    component: SubjectsTable,
    decorators: [
        (Story) => (
            <Theme>
                <Story/>
            </Theme>
        ),
    ]
}

export default meta;
type Story = StoryObj<typeof SubjectsTable>

export const empty: Story = {
    args:{
        data: []
    }
}

export const filled: Story = {
    args: {
        isLoading: false,
        data: [
            {
                subject_id: "eng",
                subject: "English",
                teachers: [
                    {teacher_id: "1111",
                    teacher: "Bob",
                    classes: [
                        {class: "class1", schedule: "Mon"},
                        {class: "class2", schedule: "Fri"}
                    ]},
                    {
                        teacher_id: "22222",
                        teacher: "Mary",
                        classes: [
                            {class: "class3", schedule: "Sat"},
                            {class: "class4", schedule: "Tue"},
                            {class: "class4", schedule: "Tue"}
                        ]
                    },
                    {
                        teacher_id: "44444",
                        teacher: "John",
                        classes: [
                            {class: "class3", schedule: "Sat"},
                            {class: "class4", schedule: "Tue"}
                        ]
                    }
                ]
            },
            {
                subject_id: "eng",
                subject: "English",
                teachers: [
                    {teacher_id: "1111",
                    teacher: "Bob",
                    classes: [
                        {class: "class1", schedule: "Mon"},
                        {class: "class2", schedule: "Fri"}
                    ]},
                    {
                        teacher_id: "22222",
                        teacher: "Mary",
                        classes: [
                            {class: "class3", schedule: "Sat"},
                            {class: "class4", schedule: "Tue"},
                            {class: "class4", schedule: "Tue"}
                        ]
                    },
                    {
                        teacher_id: "44444",
                        teacher: "John",
                        classes: [
                            {class: "class3", schedule: "Sat"},
                            {class: "class4", schedule: "Tue"}
                        ]
                    }
                ]
            }
        ]
    }
}

export const Loading: Story = {
    args: {
        isLoading: true,
        data: filled.args?.data
    }
}