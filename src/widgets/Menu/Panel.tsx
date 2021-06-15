import React from "react";
import styled from "styled-components";
import PanelBody from "./PanelBody";
import PanelFooter from "./PanelFooter";
import { SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL } from "./config";
import { NavProps, PanelProps, PushedProps } from "./types";
import Logo from "./Logo";
import { MobileCloseIcon } from "./icons";
import MenuButton from "./MenuButton";
import Button from "../../components/Button/Button";
import { MobileLoginButtonIcon } from "./icons";
import { useWalletModal } from "../WalletModal";
import Text from "../../components/Text/Text";
import Skeleton from "../../components/Skeleton/Skeleton";
interface Props extends PanelProps, PushedProps, NavProps {
  showMenu: boolean;
  isMobile: boolean;
}

const StyledPanel = styled.div<{ isPushed: boolean; showMenu: boolean; isMobile: boolean}>`
  position: fixed;
  padding-top: 20px;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.nav.background};
  width: ${({ isPushed, isMobile }) => (isPushed ? isMobile ? '100%' : `${SIDEBAR_WIDTH_FULL}px` : 0)};
  height: 100vh;
  transition: padding-top 0.2s, width 0.2s;
  border-radius: ${({ isMobile }) => (isMobile ? 0 : "0px 16px 16px 0px")};
  box-shadow: ${({ isMobile }) => (isMobile ? 0 : "5px 4px 8px 3px rgba(14, 14, 14, 0.2)")};
  z-index: 11;
  overflow: ${({ isPushed }) => (isPushed ? "initial" : "hidden")};
  transform: translate3d(0, 0, 0);

  ${({ theme }) => theme.mediaQueries.nav} {
    border-right: 2px solid rgba(133, 133, 133, 0.1);
    width: ${({ isPushed }) => `${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px`};
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  top: 0;
  padding: 0px 24px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  height: 40px
`;

const PriceLink = styled.a`
  display: block;
  text-align: left;
  align-items: center;
  padding-left: 36px;
  svg {
    transition: transform 0.3s;
  }
  :hover {
    svg {
      transform: scale(1.2);
    }
  }
`;

const SkeletonWrapper = styled.div`
  padding-left: 36px;
`;

const Panel: React.FC<Props> = (props) => {
  const { isMobile, isPushed, showMenu, isDark, links, pushNav, login, logout, account, cakePriceUsd, cakePriceLink } = props;
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account);
  const accountEllipsis = account ? isMobile ? `${account.substring(0, 2)}...${account.substring(account.length - 4)}` : `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;
  const homeLink = links.find((link) => link.label === "Home");
  return (
    <StyledPanel isPushed={isPushed} showMenu={showMenu} isMobile={isMobile}>
      {isMobile ? 
        <FlexWrapper>
          <Logo
            isMobile={isMobile}
            isPushed={isPushed}
            togglePush={() => pushNav(false)}
            isDark={isDark}
            href={homeLink?.href ?? "/"}
          />
          <Wrapper>
          {account ? 
            <Button
              size="sm"
              onClick={() => {
                onPresentAccountModal();
              }}
              style={{marginRight: 8, background: "rgba(66, 117, 206, 0.4)"}}
            >
              {accountEllipsis}
            </Button> : 
            <Button onClick={() => onPresentConnectModal()} style={{height: 32, marginRight: 16}}>
              <MobileLoginButtonIcon width="25px" />
            </Button>
          }
          <MenuButton onClick={() => pushNav(false)}>
            <MobileCloseIcon width="32px" />
          </MenuButton>
          </Wrapper>
        </FlexWrapper> :
        <Logo
          isMobile={isMobile}
          isPushed={isPushed}
          togglePush={() => pushNav(false)}
          isDark={isDark}
          href={homeLink?.href ?? "/"}
        />
      }
      {isMobile &&
        <>
        {cakePriceUsd ? (
          <PriceLink href={cakePriceLink} target="_blank">
            <Text color="secondary" fontSize="10px">PANTHER</Text>
            <Text color="text" fontSize="16px">{`$${cakePriceUsd.toFixed(3)}`}</Text>
          </PriceLink>
        ) : (
          <SkeletonWrapper>
          <Skeleton width={80} height={24} />
          </SkeletonWrapper>
        )}
        </>
      }
      <PanelBody {...props} />
      <PanelFooter {...props} />
    </StyledPanel>
  );
};

export default Panel;
