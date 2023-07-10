import { Meta, StoryObj } from "@storybook/react";
import FileUploadCard from "./FileUploadCard";

const meta: Meta<typeof FileUploadCard> = {
  title: 'File Upload Card',
  component: FileUploadCard
}

export default meta

type Story = StoryObj<typeof FileUploadCard>

export const default1: Story = {}