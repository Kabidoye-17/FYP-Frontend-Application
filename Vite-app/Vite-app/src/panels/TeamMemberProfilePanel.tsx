import styled from "styled-components";
import TeamMemberProfilePanelHeader from "./TeamMemberProfilePanelHeader";
import TeamMemberProfilePanelContent from "./TeamMemberProfilePanelContent";
import TeamMemberProfilePanelStats from "./TeamMemberProfilePanelStats";
import type { TeamMember } from "../features/team/TeamMemberCard";

interface TeamMemberProfilePanelProps {
    member: TeamMember | null;
    isOpen: boolean;
    onClose: () => void;
}

const PanelOverlay = styled.div<{ $isOpen: boolean }>`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
    transition: opacity 0.2s ease, visibility 0.2s ease;
    z-index: 100;
`;

const PanelContainer = styled.div<{ $isOpen: boolean }>`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 380px;
    background-color: var(--white);
    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.1);
    transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "100%")});
    transition: transform 0.3s ease;
    z-index: 101;
    display: flex;
    flex-direction: column;
`;

function TeamMemberProfilePanel({
    member,
    isOpen,
    onClose,
}: Readonly<TeamMemberProfilePanelProps>) {
    if (!member) return null;

    return (
        <>
            <PanelOverlay $isOpen={isOpen} onClick={onClose} />
            <PanelContainer $isOpen={isOpen}>
                <TeamMemberProfilePanelHeader onClose={onClose} />
                <TeamMemberProfilePanelContent member={member} />
                <TeamMemberProfilePanelStats stats={member.stats} />
            </PanelContainer>
        </>
    );
}

export default TeamMemberProfilePanel;
