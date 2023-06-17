import React from "react";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const PPTFileIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 384 512">
      <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM136 240h68c42 0 76 34 76 76s-34 76-76 76H160v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V368 264c0-13.3 10.7-24 24-24zm68 104c15.5 0 28-12.5 28-28s-12.5-28-28-28H160v56h44z" />
    </SvgIcon>
  );
};

export default PPTFileIcon;
