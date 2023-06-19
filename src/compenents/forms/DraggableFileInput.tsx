import React, { useCallback } from "react";
import styled, { css } from "styled-components";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { theme } from "../../Theme";
import FileChip from "../ui/FileChip";

const Container = styled.div`
  width: 100%;
  height: 300px;
  padding: 10px;
`;

const draggedStyle = css`
  background-color: ${(props) => props.theme.colors.background};
  filter: brightness(80%);
`;
const Wrapper = styled.div<{ isDragged: boolean }>`
  width: 100%;
  height: inherit;
  position: relative;
  border: 2px dotted gray;
  border-radius: 5px;
  transition: all 0.25s ease;

  display: grid;
  grid-template-columns: 1fr;
  transition: all 0.25s ease;
  background-color: ${(props) =>
    props.isDragged ? props.theme.colors.background : "white"};
  filter: ${(props) =>
    props.isDragged ? "brightness(95%)" : "brightness(100%)"};
`;
const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;
const LabelTop = styled.div``;
const LabelBottom = styled.div``;
const LabelStrong = styled.strong`
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;

  &:hover {
    filter: brightness(200%);
  }
`;
const FileChipsWrapper = styled.div<{ isEmpty: boolean }>`
  width: 100%;
  min-height: 200px;
  padding: 10px 20px;
  margin-bottom: 15px;
  display: ${(props) => (props.isEmpty ? "none" : "flex")};
  flex-direction: row;
  align-content: start;
  flex-wrap: wrap;
  gap: 15px;
`;

const InputWrapper = styled.div`
  align-self: center;
  justify-self: center;
  height: auto;
`;
const Input = styled.input`
  display: none;
`;

const DraggableFileInput = (props: {
  files: File[];
  onDrop?: (files: FileList) => void;
  onDeleteFile?: (fileName: string, index: number) => void;
}) => {
  const {files, onDrop, onDeleteFile } = props;
  const [dragActive, setDragActive] = React.useState(false);
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if(onDrop !== undefined){
      onDrop(e.dataTransfer.files)
    }
    setDragActive(false);
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (
      e.type === "dragleave" ||
      e.type === "dragend" ||
      e.type === "drop"
    ) {
      setDragActive(false);
    }
  };

  const handleDeleteItem = (file: File, index: number) => {
    if(onDeleteFile !== undefined){
      onDeleteFile(file.name, index)
    }
    
    
  }

  return (
    <Container>
      <Wrapper
        isDragged={dragActive}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <FileChipsWrapper
          isEmpty={files?.length === 0 || !files?.length}
        >
          {files.map((file, index) => (
            <FileChip file={file} onDelete={() => handleDeleteItem(file, index)}  />
          ))}

        </FileChipsWrapper>
        <InputWrapper>
          <Input
            multiple={true}
            onChange={handleUpload}
            type="file"
            name="file-uploader"
            id="file-uploader"
          />
          <Label htmlFor="file-uploader">
            <LabelTop>
              {files?.length! > 0 || (
                <DownloadForOfflineIcon
                  style={{
                    fontSize: "75px",
                    color: theme.colors.primary,
                  }}
                />
              )}
            </LabelTop>
            <LabelBottom>
              <LabelStrong>Choose a file, </LabelStrong>
              <span>or drag it here</span>
            </LabelBottom>
          </Label>
        </InputWrapper>
      </Wrapper>
    </Container>
  );
};

export default DraggableFileInput;
