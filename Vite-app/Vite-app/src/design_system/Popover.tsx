import styled from "styled-components";
import * as PopoverPrimitive from "@radix-ui/react-popover";

export const Root = PopoverPrimitive.Root;
export const Trigger = PopoverPrimitive.Trigger;
export const Portal = PopoverPrimitive.Portal;
export const Close = PopoverPrimitive.Close;

export const Content = styled(PopoverPrimitive.Content)<{ $backgroundColor?: string }>`
  min-width: 220px;
  background-color: ${props => props.$backgroundColor || 'var(--section-background)'};
  border-radius: 8px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2),
    0 0 0 1px rgba(0, 0, 0, 0.05);
  z-index: 100;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;

  &[data-state="open"][data-side="top"] {
    animation-name: slideDownAndFade;
  }
  &[data-state="open"][data-side="right"] {
    animation-name: slideLeftAndFade;
  }
  &[data-state="open"][data-side="bottom"] {
    animation-name: slideUpAndFade;
  }
  &[data-state="open"][data-side="left"] {
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

export const Arrow = styled(PopoverPrimitive.Arrow)<{ $backgroundColor?: string }>`
  fill: ${props => props.$backgroundColor || 'var(--section-background)'};
`;

export const Item = styled.div`
  all: unset;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  font-family: "Inter", sans-serif;
  font-size: 0.875rem;
  color: var(--text-primary);
  transition: background-color 0.15s ease;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

  &:hover {
    background-color: var(--page-background);
    outline: none;
  }

  &:focus {
    background-color: var(--page-background);
  }
`;
