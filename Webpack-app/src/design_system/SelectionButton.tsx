import styled from "styled-components";
import Icon from "./Icon";
import { forwardRef } from "react";

const StyledButton = styled.button<{ $backgroundColor?: string }>`
  all: unset;
  width: 6rem;
  height: 1.75rem;
  background-color: ${props => props.$backgroundColor || 'var(--white)'};
  border: 1px solid var(--text-secondary);
  border-radius: 6px;
  padding: 0.4rem 0.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-family: "Inter", sans-serif;
  font-size: 0.875rem;
  color: var(--text-primary);
  transition: filter 0.15s ease;
  box-sizing: border-box;
  position: relative;
  top: -8px;

  &:hover {
    filter: brightness(0.98);
  }

  &:focus {
    outline: 2px solid var(--plum);
    outline-offset: 2px;
  }
`;

const ValueText = styled.span`
  flex: 1;
  text-align: left;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface SelectionButtonProps {
  value: string;
  onClick?: () => void;
  backgroundColor?: string;
}

const SelectionButton = forwardRef<HTMLButtonElement, SelectionButtonProps>(
  ({ value, onClick, backgroundColor, ...props }, ref) => {
    return (
      <StyledButton ref={ref} onClick={onClick} $backgroundColor={backgroundColor} {...props}>
        <ValueText>{value}</ValueText>
        <IconContainer>
          <Icon name="CaretDown" size={16} color="var(--text-secondary)" weight="regular" />
        </IconContainer>
      </StyledButton>
    );
  }
);

SelectionButton.displayName = "SelectionButton";

export default SelectionButton;
