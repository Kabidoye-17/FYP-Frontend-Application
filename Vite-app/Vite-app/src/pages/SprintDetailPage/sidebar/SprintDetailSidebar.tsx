import styled from "styled-components";
import SidebarSprintDatesField from "./SidebarSprintDatesField";
import Icon from "../../../design_system/Icon";
import type { SprintDetail } from "../SprintDetailPage";

interface SprintDetailSidebarProps {
    status: SprintDetail["status"];
    startDate: string;
    endDate: string;
    teamName: string;
    createdAt: string;
    onStatusChange: (status: SprintDetail["status"]) => void;
    onDatesChange: (startDate: string, endDate: string) => void;
}

const SidebarContainer = styled.aside`
    width: 300px;
    border-left: 1px solid var(--section-background);
    padding: 1.5rem;
    overflow-y: auto;
    background-color: var(--white);
`;

const SidebarSection = styled.div`
    margin-bottom: 1.5rem;
`;

const SectionLabel = styled.div`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
`;

const StatusBadge = styled.div<{ $status: SprintDetail["status"] }>`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background-color: ${({ $status }) => {
        switch ($status) {
            case "active":
                return "rgba(34, 197, 94, 0.1)";
            case "completed":
                return "rgba(139, 92, 246, 0.1)";
            default:
                return "var(--section-background)";
        }
    }};
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    color: ${({ $status }) => {
        switch ($status) {
            case "active":
                return "var(--success-green)";
            case "completed":
                return "var(--plum)";
            default:
                return "var(--text-primary)";
        }
    }};
    text-transform: capitalize;
`;

const StatusDot = styled.div<{ $status: SprintDetail["status"] }>`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ $status }) => {
        switch ($status) {
            case "active":
                return "var(--success-green)";
            case "completed":
                return "var(--plum)";
            default:
                return "var(--text-secondary)";
        }
    }};
`;

const TeamValue = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-primary);
`;

const CreatedAtValue = styled.div`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-secondary);
`;

function SprintDetailSidebar({
    status,
    startDate,
    endDate,
    teamName,
    createdAt,
    onDatesChange,
}: SprintDetailSidebarProps) {
    return (
        <SidebarContainer>
            <SidebarSection>
                <SectionLabel>Status</SectionLabel>
                <StatusBadge $status={status}>
                    <StatusDot $status={status} />
                    {status}
                </StatusBadge>
            </SidebarSection>

            <SidebarSection>
                <SectionLabel>Duration</SectionLabel>
                <SidebarSprintDatesField
                    startDate={startDate}
                    endDate={endDate}
                    onChange={onDatesChange}
                />
            </SidebarSection>

            <SidebarSection>
                <SectionLabel>Team</SectionLabel>
                <TeamValue>
                    <Icon name="Users" size={16} color="var(--text-secondary)" weight="regular" />
                    {teamName}
                </TeamValue>
            </SidebarSection>

            <SidebarSection>
                <SectionLabel>Created</SectionLabel>
                <CreatedAtValue>{new Date(createdAt).toLocaleDateString()}</CreatedAtValue>
            </SidebarSection>
        </SidebarContainer>
    );
}

export default SprintDetailSidebar;
