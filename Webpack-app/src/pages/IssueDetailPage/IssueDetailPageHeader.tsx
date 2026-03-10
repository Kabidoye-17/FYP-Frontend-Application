import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import Icon from "../../design_system/Icon";
import * as Tooltip from "../../design_system/Tooltip";
import { useCopyToClipboard } from "../../hooks";

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

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
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

function IssueDetailPageHeader({ issueId }: IssueDetailPageHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { copy, isCopied } = useCopyToClipboard();

  const handleBack = () => {
    navigate("/home/issues");
  };

  const handleCopyLink = () => {
    const fullUrl = `${window.location.origin}${location.pathname}`;
    copy(fullUrl);
  };

  return (
    <HeaderContainer>
      <LeftSection>
        <BackButton onClick={handleBack} aria-label="Go back">
          <Icon name="ArrowLeft" size={20} weight="regular" />
        </BackButton>
        <IssueId>Issue #{issueId}</IssueId>
      </LeftSection>
      <RightSection>
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <ActionButton onClick={handleCopyLink} aria-label="Copy link">
                <Icon
                  name={isCopied ? "Check" : "Link"}
                  size={18}
                  weight="regular"
                  color={isCopied ? "var(--success)" : "currentColor"}
                />
              </ActionButton>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content side="bottom" sideOffset={5}>
                {isCopied ? "Copied!" : "Copy link"}
                <Tooltip.Arrow />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </RightSection>
    </HeaderContainer>
  );
}

export default IssueDetailPageHeader;
