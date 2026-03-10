import { useState } from "react";
import styled from "styled-components";
import TeamPageLayout from "./TeamPageLayout";
import TeamPageHeader from "./TeamPageHeader";
import TeamMemberGrid from "../../features/team/TeamMemberGrid";
import TeamMemberProfilePanel from "../../panels/TeamMemberProfilePanel";
import InviteTeamMemberModal from "../../modals/team/InviteTeamMemberModal";
import type { TeamMember } from "../../features/team/TeamMemberCard";

const Content = styled.div`
    padding: 1.5rem;
`;

const MOCK_MEMBERS: TeamMember[] = [
    {
        id: "1",
        name: "Kelly Abidoye",
        email: "kelly@example.com",
        role: "Product Manager",
        color: "var(--plum)",
        stats: { assigned: 12, completed: 45, inProgress: 8 },
    },
    {
        id: "2",
        name: "Alex Chen",
        email: "alex@example.com",
        role: "Senior Developer",
        color: "var(--blue)",
        stats: { assigned: 8, completed: 62, inProgress: 5 },
    },
    {
        id: "3",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        role: "Designer",
        color: "var(--tan)",
        stats: { assigned: 6, completed: 34, inProgress: 3 },
    },
    {
        id: "4",
        name: "Mike Brown",
        email: "mike@example.com",
        role: "Developer",
        color: "var(--success)",
        stats: { assigned: 10, completed: 28, inProgress: 7 },
    },
    {
        id: "5",
        name: "Emma Wilson",
        email: "emma@example.com",
        role: "QA Engineer",
        color: "var(--yellow)",
        stats: { assigned: 15, completed: 52, inProgress: 4 },
    },
    {
        id: "6",
        name: "David Lee",
        email: "david@example.com",
        role: "DevOps Engineer",
        color: "var(--purple)",
        stats: { assigned: 5, completed: 41, inProgress: 2 },
    },
];

function TeamPage() {
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
    const [profilePanelOpen, setProfilePanelOpen] = useState(false);
    const [inviteModalOpen, setInviteModalOpen] = useState(false);

    const handleMemberClick = (member: TeamMember) => {
        setSelectedMember(member);
        setProfilePanelOpen(true);
    };

    const handleCloseProfile = () => {
        setProfilePanelOpen(false);
    };

    return (
        <TeamPageLayout>
            <TeamPageHeader
                memberCount={MOCK_MEMBERS.length}
                onInvite={() => setInviteModalOpen(true)}
            />
            <Content>
                <TeamMemberGrid
                    members={MOCK_MEMBERS}
                    onMemberClick={handleMemberClick}
                />
            </Content>
            <TeamMemberProfilePanel
                member={selectedMember}
                isOpen={profilePanelOpen}
                onClose={handleCloseProfile}
            />
            <InviteTeamMemberModal
                open={inviteModalOpen}
                onOpenChange={setInviteModalOpen}
            />
        </TeamPageLayout>
    );
}

export default TeamPage;
