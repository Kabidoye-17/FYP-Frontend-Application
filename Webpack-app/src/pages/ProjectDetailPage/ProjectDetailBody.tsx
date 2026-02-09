import styled from "styled-components";
import IssueDetailTitle from "../IssueDetailPage/body/IssueDetailTitle";
import IssueDetailDivider from "../IssueDetailPage/body/IssueDetailDivider";
import IssueDetailDescription from "../IssueDetailPage/body/IssueDetailDescription";
import CommentSection from "../IssueDetailPage/comments/CommentSection";
import AssociatedIssuesPanel from "./issues/AssociatedIssuesPanel";
import type { Comment, AssociatedIssue } from "./types/projectDetailTypes";

interface ProjectDetailBodyProps {
  title: string;
  description: string;
  associatedIssues: AssociatedIssue[];
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

const SectionWrapper = styled.div`
  margin-top: 2rem;
`;

function ProjectDetailBody({
  title,
  description,
  associatedIssues,
  comments,
  onTitleChange,
  onDescriptionChange,
  onAddComment,
}: ProjectDetailBodyProps) {
  return (
    <BodyContainer>
      <ContentArea>
        <IssueDetailTitle title={title} onTitleChange={onTitleChange} />
        <IssueDetailDivider />
        <IssueDetailDescription
          description={description}
          onDescriptionChange={onDescriptionChange}
        />
        <SectionWrapper>
          <IssueDetailDivider />
          <AssociatedIssuesPanel issues={associatedIssues} />
        </SectionWrapper>
        <SectionWrapper>
          <IssueDetailDivider />
          <CommentSection comments={comments} onAddComment={onAddComment} />
        </SectionWrapper>
      </ContentArea>
    </BodyContainer>
  );
}

export default ProjectDetailBody;
