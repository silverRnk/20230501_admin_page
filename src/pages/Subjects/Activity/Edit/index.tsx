import React, { useEffect, useRef, useState } from "react";
import {
  PageContainer,
  PageTitle,
} from "../../../../compenents/style-components/PageStyleComponents";
import {
  Button,
  ButtonContainer,
  Form,
  Input,
  InputContainer,
  InputRow,
  InputWrapper,
  Label,
  Option,
  Selection,
  ValidationFeedback,
} from "../../../../compenents/forms/Forms";

//Rich Text Editor Import
//ReqctQuill
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
import styled from "styled-components";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const EditorArea = styled.div`
  height: 300px;
  width: 100%;
  overflow-y: auto;
`;

//Quill Editor Toolbar settings

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const EditActivity = () => {
  const editorRef = useRef(null);

  const [files, setFiles] = useState<File[]>([]);
  const [editorValue, setEditorValue] = useState("");
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const [urlParams] = useSearchParams()
  const activityId = urlParams.get("activityId")

  useEffect(() => {
    if(!activityId){
      navigate("/subjects/activities")
    }

    //TODO get activity to server
    
  },[activityId])

  const handleDropFile = (fileList: FileList) => {
    setFiles(files.concat([...fileList]));
  };

  const handleDeleteFile = (name: string, index: number) => {
    const fileCount = files.length;
    let newFiles: File[] = [];
    console.log("FileCount", fileCount, " Index", index);

    if (files.length === 0) {
      return;
    }

    if (index == 0) {
      newFiles = newFiles.concat(files.slice(1));
    } else if (index == fileCount - 1) {
      newFiles = newFiles.concat(files.slice(0, -1));
    } else if (index > 0) {
      newFiles = newFiles.concat(
        files.slice(0, index),
        files.slice(index + 1)
      );
    }
    setFiles(newFiles);
  };

  const handleEditorChange = (value: string) => {
    console.log(value);
    setEditorValue(value);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const handleOnReset = (e: React.FormEvent<HTMLFormElement>) => {
    setEditorValue("")
    setFiles([])
  }

  return (
    <PageContainer>
      <PageTitle>Edit Activity</PageTitle>
      <Form onSubmit={handleOnSubmit} onReset={handleOnReset}>
        <InputContainer>
          <InputWrapper>
            <Label>Title</Label>
            <Input isInvalid={false} placeholder={isLoading? "Loading....": ""} disabled={isLoading} />
            <ValidationFeedback
              isInvalid={false}
              isVisible={false}
            ></ValidationFeedback>
          </InputWrapper>
          <InputRow columnCount={2}>
            <InputWrapper>
              <Label>Subject</Label>
              <Input isInvalid={false} disabled={isLoading} />
              <ValidationFeedback
                isInvalid={false}
                isVisible={false}
              ></ValidationFeedback>
            </InputWrapper>
            <InputWrapper>
              <Label>Teacher</Label>
              <Input isInvalid={false} disabled={isLoading} />
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
          <InputWrapper className="editor-wrapper">
            <Label>Details/Instruction</Label>
            <ReactQuill
              id="editor"
              className="editor"
              value={editorValue}
              onChange={handleEditorChange}
              modules={modules}
              formats={formats}
            />
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
        </InputContainer>

        <ButtonContainer>
          <Button type="submit">Submit</Button>
          <Button type="reset">Reset</Button>
        </ButtonContainer>
      </Form>
    </PageContainer>
  );
};

export default EditActivity;
