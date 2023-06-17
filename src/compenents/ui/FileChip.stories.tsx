import { Meta, StoryObj } from "@storybook/react";
import FileChip from "./FileChip";
import Theme from "../../Theme";
import { type } from "os";


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

export const file: Story = {
    args: {
        file: new File(["myfile"], "myfile.file", {type: "anytype", lastModified: Date.now()})
    }
}

export const json: Story = {
    args: {
        file: new File(["json"], "my_json.json", {type: "application/json"})
    }
}