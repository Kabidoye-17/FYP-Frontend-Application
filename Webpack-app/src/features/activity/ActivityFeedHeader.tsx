import styled from "styled-components";
import * as Dropdown from "../../design_system/Dropdown";
import SmallActivityFilterOpener from "../../dropdowns/opener/SmallActivityFilterOpener";
import ActivityFilterDropdownContent from "../../dropdowns/content/ActivityFilterDropdownContent";
import type { ActivityFilter } from "./ActivityFeed";

interface ActivityFeedHeaderProps {
    filter: ActivityFilter;
    onFilterChange: (filter: ActivityFilter) => void;
}

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid var(--section-background);
`;

const Title = styled.h3`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
`;

function ActivityFeedHeader({
    filter,
    onFilterChange,
}: ActivityFeedHeaderProps) {
    return (
        <HeaderContainer>
            <Title>Activity</Title>
            <Dropdown.Root>
                <Dropdown.Trigger asChild>
                    <SmallActivityFilterOpener filter={filter} />
                </Dropdown.Trigger>
                <Dropdown.Portal>
                    <ActivityFilterDropdownContent
                        currentFilter={filter}
                        onFilterChange={onFilterChange}
                    />
                </Dropdown.Portal>
            </Dropdown.Root>
        </HeaderContainer>
    );
}

export default ActivityFeedHeader;
