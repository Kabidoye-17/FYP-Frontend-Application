import styled from "styled-components";
import Icon from "../../design_system/Icon";
import { forwardRef } from "react";
import type { Label } from "../../utils/labelData";

const OpenerButton = styled.button`
    all: unset;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    height: 40px;
    background-color: var(--white);
    border: 1px solid var(--section-background);
    border-radius: 6px;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    color: var(--text-primary);
    transition: background-color 0.15s ease;
    min-width: 100px;
    box-sizing: border-box;

    &:hover {
        background-color: var(--section-background);
    }

    &:focus {
        outline: 2px solid var(--plum);
        outline-offset: 2px;
    }
`;

const LabelText = styled.span`
    color: var(--text-secondary);
`;

const SingleLabelContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const SingleLabelName = styled.span`
    font-size: 0.875rem;
    color: var(--text-primary);
`;

const OverlappingDotsContainer = styled.div`
    display: flex;
    align-items: center;
`;

const ColorDot = styled.div<{ $color: string; $overlap?: boolean }>`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${({ $color }) => $color};
    border: 1.5px solid var(--white);
    margin-left: ${({ $overlap }) => ($overlap ? '-4px' : '0')};
    position: relative;
`;

const CountText = styled.span`
    font-size: 0.875rem;
    color: var(--text-primary);
    margin-left: 0.5rem;
`;

interface SmallLabelsOpenerProps {
    selectedLabels: Label[];
}

const SmallLabelsOpener = forwardRef<HTMLButtonElement, SmallLabelsOpenerProps>(
    ({ selectedLabels, ...props }, ref) => {
        const labelCount = selectedLabels.length;
        const visibleDots = selectedLabels.slice(0, 3);

        const renderContent = () => {
            if (labelCount === 0) {
                return (
                    <>
                        <Icon name="Tag" size={16} color="var(--text-secondary)" weight="regular" />
                        <LabelText>Labels</LabelText>
                    </>
                );
            }

            if (labelCount === 1) {
                return (
                    <SingleLabelContainer>
                        <ColorDot $color={selectedLabels[0].color} />
                        <SingleLabelName>{selectedLabels[0].name}</SingleLabelName>
                    </SingleLabelContainer>
                );
            }

            return (
                <OverlappingDotsContainer>
                    {visibleDots.map((label, index) => (
                        <ColorDot
                            key={label.id}
                            $color={label.color}
                            $overlap={index > 0}
                        />
                    ))}
                    <CountText>{labelCount}+</CountText>
                </OverlappingDotsContainer>
            );
        };

        return (
            <OpenerButton ref={ref} {...props}>
                {renderContent()}
            </OpenerButton>
        );
    }
);

SmallLabelsOpener.displayName = "SmallLabelsOpener";

export default SmallLabelsOpener;
