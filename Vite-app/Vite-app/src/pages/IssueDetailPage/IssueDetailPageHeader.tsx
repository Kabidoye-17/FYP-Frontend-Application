import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Icon from "../../design_system/Icon";

interface IssueDetailPageHeaderProps {
  issueId: string;
}

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--section-background);
  background-color: var(--white);
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background-color: transparent;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.15s ease;

  &:hover {
    background-color: var(--section-background);
    color: var(--text-primary);
  }

  &:focus {
    outline: 2px solid var(--plum);
    outline-offset: 1px;
  }
`;

const IssueId = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
`;

function IssueDetailPageHeader({ issueId }: IssueDetailPageHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/home/issues");
  };

  return (
    <HeaderContainer>
      <LeftSection>
        <BackButton onClick={handleBack} aria-label="Go back">
          <Icon name="ArrowLeft" size={20} weight="regular" />
        </BackButton>
        <IssueId>Issue #{issueId}</IssueId>
      </LeftSection>
    </HeaderContainer>
  );
}

export default IssueDetailPageHeader;
