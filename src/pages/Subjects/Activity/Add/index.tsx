import React, { useRef, useState } from "react";
import {
  PageContainer,
  PageTitle,
} from "../../../../compenents/style-components/PageStyleComponents";
import {
  Form,
  Input,
  InputRow,
  InputWrapper,
  Label,
  Option,
  Selection,
  ValidationFeedback,
} from "../../../../compenents/forms/Forms";

//Draft JS Import
// import {
//   Editor,
//   EditorState,
//   RichUtils,
//   convertToRaw,
//   convertFromRaw,
// } from "draft-js";

import { Editor } from "@tinymce/tinymce-react";
import DraggableFileInput from "../../../../compenents/forms/DraggableFileInput";

const AddActivity = () => {
  const editorRef = useRef(null);

  const [files, setFiles] = useState<readonly File[]>([]);

  const handleDropFile = (fileList: FileList) => {
    setFiles(files.concat([...fileList]));
  };

  const handleDeleteFile = (name: string, index: number) => {
    const fileCount = files.length;
    let newFiles: File[] = [];
    console.log("FileCount", fileCount, " Index", index)

    if (files.length === 0) {
      return;
    }

    if (index == 0) {
      newFiles = newFiles.concat(files.slice(1));
    } else if (index == fileCount - 1) {
      newFiles = newFiles.concat(files.slice(0, -1));
    } else if (index > 0) {
      newFiles = newFiles.concat(
        files.slice(0, index + 1),
        files.slice(index + 1, fileCount - 1)
      );
    }
    setFiles(newFiles)
  };

  return (
    <PageContainer>
      <PageTitle>Add Activity</PageTitle>
      <Form>
        <InputWrapper>
          <Label>Title</Label>
          <Input isInvalid={false} />
          <ValidationFeedback
            isInvalid={false}
            isVisible={false}
          ></ValidationFeedback>
        </InputWrapper>
        <InputRow columnCount={2}>
          <InputWrapper>
            <Label>Subject</Label>
            <Input isInvalid={false} />
            <ValidationFeedback
              isInvalid={false}
              isVisible={false}
            ></ValidationFeedback>
          </InputWrapper>
          <InputWrapper>
            <Label>Teacher</Label>
            <Input isInvalid={false} />
            <ValidationFeedback
              isInvalid={false}
              isVisible={false}
            ></ValidationFeedback>
          </InputWrapper>
        </InputRow>

        <InputRow columnCount={2}>
          <InputWrapper>
            <Label>Grade</Label>
            <Selection isInvalid={false}>
              <Option>-- Select Grade ---</Option>
            </Selection>
            <ValidationFeedback
              isInvalid={false}
              isVisible={false}
            ></ValidationFeedback>
          </InputWrapper>
          <InputWrapper>
            <Label>Section</Label>
            <Selection isInvalid={false}>
              <Option>-- Select Section ---</Option>
            </Selection>
            <ValidationFeedback
              isInvalid={false}
              isVisible={false}
            ></ValidationFeedback>
          </InputWrapper>
        </InputRow>
        <InputWrapper>
          <Label>Date of Submission</Label>
          <Input isInvalid={false} />
          <ValidationFeedback
            isInvalid={false}
            isVisible={false}
          ></ValidationFeedback>
        </InputWrapper>
        <InputWrapper>
          <Label>Details/Instruction</Label>
          {/* <Editor
            apiKey="your-api-key"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          /> */}
          <ValidationFeedback
            isInvalid={false}
            isVisible={false}
          ></ValidationFeedback>
        </InputWrapper>
        <InputWrapper>
          <Label>Upload Files</Label>
          <DraggableFileInput
            files={files}
            onDrop={handleDropFile}
            onDeleteFile={handleDeleteFile}
          />
        </InputWrapper>
      </Form>
    </PageContainer>
  );
};

export default AddActivity;
