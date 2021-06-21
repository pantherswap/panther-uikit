import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 32 32" {...props}>
      <path d="M25.3334 8.54699L23.4534 6.66699L16.0001 14.1203L8.54675 6.66699L6.66675 8.54699L14.1201 16.0003L6.66675 23.4537L8.54675 25.3337L16.0001 17.8803L23.4534 25.3337L25.3334 23.4537L17.8801 16.0003L25.3334 8.54699Z" fill="#FCFCFC"/>
    </Svg>
  );
};

export default Icon;
