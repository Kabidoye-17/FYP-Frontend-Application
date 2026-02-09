import styled from "styled-components";
import IssueDetailTitle from "./IssueDetailTitle";
import IssueDetailDivider from "./IssueDetailDivider";
import IssueDetailDescription from "./IssueDetailDescription";
import CommentSection from "../comments/CommentSection";
import type { Comment } from "../types/issueDetailTypes";

interface IssueDetailBodyProps {
  title: string;
  description: string;
  comments: Comment[];
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onAddComment: (text: string) => void;
}

const BodyContainer = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const ContentArea = styled.div`
  max-width: 720px;
`;

const CommentsWrapper = styled.div`
  margin-top: 2rem;
`;

function IssueDetailBody({
  title,
  description,
  comments,
  onTitleChange,
  onDescriptionChange,
  onAddComment,
}: IssueDetailBodyProps) {
  return (
    <BodyContainer>
      <ContentArea>
        <IssueDetailTitle title={title} onTitleChange={onTitleChange} />
        <IssueDetailDivider />
        <IssueDetailDescription
          description={description}
          onDescriptionChange={onDescriptionChange}
        />
        <CommentsWrapper>
          <IssueDetailDivider />
          <CommentSection comments={comments} onAddComment={onAddComment} />
        </CommentsWrapper>
      </ContentArea>
    </BodyContainer>
  );
}

export default IssueDetailBody;
