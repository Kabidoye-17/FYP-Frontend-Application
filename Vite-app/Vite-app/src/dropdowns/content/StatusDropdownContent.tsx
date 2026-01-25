import * as Dropdown from "../../design_system/Dropdown";
import Icon from "../../design_system/Icon";
import styled from "styled-components";
import { statusIconMap, type StatusLevel } from "../../utils/issueIconMaps";

const ModalDropdownContent = styled(Dropdown.Content)`
    z-index: 250;
    background-color: var(--white);
`;

const StatusItem = styled(Dropdown.Item)`
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

const StatusLabel = styled.span`
    text-transform: capitalize;
`;

interface StatusDropdownContentProps {
    currentStatus: StatusLevel;
    onStatusChange: (status: StatusLevel) => void;
}

function StatusDropdownContent({ currentStatus, onStatusChange }: Readonly<StatusDropdownContentProps>) {
    const statuses = Object.keys(statusIconMap) as StatusLevel[];

    return (
        <ModalDropdownContent sideOffset={5} align="start">
            {statuses.map((status) => {
                const iconConfig = statusIconMap[status];
                const isSelected = status === currentStatus;

                return (
                    <StatusItem
                        key={status}
                        onSelect={() => onStatusChange(status)}
                    >
                        <ItemContent>
                            <Icon
                                name={iconConfig.iconName as any}
                                size={16}
                                color={iconConfig.color}
                                weight={iconConfig.weight}
                            />
                            <StatusLabel>{status}</StatusLabel>
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
                    </StatusItem>
                );
            })}
        </ModalDropdownContent>
    );
}

export default StatusDropdownContent;
