import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import styled from "styled-components";

export const Provider = TooltipPrimitive.Provider;

export const Root = TooltipPrimitive.Root;

export const Trigger = styled(TooltipPrimitive.Trigger)`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const Portal = TooltipPrimitive.Portal;

export const Content = styled(TooltipPrimitive.Content)`
  background-color: var(--white);
  color: var(--text-primary);
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  font-size: 0.8125rem;
  font-family: "Inter", sans-serif;
  line-height: 1.4;
  box-shadow:
    0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2),
    0 0 0 1px rgba(0, 0, 0, 0.05);
  user-select: none;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  z-index: 1000;
  max-width: 300px;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;

  &[data-state="delayed-open"][data-side="top"] {
    animation-name: slideDownAndFade;
  }
  &[data-state="delayed-open"][data-side="right"] {
    animation-name: slideLeftAndFade;
  }
  &[data-state="delayed-open"][data-side="bottom"] {
    animation-name: slideUpAndFade;
  }
  &[data-state="delayed-open"][data-side="left"] {
    animation-name: slideRightAndFade;
  }

  @keyframes slideUpAndFade {
    from {
      opacity: 0;
      transform: translateY(2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideRightAndFade {
    from {
      opacity: 0;
      transform: translateX(-2px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideDownAndFade {
    from {
      opacity: 0;
      transform: translateY(-2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideLeftAndFade {
    from {
      opacity: 0;
      transform: translateX(2px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

export const Arrow = styled(TooltipPrimitive.Arrow)`
  fill: var(--white);
`;
