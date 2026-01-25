import styled from "styled-components";
import Icon from "../../design_system/Icon";
import { forwardRef } from "react";
import { getPriorityIcon, type PriorityLevel } from "../../utils/issueIconMaps";

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

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
`;

const PriorityText = styled.span`
    flex: 1;
    text-align: left;
    text-transform: capitalize;
`;

interface SmallPriorityOpenerProps {
    priority: PriorityLevel;
}

const SmallPriorityOpener = forwardRef<HTMLButtonElement, SmallPriorityOpenerProps>(
    ({ priority, ...props }, ref) => {
        const priorityIcon = getPriorityIcon(priority);

        return (
            <OpenerButton ref={ref} {...props}>
                <IconContainer>
                    {priorityIcon && (
                        <Icon
                            name={priorityIcon.iconName as any}
                            size={16}
                            color={priorityIcon.color}
                            weight={priorityIcon.weight}
                        />
                    )}
                </IconContainer>
                <PriorityText>{priority}</PriorityText>
            </OpenerButton>
        );
    }
);

SmallPriorityOpener.displayName = "SmallPriorityOpener";

export default SmallPriorityOpener;
