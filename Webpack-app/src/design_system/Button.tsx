import type { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  IconOnly?: boolean;
  backgroundColor?: string;
  color?: string;
}

const StyledButton = styled.button<{ $iconOnly: boolean, backgroundColor?: string; color?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: ${({ $iconOnly }) => ($iconOnly ? '0.5rem' : '0.5rem 1rem')};
  background-color: ${({ backgroundColor }) => backgroundColor || 'var(--white)'};
  color: ${({ color }) => color || 'var(--black)'};
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;


 & {
  transition: transform 0.2s ease, filter 0.2s ease;
}

&:hover {
  transform: translateY(-3px); /* moves up by 3px */
  filter: brightness(0.95);
}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

function Button({
  icon = null,
  rightIcon = null,
  IconOnly = false,
  backgroundColor,
  color,
  children,
  ...props
}: Readonly<ButtonProps>) {

  const displayIcon = icon || rightIcon;
  const isRightIcon = !icon && rightIcon;

  return (
    <StyledButton $iconOnly={IconOnly} backgroundColor={backgroundColor} color={color} {...props}>
      {!isRightIcon && displayIcon}
      {!IconOnly && children}
      {isRightIcon && displayIcon}
    </StyledButton>
  );
}

export default Button;
