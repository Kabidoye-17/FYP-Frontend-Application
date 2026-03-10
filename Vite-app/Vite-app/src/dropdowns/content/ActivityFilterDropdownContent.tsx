import * as Dropdown from "../../design_system/Dropdown";
import Icon from "../../design_system/Icon";
import styled from "styled-components";
import type { ActivityFilter } from "../../features/activity/ActivityFeed";

const DropdownContent = styled(Dropdown.Content)`
    z-index: 250;
    background-color: var(--white);
    min-width: 160px;
`;

const FilterItem = styled(Dropdown.Item)`
    position: relative;
    padding-right: 2rem;
`;

const ItemContent = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const CheckContainer = styled.div`
    position: absolute;
    right: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FilterLabel = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
`;

interface ActivityFilterDropdownContentProps {
    currentFilter: ActivityFilter;
    onFilterChange: (filter: ActivityFilter) => void;
}

const filters: { value: ActivityFilter; label: string; icon: string }[] = [
    { value: "all", label: "All activity", icon: "Activity" },
    { value: "issues", label: "Issues", icon: "Circle" },
    { value: "projects", label: "Projects", icon: "Folder" },
    { value: "comments", label: "Comments", icon: "ChatCircle" },
];

function ActivityFilterDropdownContent({
    currentFilter,
    onFilterChange,
}: Readonly<ActivityFilterDropdownContentProps>) {
    return (
        <DropdownContent sideOffset={5} align="end">
            {filters.map((filter) => {
                const isSelected = filter.value === currentFilter;

                return (
                    <FilterItem
                        key={filter.value}
                        onSelect={() => onFilterChange(filter.value)}
                    >
                        <ItemContent>
                            <Icon
                                name={filter.icon as any}
                                size={16}
                                color="var(--text-secondary)"
                                weight="regular"
                            />
                            <FilterLabel>{filter.label}</FilterLabel>
                        </ItemContent>
                        {isSelected && (
                            <CheckContainer>
                                <Icon
                                    name="Check"
                                    size={16}
                                    color="var(--plum)"
                                    weight="bold"
                                />
                            </CheckContainer>
                        )}
                    </FilterItem>
                );
            })}
        </DropdownContent>
    );
}

export default ActivityFilterDropdownContent;
