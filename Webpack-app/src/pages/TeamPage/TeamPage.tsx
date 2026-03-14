import { useState } from "react";
import styled from "styled-components";
import TeamPageLayout from "./TeamPageLayout";
import TeamPageHeader from "./TeamPageHeader";
import TeamMemberGrid from "../../features/team/TeamMemberGrid";
import TeamMemberProfilePanel from "../../panels/TeamMemberProfilePanel";
import InviteTeamMemberModal from "../../modals/team/InviteTeamMemberModal";
import EmptyState from "../../design_system/EmptyState";
import Button from "../../design_system/Button";
import type { TeamMember } from "../../features/team/TeamMemberCard";
import { useTeam } from "../../hooks/queries";
import { transformUsersToTeamMembers } from "../../utils/dataHelpers";

const Content = styled.div`
    padding: 1.5rem;
`;

const LoadingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 2rem;
`;

const ErrorContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 2rem;
`;

function TeamPage() {
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
    const [profilePanelOpen, setProfilePanelOpen] = useState(false);
    const [inviteModalOpen, setInviteModalOpen] = useState(false);

    const { data: users, isLoading, isError, error, refetch } = useTeam();

    // Transform API users to team members
    const members: TeamMember[] = users ? transformUsersToTeamMembers(users) : [];

    const handleMemberClick = (member: TeamMember) => {
        setSelectedMember(member);
        setProfilePanelOpen(true);
    };

    const handleCloseProfile = () => {
        setProfilePanelOpen(false);
    };

    if (isLoading) {
        return (
            <TeamPageLayout>
                <TeamPageHeader
                    memberCount={0}
                    onInvite={() => setInviteModalOpen(true)}
                />
                <LoadingContainer>Loading team members...</LoadingContainer>
                <InviteTeamMemberModal
                    open={inviteModalOpen}
                    onOpenChange={setInviteModalOpen}
                />
            </TeamPageLayout>
        );
    }

    if (isError) {
        return (
            <TeamPageLayout>
                <TeamPageHeader
                    memberCount={0}
                    onInvite={() => setInviteModalOpen(true)}
                />
                <ErrorContainer>
                    <EmptyState
                        icon="Warning"
                        title="Failed to load team"
                        description={error?.message || "An error occurred while loading team members"}
                        action={<Button onClick={() => refetch()}>Retry</Button>}
                    />
                </ErrorContainer>
                <InviteTeamMemberModal
                    open={inviteModalOpen}
                    onOpenChange={setInviteModalOpen}
                />
            </TeamPageLayout>
        );
    }

    if (members.length === 0) {
        return (
            <TeamPageLayout>
                <TeamPageHeader
                    memberCount={0}
                    onInvite={() => setInviteModalOpen(true)}
                />
                <ErrorContainer>
                    <EmptyState
                        icon="Users"
                        title="No team members yet"
                        description="Invite team members to start collaborating"
                        action={
                            <Button onClick={() => setInviteModalOpen(true)}>
                                Invite Member
                            </Button>
                        }
                    />
                </ErrorContainer>
                <InviteTeamMemberModal
                    open={inviteModalOpen}
                    onOpenChange={setInviteModalOpen}
                />
            </TeamPageLayout>
        );
    }

    return (
        <TeamPageLayout>
            <TeamPageHeader
                memberCount={members.length}
                onInvite={() => setInviteModalOpen(true)}
            />
            <Content>
                <TeamMemberGrid
                    members={members}
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
