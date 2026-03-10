import styled from "styled-components";
import Icon from "../../design_system/Icon";
import type { ActivityFilter } from "./ActivityFeed";

interface ActivityFeedEmptyStateProps {
    filter: ActivityFilter;
}

const EmptyContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background-color: var(--section-background);
    margin-bottom: 0.75rem;
`;

const EmptyTitle = styled.h4`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 0.25rem 0;
`;

const EmptyDescription = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin: 0;
`;

function ActivityFeedEmptyState({ filter }: ActivityFeedEmptyStateProps) {
    const getMessage = () => {
        switch (filter) {
            case "issues":
                return {
                    title: "No issue activity",
                    description: "Issue updates will appear here",
                };
            case "projects":
                return {
                    title: "No project activity",
                    description: "Project updates will appear here",
                };
            case "comments":
                return {
                    title: "No comments",
                    description: "Comments will appear here",
                };
            default:
                return {
                    title: "No activity yet",
                    description: "Recent activity will appear here",
                };
        }
    };

    const { title, description } = getMessage();

    return (
        <EmptyContainer>
            <IconWrapper>
                <Icon
                    name="ListBullets"
                    size={24}
                    color="var(--text-secondary)"
                    weight="regular"
                />
            </IconWrapper>
            <EmptyTitle>{title}</EmptyTitle>
            <EmptyDescription>{description}</EmptyDescription>
        </EmptyContainer>
    );
}

export default ActivityFeedEmptyState;
