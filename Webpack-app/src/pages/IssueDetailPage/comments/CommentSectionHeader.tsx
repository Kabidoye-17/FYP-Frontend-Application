import styled from "styled-components";

interface CommentSectionHeaderProps {
  count: number;
}

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  margin: 0;
  font-family: "Inter", sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
`;

const Count = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 0.75rem;
  color: var(--text-secondary);
  background-color: var(--section-background);
  padding: 0.125rem 0.5rem;
  border-radius: 10px;
`;

function CommentSectionHeader({ count }: CommentSectionHeaderProps) {
  return (
    <HeaderContainer>
      <Title>Comments</Title>
      {count > 0 && <Count>{count}</Count>}
    </HeaderContainer>
  );
}

export default CommentSectionHeader;
