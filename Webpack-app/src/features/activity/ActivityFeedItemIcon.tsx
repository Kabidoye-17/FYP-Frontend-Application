import styled from "styled-components";
import Icon from "../../design_system/Icon";
import type { ActivityItem } from "./ActivityFeed";

interface ActivityFeedItemIconProps {
    type: ActivityItem["type"];
}

const IconContainer = styled.div<{ $bgColor: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: ${({ $bgColor }) => $bgColor};
    border: 2px solid var(--white);
`;

function ActivityFeedItemIcon({ type }: ActivityFeedItemIconProps) {
    const getIconConfig = () => {
        switch (type) {
            case "created":
                return {
                    name: "Plus",
                    color: "var(--white)",
                    bgColor: "var(--success-green)",
                };
            case "updated":
                return {
                    name: "PencilSimple",
                    color: "var(--white)",
                    bgColor: "var(--plum)",
                };
            case "commented":
                return {
                    name: "ChatCircle",
                    color: "var(--white)",
                    bgColor: "var(--tan)",
                };
            case "assigned":
                return {
                    name: "UserPlus",
                    color: "var(--white)",
                    bgColor: "var(--light-plum)",
                };
            case "status_changed":
                return {
                    name: "ArrowsClockwise",
                    color: "var(--white)",
                    bgColor: "var(--warning-orange)",
                };
            case "completed":
                return {
                    name: "Check",
                    color: "var(--white)",
                    bgColor: "var(--success-green)",
                };
            default:
                return {
                    name: "Circle",
                    color: "var(--white)",
                    bgColor: "var(--text-secondary)",
                };
        }
    };

    const config = getIconConfig();

    return (
        <IconContainer $bgColor={config.bgColor}>
            <Icon
                name={config.name as any}
                size={10}
                color={config.color}
                weight="bold"
            />
        </IconContainer>
    );
}

export default ActivityFeedItemIcon;
