import styled from "styled-components";
import { useState } from "react";
import WorkloadPageHeader from "./WorkloadPage/WorkloadPageHeader";
import WorkloadMemberRow from "../features/workload/WorkloadMemberRow";
import WorkloadEmptyState from "../features/workload/WorkloadEmptyState";

export interface WorkloadIssue {
    id: string;
    title: string;
    priority: "low" | "medium" | "high" | "urgent";
    storyPoints: number;
}

export interface TeamMember {
    id: string;
    name: string;
    color: string;
    role: string;
    capacity: number; // story points per sprint
    assigned: WorkloadIssue[];
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: var(--white);
`;

const WorkloadContent = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
`;

const mockTeamMembers: TeamMember[] = [
    {
        id: "1",
        name: "John Doe",
        color: "var(--plum)",
        role: "Senior Engineer",
        capacity: 13,
        assigned: [
            { id: "i1", title: "Implement OAuth2 login", priority: "high", storyPoints: 5 },
            { id: "i2", title: "Fix session timeout bug", priority: "urgent", storyPoints: 3 },
            { id: "i3", title: "Add password reset", priority: "medium", storyPoints: 3 },
        ],
    },
    {
        id: "2",
        name: "Jane Smith",
        color: "var(--tan)",
        role: "Frontend Developer",
        capacity: 10,
        assigned: [
            { id: "i4", title: "Dashboard redesign", priority: "high", storyPoints: 8 },
            { id: "i5", title: "Mobile responsive fixes", priority: "low", storyPoints: 2 },
        ],
    },
    {
        id: "3",
        name: "Bob Wilson",
        color: "var(--light-plum)",
        role: "Backend Developer",
        capacity: 13,
        assigned: [
            { id: "i6", title: "API optimization", priority: "high", storyPoints: 5 },
        ],
    },
    {
        id: "4",
        name: "Alice Brown",
        color: "var(--tan)",
        role: "Full Stack Developer",
        capacity: 10,
        assigned: [],
    },
];

function WorkloadPage() {
    const [members] = useState<TeamMember[]>(mockTeamMembers);

    return (
        <PageContainer>
            <WorkloadPageHeader memberCount={members.length} />
            <WorkloadContent>
                {members.length === 0 ? (
                    <WorkloadEmptyState />
                ) : (
                    members.map((member) => (
                        <WorkloadMemberRow key={member.id} member={member} />
                    ))
                )}
            </WorkloadContent>
        </PageContainer>
    );
}

export default WorkloadPage;
