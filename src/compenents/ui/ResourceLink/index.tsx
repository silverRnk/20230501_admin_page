import styled from "styled-components";
import React from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import LinkIcon from "@mui/icons-material/Link";

const ResourceLinkWrapper = styled.a`
  height: 20px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  max-lines: 1;
  text-align: start;
  cursor: pointer;
  display: block;
  grid-template-columns: 25px 1fr;
  border-radius: 2px;
  padding: 2px 5px;

  &:hover {
    background-color: lightblue;
  }
`;

const ResourceWrapper = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  line-height: 20px;
`;

export type ActivityResourceType = "Files" | "Link";

const ResourceLink = (props: {
  type: ActivityResourceType;
  url: string;
  label?: string;
}) => {
  const { type, url, label } = props;
  return (
    <ResourceWrapper>
      {type === "Files" ? (
        <ResourceLinkWrapper download href={url}>
          <FileDownloadIcon
            style={{
              fontSize: "20px",
              lineHeight: "20px",
              alignSelf: "center",
              justifySelf: "center",
            }}
          />
          {label !== undefined ? label : url}
        </ResourceLinkWrapper>
      ) : (
        <ResourceLinkWrapper href={url}>
          <LinkIcon
            style={{
              fontSize: "20px",
              lineHeight: "20px",
              alignSelf: "center",
              justifySelf: "center",
            }}
          />
          {label !== undefined ? label : url}
        </ResourceLinkWrapper>
      )}
    </ResourceWrapper>
  );
};

export default ResourceLink;
