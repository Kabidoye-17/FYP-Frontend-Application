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
    font-family: 'Inter', sans-serif;
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

const DateText = styled.span<{ $hasDate: boolean }>`
    flex: 1;
    text-align: left;
    color: ${({ $hasDate }) => $hasDate ? 'var(--text-primary)' : 'var(--text-secondary)'};
`;

interface SmallTargetDateOpenerProps {
    selectedDate: Date | null;
}

function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }).format(date);
}

const SmallTargetDateOpener = forwardRef<HTMLButtonElement, SmallTargetDateOpenerProps>(
    ({ selectedDate, ...props }, ref) => {
        const hasDate = selectedDate !== null;
        const displayText = hasDate ? formatDate(selectedDate) : 'Target';

        return (
            <OpenerButton ref={ref} {...props}>
                <IconContainer>
                    <Icon
                        name="Timer"
                        size={16}
                        color={hasDate ? 'var(--text-primary)' : 'var(--text-secondary)'}
                    />
                </IconContainer>
                <DateText $hasDate={hasDate}>{displayText}</DateText>
            </OpenerButton>
        );
    }
);

SmallTargetDateOpener.displayName = "SmallTargetDateOpener";

export default SmallTargetDateOpener;
