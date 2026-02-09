import styled from "styled-components";
import CommentListItem from "./CommentListItem";
import type { Comment } from "../types/issueDetailTypes";

interface CommentListProps {
  comments: Comment[];
}

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 400px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--text-secondary);
    border-radius: 3px;
  }
`;

function CommentList({ comments }: CommentListProps) {
  return (
    <ListContainer>
      {comments.map((comment) => (
        <CommentListItem key={comment.id} comment={comment} />
      ))}
    </ListContainer>
  );
}

export default CommentList;
