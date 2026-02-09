import styled from "styled-components";
import Avatar from "../../../design_system/Avatar";
import CommentTimestamp from "./CommentTimestamp";
import type { Comment } from "../types/issueDetailTypes";

interface CommentListItemProps {
  comment: Comment;
}

const ItemContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--section-background);

  &:last-child {
    border-bottom: none;
  }
`;

const AvatarContainer = styled.div`
  flex-shrink: 0;
`;

const ContentContainer = styled.div`
  flex: 1;
  min-width: 0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
`;

const AuthorName = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
`;

const CommentText = styled.p`
  margin: 0;
  font-family: "Inter", sans-serif;
  font-size: 0.875rem;
  color: var(--text-primary);
  line-height: 1.5;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

function CommentListItem({ comment }: CommentListItemProps) {
  return (
    <ItemContainer>
      <AvatarContainer>
        <Avatar
          size="small"
          color={comment.authorColor}
          name={comment.authorName}
        />
      </AvatarContainer>
      <ContentContainer>
        <Header>
          <AuthorName>{comment.authorName}</AuthorName>
          <CommentTimestamp date={comment.createdAt} />
        </Header>
        <CommentText>{comment.text}</CommentText>
      </ContentContainer>
    </ItemContainer>
  );
}

export default CommentListItem;
