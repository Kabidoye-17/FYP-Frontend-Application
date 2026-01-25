import * as Dropdown from "../../design_system/Dropdown";
import Icon from "../../design_system/Icon";
import styled from "styled-components";
import { priorityIconMap, type PriorityLevel } from "../../utils/issueIconMaps";

const ModalDropdownContent = styled(Dropdown.Content)`
    z-index: 250;
    background-color: var(--white);
`;

const PriorityItem = styled(Dropdown.Item)`
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

const PriorityLabel = styled.span`
    text-transform: capitalize;
`;

interface PriorityDropdownContentProps {
    currentPriority: PriorityLevel;
    onPriorityChange: (priority: PriorityLevel) => void;
}

function PriorityDropdownContent({ currentPriority, onPriorityChange }: Readonly<PriorityDropdownContentProps>) {
    const priorities = Object.keys(priorityIconMap) as PriorityLevel[];

    return (
        <ModalDropdownContent sideOffset={5} align="start">
            {priorities.map((priority) => {
                const iconConfig = priorityIconMap[priority];
                const isSelected = priority === currentPriority;

                return (
                    <PriorityItem
                        key={priority}
                        onSelect={() => onPriorityChange(priority)}
                    >
                        <ItemContent>
                            <Icon
                                name={iconConfig.iconName as any}
                                size={16}
                                color={iconConfig.color}
                                weight={iconConfig.weight}
                            />
                            <PriorityLabel>{priority}</PriorityLabel>
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
                    </PriorityItem>
                );
            })}
        </ModalDropdownContent>
    );
}

export default PriorityDropdownContent;
