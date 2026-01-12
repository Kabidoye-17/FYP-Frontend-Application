import styled from "styled-components";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

export const Root = DropdownMenuPrimitive.Root;
export const Trigger = DropdownMenuPrimitive.Trigger;
export const Portal = DropdownMenuPrimitive.Portal;
export const Sub = DropdownMenuPrimitive.Sub;
export const SubTrigger = DropdownMenuPrimitive.SubTrigger;
export const RadioGroup = DropdownMenuPrimitive.RadioGroup;
export const Group = DropdownMenuPrimitive.Group;

export const Content = styled(DropdownMenuPrimitive.Content)`
  min-width: 220px;
  background-color: var(--section-background);
  border-radius: 8px;
  padding: 0.5rem;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2),
    0 0 0 1px rgba(0, 0, 0, 0.05);
  z-index: 50;
`;

export const SubContent = styled(DropdownMenuPrimitive.SubContent)`
  min-width: 220px;
  background-color: var(--section-background);
  border-radius: 8px;
  padding: 0.5rem;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2),
    0 0 0 1px rgba(0, 0, 0, 0.05);
  z-index: 50;
`;

export const Item = styled(DropdownMenuPrimitive.Item)`
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

  &[data-disabled] {
    color: var(--text-secondary);
    pointer-events: none;
  }
`;

export const CheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem)`
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

  &:hover {
    background-color: var(--page-background);
    outline: none;
  }

  &:focus {
    background-color: var(--page-background);
  }
`;

export const RadioItem = styled(DropdownMenuPrimitive.RadioItem)`
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

  &:hover {
    background-color: var(--page-background);
    outline: none;
  }

  &:focus {
    background-color: var(--page-background);
  }
`;

export const ItemIndicator = styled(DropdownMenuPrimitive.ItemIndicator)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
`;

export const Separator = styled(DropdownMenuPrimitive.Separator)`
  height: 1px;
  background-color: var(--border-color);
  margin: 0.5rem 0;
`;

export const Label = styled(DropdownMenuPrimitive.Label)`
  padding: 0.5rem 0.75rem 0.25rem;
  font-family: "Inter", sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.025em;
`;

export const Arrow = styled(DropdownMenuPrimitive.Arrow)`
  fill: var(--section-background);
`;
