import { Meta, StoryObj } from "@storybook/react";
import ProfileImg from "./ProfileImg";
import Theme from "../Theme";

const meta: Meta<typeof ProfileImg> = {
    title: "Profile Image",
    component: ProfileImg,
    decorators:[
        (Story) => (
            <Theme>
                <Story/>
            </Theme>
        ),
    ]

}

export default meta
type Story = StoryObj<typeof ProfileImg>

export const empty: Story = {
    args:{
        image:"",
        isLoading: false
    }
}

export const loading: Story = {
    args:{
        image:"",
        isLoading: true
    }
}

export const withImg: Story = {
    args: {
        image: "https://images.unsplash.com/photo-1685435853901-6929169b6bf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=694&q=80",
        isLoading: false
    }
}


//https://images.unsplash.com/photo-1685435853901-6929169b6bf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=694&q=80