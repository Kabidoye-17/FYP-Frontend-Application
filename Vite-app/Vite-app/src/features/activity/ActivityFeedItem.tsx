import styled from "styled-components";
import Avatar from "../../design_system/Avatar";
import ActivityFeedItemIcon from "./ActivityFeedItemIcon";
import type { ActivityItem } from "./ActivityFeed";

interface ActivityFeedItemProps {
    activity: ActivityItem;
}

const ItemContainer = styled.div`
    display: flex;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--section-background);

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: rgba(0, 0, 0, 0.02);
    }
`;

const AvatarContainer = styled.div`
    position: relative;
`;

const IconBadge = styled.div`
    position: absolute;
    bottom: -2px;
    right: -2px;
`;

const ContentContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

const ActivityText = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-primary);
    margin: 0;
    line-height: 1.4;
`;

const UserName = styled.span`
    font-weight: 600;
`;

const TargetName = styled.span`
    font-weight: 500;
    color: var(--plum);
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

const DetailText = styled.span`
    color: var(--text-secondary);
    font-style: italic;
`;

const Timestamp = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
`;

function ActivityFeedItem({ activity }: ActivityFeedItemProps) {
    const getActionText = () => {
        switch (activity.type) {
            case "created":
                return "created";
            case "updated":
                return "updated";
            case "commented":
                return "commented on";
            case "assigned":
                return "assigned";
            case "status_changed":
                return "changed status of";
            case "completed":
                return "completed";
            default:
                return "updated";
        }
    };

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor(diff / (1000 * 60));

        if (minutes < 60) {
            return `${minutes}m ago`;
        } else if (hours < 24) {
            return `${hours}h ago`;
        } else {
            return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });
        }
    };

    const getDetailsText = () => {
        if (!activity.details) return null;

        if (activity.type === "commented") {
            return <DetailText>"{activity.details}"</DetailText>;
        }
        if (activity.type === "assigned") {
            return (
                <>
                    {" "}to <UserName>{activity.details}</UserName>
                </>
            );
        }
        if (activity.type === "status_changed") {
            return (
                <>
                    {" "}to <DetailText>{activity.details}</DetailText>
                </>
            );
        }
        return <DetailText>{activity.details}</DetailText>;
    };

    return (
        <ItemContainer>
            <AvatarContainer>
                <Avatar
                    size="small"
                    color={activity.user.color}
                    name={activity.user.name}
                />
                <IconBadge>
                    <ActivityFeedItemIcon type={activity.type} />
                </IconBadge>
            </AvatarContainer>
            <ContentContainer>
                <ActivityText>
                    <UserName>{activity.user.name}</UserName>{" "}
                    {getActionText()}{" "}
                    <TargetName>{activity.target}</TargetName>
                    {getDetailsText()}
                </ActivityText>
                <Timestamp>{formatTimestamp(activity.timestamp)}</Timestamp>
            </ContentContainer>
        </ItemContainer>
    );
}

export default ActivityFeedItem;
