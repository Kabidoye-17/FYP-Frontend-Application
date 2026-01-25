import styled from "styled-components";
import Icon from "../../design_system/Icon";
import { forwardRef } from "react";
import { getStatusIcon, type StatusLevel } from "../../utils/issueIconMaps";

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

const StatusText = styled.span`
    flex: 1;
    text-align: left;
    text-transform: capitalize;
`;


interface SmallStatusOpenerProps {
    status: StatusLevel;
}

const SmallStatusOpener = forwardRef<HTMLButtonElement, SmallStatusOpenerProps>(
    ({ status, ...props }, ref) => {
        const statusIcon = getStatusIcon(status);

        return (
            <OpenerButton ref={ref} {...props}>
                <IconContainer>
                    {statusIcon && (
                        <Icon
                            name={statusIcon.iconName as any}
                            size={16}
                            color={statusIcon.color}
                            weight={statusIcon.weight}
                        />
                    )}
                </IconContainer>
                <StatusText>{status}</StatusText>
            </OpenerButton>
        );
    }
);

SmallStatusOpener.displayName = "SmallStatusOpener";

export default SmallStatusOpener;
