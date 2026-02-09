import styled from "styled-components";
import Icon from "../../../design_system/Icon";

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: var(--text-secondary);
`;

const EmptyIcon = styled.div`
  margin-bottom: 0.75rem;
`;

const EmptyText = styled.p`
  margin: 0;
  font-family: "Inter", sans-serif;
  font-size: 0.875rem;
`;

function CommentEmptyState() {
  return (
    <EmptyContainer>
      <EmptyIcon>
        <Icon name="ChatCircle" size={32} color="var(--text-secondary)" weight="light" />
      </EmptyIcon>
      <EmptyText>No comments yet</EmptyText>
    </EmptyContainer>
  );
}

export default CommentEmptyState;
