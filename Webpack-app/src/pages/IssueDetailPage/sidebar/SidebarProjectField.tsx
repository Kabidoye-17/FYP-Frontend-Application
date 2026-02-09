import styled from "styled-components";
import * as Dropdown from "../../../design_system/Dropdown";
import SmallProjectOpener from "../../../dropdowns/opener/SmallProjectOpener";
import ProjectDropdownContent from "../../../dropdowns/content/ProjectDropdownContent";
import { mockProjects } from "../../../utils/projectData";

interface SidebarProjectFieldProps {
  projectId: string | null;
  onProjectChange: (projectId: string | null) => void;
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

function SidebarProjectField({ projectId, onProjectChange }: SidebarProjectFieldProps) {
  const selectedProject = mockProjects.find((p) => p.id === projectId) || null;

  return (
    <FieldContainer>
      <FieldLabel>Project</FieldLabel>
      <Dropdown.Root>
        <Dropdown.Trigger asChild>
          <SmallProjectOpener selectedProject={selectedProject} />
        </Dropdown.Trigger>
        <Dropdown.Portal>
          <ProjectDropdownContent
            projects={mockProjects}
            selectedProjectId={projectId}
            onProjectChange={onProjectChange}
          />
        </Dropdown.Portal>
      </Dropdown.Root>
    </FieldContainer>
  );
}

export default SidebarProjectField;
