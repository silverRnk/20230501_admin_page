import React from "react";
import ResourceLink, {
  ActivityResourceType,
} from "../../../compenents/ui/ResourceLink";
import styled from "styled-components";
import { EmptyArrayGenerator } from "../../../utils/ArrayGenerator";
import { EmptyLabel, EmptyLabelContainer, PlaceHolderStyle } from "../../../compenents/style-components/StyleComponents";

const Container = styled.div`
  min-height: 100px;
  position: relative;
  display: grid;
`;

const PlaceHolderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const IconPlaceHolder = styled.span`
  ${PlaceHolderStyle}
  height: 20px;
  width: 20px;
`;
const TextPlaceHolder = styled.span`
  ${PlaceHolderStyle}
  height: 20px;
  width: 150px;
`;

/**
 * @property type - "Link" | "Files"
 * @property url - File or Link url
 * @property label - string to be displayed
 */
export interface ResourceObj {
  type: ActivityResourceType;
  url: string;
  label?: string;
}

const ResourceList = (props: {
  resourceList: ResourceObj[];
  isLoading: boolean;
}) => {
  const { resourceList, isLoading } = props;
  return (
    <Container>
      {isLoading
        ? EmptyArrayGenerator(3).map(() => {
            return (
                <PlaceHolderWrapper>
                    <IconPlaceHolder/>
                    <TextPlaceHolder/>
                </PlaceHolderWrapper>
            );
          })
        : resourceList.map((resourceItem) => {
            return <ResourceLink {...resourceItem} />;
          })}
          <EmptyLabelContainer isVisible={resourceList.length === 0 && !isLoading}>
            <EmptyLabel>No files to download</EmptyLabel>
          </EmptyLabelContainer>
    </Container>
  );
};

export default ResourceList;
