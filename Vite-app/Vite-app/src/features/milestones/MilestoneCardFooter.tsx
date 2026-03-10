import styled from "styled-components";
import Icon from "../../design_system/Icon";

interface MilestoneCardFooterProps {
    issueCount: number;
    completedIssueCount: number;
}

const FooterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    background-color: var(--section-background);
`;

const IssueStats = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const StatItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
`;

const StatValue = styled.span`
    font-weight: 600;
    color: var(--text-primary);
`;

const ViewLink = styled.button`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background: none;
    border: none;
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--plum);
    cursor: pointer;
    padding: 0;

    &:hover {
        text-decoration: underline;
    }
`;

function MilestoneCardFooter({
    issueCount,
    completedIssueCount,
}: MilestoneCardFooterProps) {
    const openIssueCount = issueCount - completedIssueCount;

    return (
        <FooterContainer>
            <IssueStats>
                <StatItem>
                    <Icon name="CircleDashed" size={14} color="var(--text-secondary)" weight="regular" />
                    <StatValue>{openIssueCount}</StatValue> open
                </StatItem>
                <StatItem>
                    <Icon name="CheckCircle" size={14} color="var(--success-green)" weight="fill" />
                    <StatValue>{completedIssueCount}</StatValue> closed
                </StatItem>
            </IssueStats>
            <ViewLink>
                View issues
                <Icon name="ArrowRight" size={12} color="var(--plum)" weight="bold" />
            </ViewLink>
        </FooterContainer>
    );
}

export default MilestoneCardFooter;
