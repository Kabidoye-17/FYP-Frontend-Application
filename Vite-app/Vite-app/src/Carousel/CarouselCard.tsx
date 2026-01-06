import styled from "styled-components";
import CarouselCardHeader from "./CarouselCardHeader";
import CarouselCardFooter from "./CarouselCardFooter";
import CarouselCardBody from "./CarouselCardBody";
import * as PhosphorIcons from '@phosphor-icons/react';

type IconName = keyof typeof PhosphorIcons;

const CardContainer = styled.div`
    width: 18em;
    height: 16em;
    border-radius: 15px;
`;

interface CarouselCardProps {
  title?: string;
  iconName?: IconName;
  description?: string;
  footerText?: string;
}

function CarouselCard({ title, iconName, description, footerText }: Readonly<CarouselCardProps>) {
  return (
    <CardContainer>
      <CarouselCardHeader title={title} />
      <CarouselCardBody description={description} iconName={iconName} />
      <CarouselCardFooter footerText={footerText} />
    </CardContainer>
  );
}
export default CarouselCard;