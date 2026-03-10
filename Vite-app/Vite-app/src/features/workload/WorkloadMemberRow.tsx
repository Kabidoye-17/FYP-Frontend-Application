import styled from "styled-components";
import Avatar from "../../design_system/Avatar";
import WorkloadCapacityBar from "./WorkloadCapacityBar";
import WorkloadIssueChip from "./WorkloadIssueChip";
import type { TeamMember } from "../../pages/WorkloadPage";

interface WorkloadMemberRowProps {
    member: TeamMember;
}

const RowContainer = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid var(--section-background);
    border-radius: 12px;
    margin-bottom: 0.75rem;
    background-color: var(--white);

    &:last-child {
        margin-bottom: 0;
    }

    &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
`;

const MemberInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    min-width: 200px;
`;

const MemberDetails = styled.div`
    display: flex;
    flex-direction: column;
`;

const MemberName = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-primary);
`;

const MemberRole = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
`;

const WorkloadSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const CapacitySection = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const IssuesList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
`;

const NoIssues = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
    font-style: italic;
`;

function WorkloadMemberRow({ member }: WorkloadMemberRowProps) {
    const totalAssigned = member.assigned.reduce(
        (sum, issue) => sum + issue.storyPoints,
        0
    );

    return (
        <RowContainer>
            <MemberInfo>
                <Avatar size="medium" color={member.color} name={member.name} />
                <MemberDetails>
                    <MemberName>{member.name}</MemberName>
                    <MemberRole>{member.role}</MemberRole>
                </MemberDetails>
            </MemberInfo>
            <WorkloadSection>
                <CapacitySection>
                    <WorkloadCapacityBar
                        assigned={totalAssigned}
                        capacity={member.capacity}
                    />
                </CapacitySection>
                <IssuesList>
                    {member.assigned.length === 0 ? (
                        <NoIssues>No issues assigned</NoIssues>
                    ) : (
                        member.assigned.map((issue) => (
                            <WorkloadIssueChip key={issue.id} issue={issue} />
                        ))
                    )}
                </IssuesList>
            </WorkloadSection>
        </RowContainer>
    );
}

export default WorkloadMemberRow;
