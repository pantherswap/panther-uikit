import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { SvgProps } from "../../components/Svg";
import * as IconModule from "./icons";
import Accordion from "./Accordion";
import { MenuEntry, LinkLabel } from "./MenuEntry";
import MenuLink from "./MenuLink";
import { PanelProps, PushedProps } from "./types";

interface Props extends PanelProps, PushedProps {
  isMobile: boolean;
}

const Icons = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> };

const Container = styled.div<{ isMobile: boolean}>`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  padding-left: 22px;
  padding-right: 22px;
  padding-top: ${({ isMobile }) => isMobile ? '8px' : '32px'};
`;

const Divider = styled.hr`
  width: 100%;
  background-color: #6BA1FF;
  opacity: 0.2;
  margin-left: 0;
`;

const PanelBody: React.FC<Props> = ({ isPushed, pushNav, isMobile, links }) => {
  const location = useLocation();
  
  // Close the menu when a user clicks a link on mobile
  const handleClick = isMobile ? () => pushNav(false) : undefined;

  return (
    <Container isMobile={isMobile}>
      {links.map((entry, index) => {
        if(isMobile){
          if(index === 0 || index === 1 || index === 2 || index === 3 || index === 4 || index === 5){
            return false;
          }
        }
        if(entry.label === 'Divider'){
          return <Divider key={index} />
        }
        const Icon = Icons[entry.icon];
        const iconElement = <Icon width="24px" />;
        const calloutClass = entry.calloutClass ? entry.calloutClass : undefined;
        if (entry.items) {
          const itemsMatchIndex = entry.items.findIndex((item) => item.href === location.pathname);
          const initialOpenState = entry.initialOpenState === true ? entry.initialOpenState : itemsMatchIndex >= 0;

          return (
            <Accordion
              key={entry.label}
              isMobile={isMobile}
              isPushed={isPushed}
              pushNav={pushNav}
              icon={iconElement}
              label={entry.label}
              initialOpenState={initialOpenState}
              className={calloutClass}
            >
              {isPushed &&
                entry.items.map((item) => (
                  <MenuEntry key={item.href} isMobile={isMobile} isPushed={isPushed} secondary isActive={item.href === location.pathname} onClick={handleClick}>
                    <MenuLink href={item.href}>{item.label}</MenuLink>
                  </MenuEntry>
                ))}
            </Accordion>
          );
        }
        return (
          <MenuEntry key={entry.label} isMobile={isMobile} isPushed={isPushed} isActive={entry.href === location.pathname} className={calloutClass}>
            <MenuLink href={entry.href} onClick={handleClick} style={{width: isPushed ? '100%' : 'unset'}}>
              {iconElement}
              {isPushed && <LinkLabel isMobile={isMobile} isPushed={isPushed}>{entry.label}</LinkLabel>}
            </MenuLink>
          </MenuEntry>
        );
      })}
    </Container>
  );
};

export default PanelBody;
