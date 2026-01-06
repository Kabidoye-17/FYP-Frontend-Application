import * as PhosphorIcons from '@phosphor-icons/react';
import type { IconProps as PhosphorIconProps } from '@phosphor-icons/react';

type IconName = keyof typeof PhosphorIcons;

interface IconProps extends PhosphorIconProps {
  name: IconName;
}

const Icon: React.FC<IconProps> = ({
  name,
  color = '#ffffff',
  size = 24,
  weight = 'regular',
  ...props
}) => {
  const PhosphorIcon =
    PhosphorIcons[name] as React.ComponentType<PhosphorIconProps>;

  return (
    <PhosphorIcon
      color={color}
      size={size}
      weight={weight}
      {...props}
    />
  );
};

export default Icon;
