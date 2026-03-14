import styled from "styled-components";
import * as Dropdown from "../../../design_system/Dropdown";
import SmallLeadOpener from "../../../dropdowns/opener/SmallLeadOpener";
import LeadDropdownContent from "../../../dropdowns/content/LeadDropdownContent";
import { useTeam } from "../../../hooks/queries";

interface SidebarLeadFieldProps {
  leadId: string | null;
  onLeadChange: (leadId: string | null) => void;
}

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FieldLabel = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.025em;
`;

function SidebarLeadField({ leadId, onLeadChange }: SidebarLeadFieldProps) {
  const { data: teamMembers = [] } = useTeam();

  // Transform team members to user format
  const users = teamMembers.map(member => ({
    id: member.id,
    name: member.name,
    color: member.color,
  }));

  const selectedLead = leadId ? users.find((a) => a.id === leadId) ?? null : null;

  return (
    <FieldContainer>
      <FieldLabel>Lead</FieldLabel>
      <Dropdown.Root>
        <Dropdown.Trigger asChild>
          <SmallLeadOpener selectedLead={selectedLead} />
        </Dropdown.Trigger>
        <Dropdown.Portal>
          <LeadDropdownContent
            users={users}
            selectedLeadId={leadId}
            onLeadChange={onLeadChange}
          />
        </Dropdown.Portal>
      </Dropdown.Root>
    </FieldContainer>
  );
}

export default SidebarLeadField;
