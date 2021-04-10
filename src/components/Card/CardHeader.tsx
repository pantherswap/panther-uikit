import styled from "styled-components";
import { space, SpaceProps } from "styled-system";

export type CardHeaderProps = SpaceProps;

const CardHeader = styled.div<CardHeaderProps>`
  // background: ${({ theme }) => theme.card.cardHeaderBackground};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  ${space}
`;

CardHeader.defaultProps = {
  p: "24px",
};

export default CardHeader;
