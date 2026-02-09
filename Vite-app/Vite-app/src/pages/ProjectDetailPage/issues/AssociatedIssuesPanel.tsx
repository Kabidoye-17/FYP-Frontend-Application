import styled from "styled-components";
import AssociatedIssueItem from "./AssociatedIssueItem";
import type { AssociatedIssue } from "../types/projectDetailTypes";

interface AssociatedIssuesPanelProps {
  issues: AssociatedIssue[];
}

const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const HeaderTitle = styled.h3`
  margin: 0;
  font-family: "Inter", sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
`;

const CountBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 0.375rem;
  font-family: "Inter", sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-secondary);
  background-color: var(--section-background);
  border-radius: 10px;
`;

const IssuesList = styled.div`
  max-height: 150px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--section-background);
    border-radius: 3px;

    &:hover {
      background-color: var(--text-secondary);
    }
  }
`;

const EmptyState = styled.div`
  padding: 1rem;
  font-family: "Inter", sans-serif;
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-align: center;
`;

function AssociatedIssuesPanel({ issues }: AssociatedIssuesPanelProps) {
  return (
    <PanelContainer>
      <Header>
        <HeaderTitle>Issues</HeaderTitle>
        <CountBadge>{issues.length}</CountBadge>
      </Header>
      <IssuesList>
        {issues.length === 0 ? (
          <EmptyState>No issues associated</EmptyState>
        ) : (
          issues.map((issue) => (
            <AssociatedIssueItem key={issue.id} issue={issue} />
          ))
        )}
      </IssuesList>
    </PanelContainer>
  );
}

export default AssociatedIssuesPanel;
