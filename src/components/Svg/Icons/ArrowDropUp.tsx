import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <path d="M7 14L12 9L17 14H7Z" fill="#FCFCFC"/>
    </Svg>
  );
};

export default Icon;
