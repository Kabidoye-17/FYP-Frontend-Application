import styled from "styled-components";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

type AvatarSize = "xsmall" | "small" | "medium" | "large";

interface AvatarProps {
  size: AvatarSize;
  color: string;
  name: string;
}

const sizeMap = {
  xsmall: "24px",
  small: "32px",
  medium: "48px",
  large: "64px",
};

const fontSizeMap = {
xsmall: "0.75rem",
  small: "0.875rem",
  medium: "1.125rem",
  large: "1.5rem",
};

const StyledAvatarRoot = styled(AvatarPrimitive.Root)<{ $size: AvatarSize }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  user-select: none;
  width: ${(props) => sizeMap[props.$size]};
  height: ${(props) => sizeMap[props.$size]};
  border-radius: 50%;
`;

const StyledAvatarFallback = styled(AvatarPrimitive.Fallback)<{
  $size: AvatarSize;
  $color: string;
}>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.$color};
  color: var(--text-primary);
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: ${(props) => fontSizeMap[props.$size]};
`;

function Avatar({ size, color, name }: Readonly<AvatarProps>) {
  return (
    <StyledAvatarRoot $size={size}>
      <StyledAvatarFallback $size={size} $color={color}>
        {name.charAt(0).toUpperCase()}
      </StyledAvatarFallback>
    </StyledAvatarRoot>
  );
}

export default Avatar;
