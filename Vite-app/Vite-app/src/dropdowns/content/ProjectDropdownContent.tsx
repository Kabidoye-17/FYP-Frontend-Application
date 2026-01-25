import * as Dropdown from "../../design_system/Dropdown";
import Icon from "../../design_system/Icon";
import SearchBar from "../../design_system/SearchBar";
import styled from "styled-components";
import { useState } from "react";
import type { Project } from "../../utils/projectData";

const ModalDropdownContent = styled(Dropdown.Content)`
    z-index: 250;
    background-color: var(--white);
    min-width: 280px;
    padding: 0;
`;

const SearchBarContainer = styled.div`
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: var(--white);
    padding: 0.5rem;
    border-bottom: 1px solid var(--section-background);
`;

const ProjectListContainer = styled.div`
    max-height: 320px;
    overflow-y: auto;
    padding: 0.5rem;
`;

const ProjectItem = styled(Dropdown.Item)`
    position: relative;
    padding-right: 2rem;
`;

const ProjectName = styled.span`
    font-size: 0.875rem;
    color: var(--text-primary);
`;

const CheckContainer = styled.div`
    position: absolute;
    right: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const EmptyState = styled.div`
    padding: 1rem;
    text-align: center;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-secondary);
`;

interface ProjectDropdownContentProps {
    projects: Project[];
    selectedProjectId: string | null;
    onProjectChange: (projectId: string | null) => void;
}

function ProjectDropdownContent({
    projects,
    selectedProjectId,
    onProjectChange,
}: Readonly<ProjectDropdownContentProps>) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProjects = projects.filter((project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <ModalDropdownContent sideOffset={5} align="start">
            <SearchBarContainer>
                <SearchBar
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={setSearchTerm}
                    size="compact"
                />
            </SearchBarContainer>
            <ProjectListContainer>
                {filteredProjects.length === 0 ? (
                    <EmptyState>No projects found</EmptyState>
                ) : (
                    filteredProjects.map((project) => {
                        const isSelected = selectedProjectId === project.id;

                        return (
                            <ProjectItem
                                key={project.id}
                                onSelect={() => onProjectChange(project.id)}
                            >
                                <ProjectName>{project.name}</ProjectName>
                                {isSelected && (
                                    <CheckContainer>
                                        <Icon
                                            name="Check"
                                            size={16}
                                            color="var(--plum)"
                                            weight="bold"
                                        />
                                    </CheckContainer>
                                )}
                            </ProjectItem>
                        );
                    })
                )}
            </ProjectListContainer>
        </ModalDropdownContent>
    );
}

export default ProjectDropdownContent;
