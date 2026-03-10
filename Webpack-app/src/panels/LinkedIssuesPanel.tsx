import styled from "styled-components";
import LinkedIssuesPanelHeader from "./LinkedIssuesPanelHeader";
import LinkedIssueItem, { type LinkedIssue } from "./LinkedIssueItem";
import EmptyState from "../design_system/EmptyState";

interface LinkedIssuesPanelProps {
    issues: LinkedIssue[];
    isOpen: boolean;
    onClose: () => void;
    onAddLink: () => void;
    onViewIssue: (issueId: string) => void;
    onUnlinkIssue: (issueId: string) => void;
}

const PanelOverlay = styled.div<{ $isOpen: boolean }>`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
    transition: opacity 0.2s ease, visibility 0.2s ease;
    z-index: 100;
`;

const PanelContainer = styled.div<{ $isOpen: boolean }>`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 380px;
    background-color: var(--white);
    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.1);
    transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "100%")});
    transition: transform 0.3s ease;
    z-index: 101;
    display: flex;
    flex-direction: column;
`;

const IssuesList = styled.div`
    flex: 1;
    overflow-y: auto;
`;

function LinkedIssuesPanel({
    issues,
    isOpen,
    onClose,
    onAddLink,
    onViewIssue,
    onUnlinkIssue,
}: Readonly<LinkedIssuesPanelProps>) {
    return (
        <>
            <PanelOverlay $isOpen={isOpen} onClick={onClose} />
            <PanelContainer $isOpen={isOpen}>
                <LinkedIssuesPanelHeader
                    count={issues.length}
                    onClose={onClose}
                    onAddLink={onAddLink}
                />
                <IssuesList>
                    {issues.length === 0 ? (
                        <EmptyState
                            icon="Link"
                            title="No linked issues"
                            description="Link related issues to track dependencies"
                        />
                    ) : (
                        issues.map((issue) => (
                            <LinkedIssueItem
                                key={issue.id}
                                issue={issue}
                                onView={() => onViewIssue(issue.id)}
                                onUnlink={() => onUnlinkIssue(issue.id)}
                            />
                        ))
                    )}
                </IssuesList>
            </PanelContainer>
        </>
    );
}

export default LinkedIssuesPanel;
