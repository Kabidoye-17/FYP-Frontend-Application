import styled from "styled-components";
import Icon from "../../design_system/Icon";
import * as PhosphorIcons from '@phosphor-icons/react';

export type IconName = keyof typeof PhosphorIcons;

const BodyContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: var(--white);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 0.95rem;
    color: var(--text-primary);
    text-align: center;
    box-shadow:
        rgba(0, 0, 0, 0.24) -3px 0px 8px,
        rgba(0, 0, 0, 0.24) 3px 0px 8px;
`;

const TextContainer = styled.div`
        width: 100%;
`;

const IconContainer = styled.div`
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface CarouselCardBodyProps {
  description?: string;
  iconName?: IconName;
}

function CarouselCardBody({ description, iconName }: Readonly<CarouselCardBodyProps>) {
  const displayIconName: IconName = iconName || "Folders";

  return (
    <BodyContainer>
        <IconContainer>
            <Icon name={displayIconName} size={48} color="var(--plum)" weight="regular" />
        </IconContainer>
        <TextContainer> {description} </TextContainer>
    </BodyContainer>
  );
}
export default CarouselCardBody;