import React, { ComponentProps, FC } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

type NavItem = { link: string; label: string };

export const Navigation: FC<
  { items: NavItem[] } & ComponentProps<typeof Container>
> = ({ items, ...props }) => (
  <Container {...props}>
    {items.map((item, index) => (
      <NavLink key={index} to={item.link}>
        {item.label}
      </NavLink>
    ))}
  </Container>
);

const Container = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.dark["+3"]};
  border-bottom: solid 1px ${(p) => p.theme.dark["+4"]};
  height: 27px;
  top: 0;
  left: 0;
  right: 0;

  a {
    color: ${(p) => p.theme.grey["+6"]};
    text-decoration: none;
    display: flex;
    align-items: center;
    height: 100%;
    font-size: 12px;
    font-weight: 400;
    padding: 0 15px;

    &.active {
      color: ${(p) => p.theme.light["0"]};
      background-color: ${(props) => props.theme.dark["0"]};
    }

    &:hover:not(.active) {
      color: ${(p) => p.theme.light["-2"]};
      background-color: ${(p) => p.theme.dark["+1"]};
    }
  }
`;
