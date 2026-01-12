import styled from "styled-components";
import * as Table from "../../design_system/Table";
import type { Project } from "../types/contentTypes";
import ViewProjectsPageTableRow from "./ViewProjectsPageTableRow";
import ViewProjectsPageTableHeader from "./ViewProjectsPageTableHeader";

interface ViewProjectsPageTableSectionProps {
  title: string;
  projects: Project[];
}

export const SectionContainer = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.h2`
  font-family: "Inter", sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--plum);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
`;

function ViewProjectsPageTableSection({
  title,
  projects,
}: Readonly<ViewProjectsPageTableSectionProps>) {
  return (
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      <Table.Table>
        <ViewProjectsPageTableHeader />
        <Table.Body>
          {projects.map((project) => (
            <ViewProjectsPageTableRow key={project.id} project={project} />
          ))}
        </Table.Body>
      </Table.Table>
    </SectionContainer>
  );
}

export default ViewProjectsPageTableSection;
