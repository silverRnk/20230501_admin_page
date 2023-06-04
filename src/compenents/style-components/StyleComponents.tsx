import styled, { keyframes, css } from "styled-components";



export const ShimmerAnimation = keyframes`
    from{
        background-position: -468px 0;
    }

    to{
        background-position: 468px 0;
       }
       
`;

export const PlaceHolder = styled.span`
  height: 30px;
  width: 70%;
  background: #f6f7f8;
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  animation: ${ShimmerAnimation} 2s linear infinite;
  background-repeat: no-repeat;
  background-size: 800px 104px;
  display: inline-block;
  position: relative;
`;

export const PlaceHolderStyle = css`
  background: #f6f7f8;
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  animation: ${ShimmerAnimation} 2s linear infinite;
  background-repeat: no-repeat;
  background-size: 800px 104px;
  display: inline-block;
  position: relative;
`
