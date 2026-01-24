import * as SwitchPrimitive from "@radix-ui/react-switch";
import styled from "styled-components";

export const Root = styled(SwitchPrimitive.Root)`
  all: unset;
  width: 42px;
  height: 25px;
  background-color: var(--section-background);
  border-radius: 9999px;
  position: relative;
  top: -14px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--section-background);
  }

  &[data-state="checked"] {
    background-color: var(--tan);
  }

  &[data-state="checked"]:hover {
    background-color: var(--tan);
    filter: brightness(1.1);
  }

  &:focus-visible {
    outline: 2px solid var(--tan);
    outline-offset: 2px;
  }

  &[data-disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const Thumb = styled(SwitchPrimitive.Thumb)`
  display: block;
  width: 21px;
  height: 21px;
  background-color: var(--white);
  border-radius: 9999px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
  transform: translateX(2px);
  will-change: transform;

  &[data-state="checked"] {
    transform: translateX(19px);
  }
`;
