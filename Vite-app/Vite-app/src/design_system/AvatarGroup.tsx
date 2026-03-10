import styled from "styled-components";
import Avatar from "./Avatar";
import * as Tooltip from "./Tooltip";

type AvatarSize = "xsmall" | "small" | "medium" | "large";

export interface User {
    id: string;
    name: string;
    color: string;
}

interface AvatarGroupProps {
    users: User[];
    size?: AvatarSize;
    maxVisible?: number;
}

const sizeMap = {
    xsmall: "24px",
    small: "32px",
    medium: "48px",
    large: "64px",
};

const fontSizeMap = {
    xsmall: "0.75rem",
    small: "0.875rem",
    medium: "1.125rem",
    large: "1.5rem",
};

const GroupContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: default;
`;

const AvatarWrapper = styled.div<{ $index: number; $size: AvatarSize }>`
    display: inline-flex;
    position: relative;
    margin-left: ${(props) => (props.$index === 0 ? "0" : "-8px")};
    z-index: ${(props) => 100 - props.$index};
    border: 2px solid var(--white);
    border-radius: 50%;
    box-sizing: content-box;
`;

const Badge = styled.div<{ $size: AvatarSize }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${(props) => sizeMap[props.$size]};
    height: ${(props) => sizeMap[props.$size]};
    background-color: var(--light-plum);
    color: var(--text-primary);
    font-family: "Inter", sans-serif;
    font-size: ${(props) => fontSizeMap[props.$size]};
    font-weight: 600;
    border-radius: 50%;
    border: 2px solid var(--white);
    box-sizing: content-box;
    margin-left: -8px;
    z-index: 97;
`;

const TooltipContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    max-width: 200px;
`;

const UserName = styled.span`
    font-size: 0.8125rem;
    color: var(--text-primary);
`;

function AvatarGroup({ users, size = "xsmall", maxVisible = 3 }: Readonly<AvatarGroupProps>) {
    if (!users || users.length === 0) {
        return null;
    }

    const visibleUsers = users.slice(0, maxVisible);
    const remainingCount = users.length - maxVisible;
    const shouldShowBadge = remainingCount > 0;

    return (
        <Tooltip.Provider delayDuration={200}>
            <Tooltip.Root>
                <Tooltip.Trigger>
                    <GroupContainer>
                        {visibleUsers.map((user, index) => (
                            <AvatarWrapper key={user.id} $index={index} $size={size}>
                                <Avatar size={size} color={user.color} name={user.name} />
                            </AvatarWrapper>
                        ))}
                        {shouldShowBadge && (
                            <Badge $size={size}>+{remainingCount}</Badge>
                        )}
                    </GroupContainer>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content sideOffset={5}>
                        <TooltipContent>
                            {users.map((user) => (
                                <UserName key={user.id}>{user.name}</UserName>
                            ))}
                        </TooltipContent>
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
}

export default AvatarGroup;
