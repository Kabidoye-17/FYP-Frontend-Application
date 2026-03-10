import styled from "styled-components";

interface NotificationBadgeProps {
    count: number;
    max?: number;
}

const Badge = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 18px;
    height: 18px;
    padding: 0 0.375rem;
    background-color: var(--error-red);
    border-radius: 9px;
    font-family: "Inter", sans-serif;
    font-size: 0.625rem;
    font-weight: 600;
    color: var(--white);
`;

function NotificationBadge({ count, max = 99 }: NotificationBadgeProps) {
    const displayCount = count > max ? `${max}+` : count.toString();

    return <Badge>{displayCount}</Badge>;
}

export default NotificationBadge;
