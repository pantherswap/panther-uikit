import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 28 28" {...props}>
      <path d="M13.055 1.5865L4.88833 5.21484C4.04833 5.58817 3.5 6.42817 3.5 7.34984V12.8332C3.5 19.3082 7.98 25.3632 14 26.8332C20.02 25.3632 24.5 19.3082 24.5 12.8332V7.34984C24.5 6.42817 23.9517 5.58817 23.1117 5.21484L14.945 1.5865C14.35 1.31817 13.65 1.31817 13.055 1.5865ZM14 13.9882H22.1667C21.5483 18.7948 18.34 23.0765 14 24.4182V13.9998H5.83333V7.34984L14 3.7215V13.9882Z" fill="#FCFCFC"/>
    </Svg>
  );
};

export default Icon;
