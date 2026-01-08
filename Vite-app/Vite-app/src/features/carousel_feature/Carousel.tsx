import styled from 'styled-components';
import { useState } from 'react';
import type { IconName } from './CarouselCardBody';
import Button from '../../design_system/Button';
import Icon from '../../design_system/Icon';
import CarouselCard from './CarouselCard';

const CarouselSection = styled.div`
    width: 100%;
    padding: 2rem 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
    padding-bottom: 8rem;
`;

const CarouselContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    gap: 2rem;
`;

const CarouselTrack = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    position: relative;
`;

const CarouselItem = styled.div<{ $position: 'left' | 'center' | 'right' | 'hidden' }>`
    transition: all 0.5s ease;
    flex-shrink: 0;

    ${({ $position }) => {
        if ($position === 'center') {
            return `
                transform: scale(1);
                opacity: 1;
                z-index: 2;
            `;
        } else if ($position === 'left' || $position === 'right') {
            return `
                transform: scale(0.7);
                opacity: 0.5;
                z-index: 1;
            `;
        } else {
            return `
                display: none;
            `;
        }
    }}
`;

const NavButton = styled.div`
    z-index: 3;
`;
function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    
      const cardsData: Array<{
        title: string;
        iconName: IconName;
        description: string;
        footerText: string;
      }> = [
        {
          title: "Plan Smarter",
          iconName: "Brain",
          description: "Create detailed project plans with ease",
          footerText: "Learn More"
        },
        {
          title: "Track Progress",
          iconName: "Eyeglasses",
          description: "Monitor your team's performance in real-time",
          footerText: "Get Started"
        },
        {
          title: "Achieve Goals",
          iconName: "Crosshair",
          description: "Hit your targets with intelligent insights",
          footerText: "Try Now"
        }
      ];
    
      const totalCards = cardsData.length;
    
      const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
      };
    
      const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % totalCards);
      };
    
      const getCardPosition = (index: number): 'left' | 'center' | 'right' | 'hidden' => {
        const diff = (index - currentIndex + totalCards) % totalCards;
    
        if (diff === 0) return 'center';
        if (diff === 1 || diff === -(totalCards - 1)) return 'right';
        if (diff === totalCards - 1 || diff === -1) return 'left';
        return 'hidden';
      };
    
    return (
         <CarouselSection>
                <CarouselContainer>
                    <NavButton>
                        <Button
                            onClick={handlePrev}
                            IconOnly
                            backgroundColor='var(--tan)'
                            icon={<Icon name="CaretLeft" size={24} color="var(--white)" />}
                        />
                    </NavButton>
                    <CarouselTrack>
                        {cardsData.map((card, index) => (
                            <CarouselItem key={index} $position={getCardPosition(index)}>
                                <CarouselCard
                                    title={card.title}
                                    iconName={card.iconName}
                                    description={card.description}
                                    footerText={card.footerText}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselTrack>
                    <NavButton>
                        <Button
                            onClick={handleNext}
                            IconOnly
                            backgroundColor='var(--tan)'
                            icon={<Icon name="CaretRight" size={24} color="var(--white)" />}
                        />
                    </NavButton>
                </CarouselContainer>
            </CarouselSection>
    );
}   

export default Carousel;