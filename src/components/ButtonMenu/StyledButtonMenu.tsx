import styled, { DefaultTheme } from "styled-components";
import { Variants, variants } from "../Button/types";

type StyledButtonMenuProps = {
  variant: Variants;
  theme: DefaultTheme;
};

const getBackgroundColor = ({ theme, variant }: StyledButtonMenuProps) => {
  return theme.colors[variant === variants.SUBTLE ? "card" : "background"];
};

const StyledButtonMenu = styled.div<{ variant: Variants }>`
  background-color: ${getBackgroundColor};
  border-radius: 4px;
  display: inline-flex;

  button,
  a {
    height: 40px;
    padding: 0 24px;
    border-radius: 4px;
  }

  & > button + button,
  & > a + a {
    margin-left: 2px; // To avoid focus shadow overlap
  }
`;

export default StyledButtonMenu;
