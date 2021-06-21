import styled from "styled-components";
import { scales } from "../Checkbox/types";
import { ToggleProps, HandleProps, InputProps, ScaleKeys } from "./types";

const scaleKeyValues = {
  sm: {
    handleHeight: "26px",
    handleWidth: "26px",
    handleLeft: "2px",
    handleTop: "2px",
    checkedLeft: "calc(100% - 24px)",
    toggleHeight: "20px",
    toggleWidth: "44px",
  },
  md: {
    handleHeight: "46px",
    handleWidth: "46px",
    handleLeft: "4px",
    handleTop: "4px",
    checkedLeft: "calc(100% - 46px)",
    toggleHeight: "40px",
    toggleWidth: "64px",
  },
};

const getScale = (property: ScaleKeys) => ({ scale = scales.MD }: ToggleProps) => {
  return scaleKeyValues[scale][property];
};

export const Handle = styled.div<HandleProps>`
  background-color: #3D65CA;
  border-radius: 50%;
  cursor: pointer;
  height: ${getScale("handleHeight")};
  position: absolute;
  transition: left 200ms ease-in;
  width: ${getScale("handleWidth")};
  z-index: 1;
  left: -1px;
`;

export const Input = styled.input<InputProps>`
  cursor: pointer;
  opacity: 0;
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 3;

  &:checked + ${Handle} {
    left: ${getScale("checkedLeft")};
  }

  &:focus + ${Handle} {
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }

  &:hover + ${Handle}:not(:disabled):not(:checked) {
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }
`;

const StyledToggle = styled.div<ToggleProps>`
  align-items: center;
  background-color: ${({ theme, checked }) => theme.colors[checked ? "success" : "text"]};
  border-radius: 24px;
  box-shadow: ${({ theme }) => theme.shadows.inset};
  cursor: pointer;
  display: inline-flex;
  height: ${getScale("toggleHeight")};
  position: relative;
  transition: background-color 200ms;
  width: ${getScale("toggleWidth")};
`;

export default StyledToggle;
