import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 28 28" {...props}>
      <path d="M14.0003 3.5L4.66699 10.5V24.5H10.5003V16.3333H17.5003V24.5H23.3337V10.5L14.0003 3.5Z" fill="#FCFCFC"/>
    </Svg>
  );
};

export default Icon;
