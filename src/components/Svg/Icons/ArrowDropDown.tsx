import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <path d="M7 10L12 15L17 10H7Z" fill="#FCFCFC"/>    
    </Svg>
  );
};

export default Icon;
