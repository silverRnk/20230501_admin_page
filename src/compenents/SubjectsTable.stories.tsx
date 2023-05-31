import { Meta, StoryObj } from "@storybook/react";

// Components
import SubjectsTable from "./SubjectsTable";


const meta: Meta<typeof SubjectsTable> = {
    title: "Subjects Tables",
    component: SubjectsTable
}

export default meta;
type Story = StoryObj<typeof SubjectsTable>

export const empty: Story = {
    
}

export const filled: Story = {
    args: {
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