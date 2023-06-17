import { Meta, StoryObj } from "@storybook/react";
import FileChip from "./FileChip";
import Theme from "../../Theme";


const meta: Meta<typeof FileChip> = {
    title: "File Chip",
    component: FileChip,
    decorators: [
        (Story) => (
            <Theme>
                <Story/>
            </Theme>
        )
    ]
}

export default meta

type Story = StoryObj<typeof FileChip>

const pdfFile = new File(["pdf"], "myPdf.pdf", {type: "application/pdf", lastModified: Date.now()})

export const pdf: Story = {
    args: {
        file: pdfFile,
    }
}

export const docs: Story = {
    args: {
        file: new File(["docs"], "docs_example.doc", {type: "application/msword", lastModified: Date.now()})
    }
}