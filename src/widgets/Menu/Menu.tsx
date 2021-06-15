import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { SvgProps } from "../../components/Svg";
import * as IconModule from "./icons";
import throttle from "lodash/throttle";
import Overlay from "../../components/Overlay/Overlay";
import { Flex } from "../../components/Flex";
import { useMatchBreakpoints } from "../../hooks";
import Panel from "./Panel";
import UserBlock from "./UserBlock";
import { NavProps } from "./types";
import { MENU_HEIGHT, SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL } from "./config";
import { AccountIcon, AccountCloseIcon, MobileMenuIcon } from "./icons";
import MenuLink from "./MenuLink";
import Skeleton from "../../components/Skeleton/Skeleton";
import Text from "../../components/Text/Text";
import MenuButton from "./MenuButton";
import Logo from "./Logo";
import { MenuEntry } from "./MenuEntry";

const Icons = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> };

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledNav = styled.nav<{ isPushed: boolean; showMenu: boolean; isMobile: boolean; }>`
  position: fixed;
  top: ${({ showMenu, isMobile }) => ((showMenu || isMobile) ? 0 : `-${MENU_HEIGHT}px`)};
  left: ${({ isPushed, showMenu, isMobile }) => `${showMenu ? isPushed ? SIDEBAR_WIDTH_FULL : isMobile ? 0 : SIDEBAR_WIDTH_REDUCED : 0}px`};
  transition: top 0.2s;
  display: ${({ isPushed, isMobile }) => ((isPushed && isMobile) ? 'none' : 'flex')};
  justify-content: ${({ isMobile }) => (isMobile ? 'space-between' : 'flex-end')};
  align-items: center;
  padding-left: ${({ isMobile }) => (isMobile ? '24px' : '8px')};
  padding-right: ${({ isMobile }) => (isMobile ? '20px' : '48px')};
  width: calc(100% - ${({ isPushed, isMobile }) => `${isPushed ? SIDEBAR_WIDTH_FULL : isMobile ? 0 : SIDEBAR_WIDTH_REDUCED}px`});
  height: ${({ isMobile }) => (isMobile ? '96px' : `${MENU_HEIGHT}px`)};
  background-color: #0C1630;
  z-index: 20;
  transform: translate3d(0, 0, 0);
`;

const BodyWrapper = styled.div`
  position: relative;
  display: flex;
`;

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean; isMobile: boolean;}>`
  flex-grow: 1;
  margin-top: ${({ showMenu, isMobile }) => (showMenu ? isMobile ? '96px' : `${MENU_HEIGHT}px` : 0)};
  transition: margin-top 0.2s;
  transform: translate3d(0, 0, 0);
  max-width: 100%;

  ${({ theme }) => theme.mediaQueries.nav} {
    margin-left: ${({ isPushed }) => `${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px`};
    max-width: ${({ isPushed }) => `calc(100% - ${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px)`};
  }
`;

const MobileOnlyOverlay = styled(Overlay)`
  position: fixed;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.nav} {
    display: none;
  }
`;

const PriceLink = styled.a`
  display: block;
  text-align: center;
  align-items: center;
  padding-right: 16px;
  svg {
    transition: transform 0.3s;
  }
  :hover {
    svg {
      transform: scale(1.2);
    }
  }
`;

const MobileFooter = styled.nav`
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
  bottom: 0;
  background: #142348;
  height: 64px;
  width: 100%;
  left: 0;
`;

const Menu: React.FC<NavProps> = ({
  account,
  login,
  logout,
  isDark,
  toggleTheme,
  langs,
  setLang,
  currentLang,
  cakePriceUsd,
  cakePriceLink,
  links,
  profile,
  children,
}) => {
  const { isXl } = useMatchBreakpoints();
  const isMobile = isXl === false;
  const [isPushed, setIsPushed] = useState(!isMobile);
  const [showMenu, setShowMenu] = useState(true);
  const refPrevOffset = useRef(window.pageYOffset);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
      const isTopOfPage = currentOffset === 0;
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true);
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current) {
          // Has scroll up
          setShowMenu(true);
        } else {
          // Has scroll down
          setShowMenu(false);
        }
      }
      refPrevOffset.current = currentOffset;
    };
    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);
  const homeLink = links.find((link) => link.label === "Home");

  // Find the home link if provided
  return (
    <Wrapper>
      <StyledNav isPushed={isPushed} showMenu={showMenu} isMobile={isMobile}>
        {isMobile && 
          <Logo
            isMobile={isMobile}
            isPushed={isPushed}
            togglePush={() => setIsPushed((prevState: boolean) => !prevState)}
            isDark={isDark}
            href={homeLink?.href ?? "/"}
          />}
        <Flex style={{alignItems: 'center'}}>
          {!isMobile && <>
          {cakePriceUsd ? (
            <PriceLink href={cakePriceLink} target="_blank">
              <Text color="secondary" fontSize="10px">PANTHER</Text>
              <Text color="text" fontSize="16px">{`$${cakePriceUsd.toFixed(3)}`}</Text>
            </PriceLink>
          ) : (
            <Skeleton width={80} height={24} />
          )}
          </>}
          <UserBlock account={account} login={login} logout={logout} isMobile={isMobile} />
          <MenuLink href={'/account'}>
            {account ? 
              <AccountIcon width="32px" height="32px" /> :
              <AccountCloseIcon width="32px" height="32px" />}
          </MenuLink> 
          {isMobile && 
            <MenuButton aria-label="Toggle menu" onClick={() => setIsPushed(true)}>
              <MobileMenuIcon width="32px" color="text" />
          </MenuButton>}
        </Flex>
      </StyledNav>
      <BodyWrapper>
        <Panel
          isPushed={isPushed}
          isMobile={isMobile}
          showMenu={showMenu}
          isDark={isDark}
          toggleTheme={toggleTheme}
          langs={langs}
          setLang={setLang}
          currentLang={currentLang}
          cakePriceUsd={cakePriceUsd}
          cakePriceLink={cakePriceLink}
          pushNav={setIsPushed}
          links={links}
          account={account}
          login={login}
          logout={logout}
        />
        <Inner isPushed={isPushed} showMenu={showMenu} isMobile={isMobile}>
          {children}
        </Inner>
        <MobileOnlyOverlay show={isPushed} onClick={() => setIsPushed(false)} role="presentation" />
      </BodyWrapper>
      {isMobile && 
        <MobileFooter>
          {links.map((entry, index) => {
            if(index < 5 && entry.label !== 'Divider'){
              const Icon = Icons[entry.icon];
              const iconElement = <Icon width="24px" />;
              const calloutClass = entry.calloutClass ? entry.calloutClass : undefined;
              return(
                <MenuEntry key={entry.label} isMobile={isMobile} isPushed={isPushed} isActive={entry.href === location.pathname} className={calloutClass}>
                  <MenuLink href={entry.href} onClick={() => setIsPushed(false)} style={{width: isPushed ? '100%' : 'unset'}}>
                    {iconElement}
                  </MenuLink>
                </MenuEntry>
              );
            }
          })}
        </MobileFooter>}
    </Wrapper>
  );
};

export default Menu;
