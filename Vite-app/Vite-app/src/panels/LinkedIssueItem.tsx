import styled from "styled-components";
import Icon from "../design_system/Icon";
import LinkedIssueItemActions from "./LinkedIssueItemActions";
import type * as PhosphorIcons from "@phosphor-icons/react";

type IconName = keyof typeof PhosphorIcons;

export interface LinkedIssue {
    id: string;
    title: string;
    status: "backlog" | "todo" | "in-progress" | "in-review" | "done";
    linkType: "blocks" | "blocked-by" | "relates-to" | "duplicates";
}

interface LinkedIssueItemProps {
    issue: LinkedIssue;
    onView: () => void;
    onUnlink: () => void;
}

const Item = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    transition: background-color 0.15s ease;

    &:hover {
        background-color: var(--hover-background);
    }

    &:not(:last-child) {
        border-bottom: 1px solid var(--section-background);
    }
`;

const LinkTypeIcon = styled.div<{ $type: LinkedIssue["linkType"] }>`
    width: 24px;
    height: 24px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ $type }) =>
        $type === "blocks"
            ? "var(--error-light)"
            : $type === "blocked-by"
            ? "var(--warning-light)"
            : $type === "relates-to"
            ? "var(--blue-light)"
            : "var(--section-background)"};
    flex-shrink: 0;
`;

const Content = styled.div`
    flex: 1;
    min-width: 0;
`;

const Title = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--text-primary);
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const LinkLabel = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.6875rem;
    color: var(--text-secondary);
    text-transform: capitalize;
`;

const StatusDot = styled.div<{ $status: LinkedIssue["status"] }>`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ $status }) =>
        $status === "done"
            ? "var(--success)"
            : $status === "in-progress"
            ? "var(--yellow)"
            : $status === "in-review"
            ? "var(--purple)"
            : $status === "todo"
            ? "var(--blue)"
            : "var(--gray-400)"};
    flex-shrink: 0;
`;

const LINK_ICONS: Record<LinkedIssue["linkType"], string> = {
    blocks: "Prohibit",
    "blocked-by": "Warning",
    "relates-to": "Link",
    duplicates: "Copy",
};

const LINK_COLORS: Record<LinkedIssue["linkType"], string> = {
    blocks: "var(--error)",
    "blocked-by": "var(--warning)",
    "relates-to": "var(--blue)",
    duplicates: "var(--text-secondary)",
};

function LinkedIssueItem({ issue, onView, onUnlink }: Readonly<LinkedIssueItemProps>) {
    return (
        <Item className="linked-issue-item">
            <LinkTypeIcon $type={issue.linkType}>
                <Icon
                    name={LINK_ICONS[issue.linkType] as IconName}
                    size={14}
                    color={LINK_COLORS[issue.linkType]}
                    weight="regular"
                />
            </LinkTypeIcon>
            <Content>
                <Title>{issue.title}</Title>
                <LinkLabel>{issue.linkType.replace("-", " ")}</LinkLabel>
            </Content>
            <StatusDot $status={issue.status} />
            <LinkedIssueItemActions onView={onView} onUnlink={onUnlink} />
        </Item>
    );
}

export default LinkedIssueItem;
