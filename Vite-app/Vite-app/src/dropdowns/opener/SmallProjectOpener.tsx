import styled from "styled-components";
import { forwardRef } from "react";
import type { Project } from "../../utils/projectData";

const OpenerButton = styled.button`
    all: unset;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    height: 40px;
    background-color: var(--white);
    border: 1px solid var(--section-background);
    border-radius: 6px;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    color: var(--text-primary);
    transition: background-color 0.15s ease;
    min-width: 80px;
    box-sizing: border-box;

    &:hover {
        background-color: var(--section-background);
    }

    &:focus {
        outline: 2px solid var(--plum);
        outline-offset: 2px;
    }
`;

const ProjectText = styled.span<{ $empty?: boolean }>`
    color: ${(props) => (props.$empty ? "var(--text-secondary)" : "var(--text-primary)")};
`;

interface SmallProjectOpenerProps {
    selectedProject: Project | null;
}

const SmallProjectOpener = forwardRef<HTMLButtonElement, SmallProjectOpenerProps>(
    ({ selectedProject, ...props }, ref) => {
        return (
            <OpenerButton ref={ref} {...props}>
                <ProjectText $empty={!selectedProject}>
                    {selectedProject ? selectedProject.name : "Project"}
                </ProjectText>
            </OpenerButton>
        );
    }
);

SmallProjectOpener.displayName = "SmallProjectOpener";

export default SmallProjectOpener;
