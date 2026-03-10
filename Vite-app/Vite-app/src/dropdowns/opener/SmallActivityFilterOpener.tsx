import styled from "styled-components";
import Icon from "../../design_system/Icon";
import { forwardRef } from "react";
import type { ActivityFilter } from "../../features/activity/ActivityFeed";

const OpenerButton = styled.button`
    all: unset;
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.5rem;
    background-color: transparent;
    border-radius: 4px;
    cursor: pointer;
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
    transition: background-color 0.15s ease;

    &:hover {
        background-color: var(--section-background);
        color: var(--text-primary);
    }

    &:focus {
        outline: 2px solid var(--plum);
        outline-offset: 2px;
    }
`;

const FilterText = styled.span`
    text-transform: capitalize;
`;

const filterLabels: Record<ActivityFilter, string> = {
    all: "All activity",
    issues: "Issues",
    projects: "Projects",
    comments: "Comments",
};

interface SmallActivityFilterOpenerProps {
    filter: ActivityFilter;
}

const SmallActivityFilterOpener = forwardRef<HTMLButtonElement, SmallActivityFilterOpenerProps>(
    ({ filter, ...props }, ref) => {
        return (
            <OpenerButton ref={ref} {...props}>
                <Icon
                    name="Funnel"
                    size={14}
                    color="currentColor"
                    weight="regular"
                />
                <FilterText>{filterLabels[filter]}</FilterText>
                <Icon
                    name="CaretDown"
                    size={10}
                    color="currentColor"
                    weight="bold"
                />
            </OpenerButton>
        );
    }
);

SmallActivityFilterOpener.displayName = "SmallActivityFilterOpener";

export default SmallActivityFilterOpener;
