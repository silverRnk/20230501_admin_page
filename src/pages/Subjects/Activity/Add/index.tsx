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
          <ValidationFeedback isInvalid={false} isVisible={false}>

          </ValidationFeedback>
        </InputWrapper>
        <InputWrapper>
          <Label>Upload Files</Label>
          <DraggableFileInput/>
        </InputWrapper>
      </Form>
    </PageContainer>
  );
};

export default AddActivity;
