import { Meta, StoryObj } from "@storybook/react";
import StudentsCredentials from "./StudentsCredentials";
import { Component } from "react";
import Theme from "../../../Theme";

const meta: Meta<typeof StudentsCredentials> = {
    title: "Students Credentials",
    component: StudentsCredentials,
    decorators: [
        (Story) => (
            <Theme>
                <Story/>
            </Theme>
        )
    ]
} 

export default meta
type Story = StoryObj<typeof StudentsCredentials>

export const empty: Story = {
    args: {
        id: 133333
    }
}