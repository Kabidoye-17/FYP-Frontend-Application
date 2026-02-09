import { forwardRef } from "react";
import styled from "styled-components";
import Icon from "../Icon";

type EmojiPickerTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const TriggerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background-color: transparent;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.15s ease;

  &:hover {
    background-color: var(--section-background);
    color: var(--text-primary);
  }

  &:focus {
    outline: 2px solid var(--plum);
    outline-offset: 1px;
  }
`;

const EmojiPickerTrigger = forwardRef<HTMLButtonElement, EmojiPickerTriggerProps>(
  (props, ref) => {
    return (
      <TriggerButton ref={ref} type="button" {...props}>
        <Icon name="Smiley" size={20} weight="regular" />
      </TriggerButton>
    );
  }
);

EmojiPickerTrigger.displayName = "EmojiPickerTrigger";

export default EmojiPickerTrigger;
