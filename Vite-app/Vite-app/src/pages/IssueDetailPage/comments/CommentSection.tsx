import styled from "styled-components";
import CommentSectionHeader from "./CommentSectionHeader";
import CommentList from "./CommentList";
import CommentEmptyState from "./CommentEmptyState";
import CommentInput from "./CommentInput";
import type { Comment } from "../types/issueDetailTypes";

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (text: string) => void;
}

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CommentsArea = styled.div`
  min-height: 100px;
`;

function CommentSection({ comments, onAddComment }: CommentSectionProps) {
  return (
    <SectionContainer>
      <CommentSectionHeader count={comments.length} />
      <CommentsArea>
        {comments.length > 0 ? (
          <CommentList comments={comments} />
        ) : (
          <CommentEmptyState />
        )}
      </CommentsArea>
      <CommentInput onSubmit={onAddComment} />
    </SectionContainer>
  );
}

export default CommentSection;
