import React from "react";
import styled from "styled-components";
import { PancakeRoundIcon, SvgProps } from "../../components/Svg";
import Text from "../../components/Text/Text";
import Flex from "../../components/Flex/Flex";
import Dropdown from "../../components/Dropdown/Dropdown";
import Link from "../../components/Link/Link";
import Button from "../../components/Button/Button";
import IconButton from "../../components/Button/IconButton";
import MenuButton from "./MenuButton";
import * as IconModule from "./icons";
import { socials, MENU_ENTRY_HEIGHT } from "./config";
import { PanelProps, PushedProps } from "./types";
import { HamburgerIcon } from "./icons";

interface Props extends PanelProps, PushedProps {
  isMobile: boolean;
}

const Icons = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> };
const { LanguageIcon } = Icons;

const Container = styled.div<{ isMobile: boolean }>`
  flex: none;
  padding-top: 8px;
  padding-bottom: ${({isMobile}) => isMobile ? '42px' : '40px'};
  background-color: 'transparent';
`;

const SettingsEntry = styled.div<{ isMobile: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ isMobile }) => isMobile ? 'center' : 'space-between'};
  height: ${MENU_ENTRY_HEIGHT}px;
  padding: 0 12px;
`;

const SocialEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${MENU_ENTRY_HEIGHT}px;
  padding: 0 16px;
  padding-left: 20px;
`;

const CustomFlex = styled(Flex)<{ isMobile: boolean }>`
  padding-left: ${({ isMobile }) => isMobile ? '33px' : '12px'}
`;

const PanelFooter: React.FC<Props> = ({
  isPushed,
  pushNav,
  toggleTheme,
  isDark,
  cakePriceUsd,
  cakePriceLink,
  currentLang,
  langs,
  setLang,
  isMobile,
}) => {
  if (!isPushed) {
    return (
      <Container isMobile={isMobile}>
        <IconButton variant="text" onClick={() => pushNav(true)} style={{paddingLeft: '38px'}}>
          <HamburgerIcon color="text" />
        </IconButton>
      </Container>
    );
  }

  return (
    <Container isMobile={isMobile}>
      <SettingsEntry isMobile={isMobile}>
        {/*<Button variant="text" onClick={() => toggleTheme(!isDark)}>*/}
        {/*/!* alignItems center is a Safari fix *!/*/}
        {/*<Flex alignItems="center">*/}
        {/*<SunIcon color={isDark ? "textDisabled" : "text"} width="24px" />*/}
        {/*<Text color="textDisabled" mx="4px">*/}
        {/*/*/}
        {/*</Text>*/}
        {/*<MoonIcon color={isDark ? "text" : "textDisabled"} width="24px" />*/}
        {/*</Flex>*/}
        {/*</Button>*/}
        <CustomFlex isMobile={isMobile}>
          {socials.map((social, index) => {
            const Icon = Icons[social.icon];
            let iconProps = { width: "24px", color: "textSubtle", style: { cursor: "pointer" } };
            if(isMobile)
              iconProps = { width: "32px", color: "textSubtle", style: { cursor: "pointer" } };
            const mr = index < socials.length - 1 ? "8px" : 0;
            if (social.items) {
              return (
                <Dropdown
                  key={social.label}
                  position="top"
                  target={<Icon {...iconProps} mr={mr} style={{ display: "flex", alignItems: "center" }} />}
                >
                  {social.items.map((item) => (
                    <Link external key={item.label} href={item.href} aria-label={item.label} color="textSubtle">
                      {item.label}
                    </Link>
                  ))}
                </Dropdown>
              );
            }
            return (
              <Link external key={social.label} href={social.href} aria-label={social.label} mr={mr}>
                <Icon {...iconProps} />
              </Link>
            );
          })}
        </CustomFlex>
        <SocialEntry>
          <Dropdown
            position="top-right"
            target={
              <Button variant="text" style={{ borderLeft: "1px solid #FCFCFC", borderRadius: 0, height: 25 }}>
                <Text color="text">{currentLang?.toUpperCase()}</Text>
              </Button>
            }
          >
            {langs.map((lang) => (
              <MenuButton
                key={lang.code}
                fullWidth
                onClick={() => setLang(lang)}
                // Safari fix
                style={{ minHeight: "32px", height: "auto" }}
              >
                {lang.language}
              </MenuButton>
            ))}
          </Dropdown>
        </SocialEntry>
      </SettingsEntry>
    </Container>
  );
};

export default PanelFooter;
