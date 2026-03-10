import styled from "styled-components";
import Icon from "../../design_system/Icon";
import { forwardRef } from "react";
import type { TimeframeOption } from "../../pages/RoadmapPage";

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
    font-family: "Inter", sans-serif;
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

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
`;

const TimeframeText = styled.span`
    flex: 1;
    text-align: left;
    text-transform: capitalize;
`;

const timeframeLabels: Record<TimeframeOption, string> = {
    month: "Monthly",
    quarter: "Quarterly",
    year: "Yearly",
};

interface SmallTimeframeOpenerProps {
    timeframe: TimeframeOption;
}

const SmallTimeframeOpener = forwardRef<HTMLButtonElement, SmallTimeframeOpenerProps>(
    ({ timeframe, ...props }, ref) => {
        return (
            <OpenerButton ref={ref} {...props}>
                <IconContainer>
                    <Icon
                        name="Calendar"
                        size={16}
                        color="var(--text-secondary)"
                        weight="regular"
                    />
                </IconContainer>
                <TimeframeText>{timeframeLabels[timeframe]}</TimeframeText>
                <Icon
                    name="CaretDown"
                    size={12}
                    color="var(--text-secondary)"
                    weight="bold"
                />
            </OpenerButton>
        );
    }
);

SmallTimeframeOpener.displayName = "SmallTimeframeOpener";

export default SmallTimeframeOpener;
