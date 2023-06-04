import { Meta, StoryObj } from "@storybook/react";
import TeacherProfileDetails from "./TeacherProfileDetails";
import {faker} from "@faker-js/faker"
import Theme from "../Theme";


const meta: Meta<typeof TeacherProfileDetails> = {
    title: "Teachers Details",
    component: TeacherProfileDetails,
    decorators: [
        (Story) => (
            <Theme>
                <Story/>
            </Theme>
        )
    ]
}

export default meta
type Story = StoryObj<typeof TeacherProfileDetails>

export const empty: Story = {
    
}

export const loading: Story = {
    args:{
        data: null,
        isLoading: true
    }
}

export const filled: Story = {
    args:{
        data:{
            teacher_id: faker.string.uuid(),
            teacher_name: faker.person.fullName(),
            teacher_gender: "Female",
            teacher_address: faker.location.streetAddress(),
            teacher_religion: "Religion",
            teacher_admission_date: faker.date.anytime().toDateString(),
            teacher_email: faker.internet.exampleEmail(),
            teacher_phone: faker.phone.number(),
            teacher_advisory_class: "",
            teacher_profile_img: ""

        }
    }
}