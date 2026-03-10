import styled from "styled-components";
import Icon from "../../design_system/Icon";
import { forwardRef } from "react";

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
    min-width: 80px;
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

const EstimateText = styled.span`
    flex: 1;
    text-align: left;
`;

const NoEstimate = styled.span`
    color: var(--text-secondary);
`;

interface SmallTimeEstimateOpenerProps {
    estimate: number | null; // in hours
}

const SmallTimeEstimateOpener = forwardRef<HTMLButtonElement, SmallTimeEstimateOpenerProps>(
    ({ estimate, ...props }, ref) => {
        const formatEstimate = (hours: number) => {
            if (hours < 1) {
                return `${Math.round(hours * 60)}m`;
            }
            return `${hours}h`;
        };

        return (
            <OpenerButton ref={ref} {...props}>
                <IconContainer>
                    <Icon
                        name="Hourglass"
                        size={16}
                        color={estimate ? "var(--plum)" : "var(--text-secondary)"}
                        weight="regular"
                    />
                </IconContainer>
                <EstimateText>
                    {estimate ? (
                        formatEstimate(estimate)
                    ) : (
                        <NoEstimate>Add estimate</NoEstimate>
                    )}
                </EstimateText>
            </OpenerButton>
        );
    }
);

SmallTimeEstimateOpener.displayName = "SmallTimeEstimateOpener";

export default SmallTimeEstimateOpener;
