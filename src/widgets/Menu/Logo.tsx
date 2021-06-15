import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { LogoWithTitleIcon } from "../../components/Svg";
import Flex from "../../components/Flex/Flex";
import { HamburgerCloseIcon, LogoIcon as LogoWithText } from "./icons";
import MenuButton from "./MenuButton";

interface Props {
  isMobile: boolean;
  isPushed: boolean;
  isDark: boolean;
  togglePush: () => void;
  href: string;
}

const StyledLink = styled(Link)`
  align-items: center;
  .mobile-icon {
    width: 56px;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: none;
    }
  }
  .desktop-icon {
    width: 56px;
    display: none;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: block;
    }
  }
`;
const LogoTitle = styled.div`
  font-size: 18px;
  font-weight: 800;
  font-family: 'Poppins';
  font-style: italic;
  color: #FCFCFC;
  padding-top: 10px;
`;

const Wrapper = styled.div<{ isPushed: boolean; isMobile: boolean; }>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-bottom: ${({ isPushed, isMobile }) => ((isPushed && isMobile) ? '32px' : 0)};
`;

const Logo: React.FC<Props> = ({ isMobile, isPushed, togglePush, isDark, href }) => {
  const isAbsoluteUrl = href.startsWith("http");
  const innerLogo = (
    <>
      {isMobile && <LogoWithTitleIcon className="mobile-icon" />}
      <LogoWithText className="desktop-icon" isDark={isDark} />
    </>
  );

  return (
    <Wrapper isPushed={isPushed} isMobile={isMobile}>
      <Flex>
        {!isMobile && <MenuButton style={{position: 'absolute', left: '270px', width: "32px", height: "32px", background: '#0C1630', borderRadius: '50%', paddingLeft: 12}} aria-label="Toggle menu" onClick={togglePush} mr="14px">
          {isPushed && (
            <HamburgerCloseIcon width="16px" color="text" />
          )}
        </MenuButton>}
        {isAbsoluteUrl ? (
          <StyledLink as="a" href={href} aria-label="Panther home page">
            {innerLogo}
          </StyledLink>
        ) : (
          <StyledLink to={href} aria-label="Panther home page">
            {innerLogo}
          </StyledLink>
        )}
      </Flex>
      {isPushed && !isMobile && <LogoTitle>PantherSwap</LogoTitle>}
    </Wrapper>
  );
};

export default Logo;
