import styled from "styled-components";
import * as Table from "../../design_system/Table";
import ViewSprintsPageTableHeader from "./ViewSprintsPageTableHeader";
import ViewSprintsPageTableRow from "./ViewSprintsPageTableRow";
import type { Sprint } from "./ViewSprintsPageTable";

interface ViewSprintsPageTableSectionProps {
    title: string;
    sprints: Sprint[];
}

const SectionContainer = styled.div`
    margin-bottom: 1.5rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

const SectionTitle = styled.h2`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--plum);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
`;

function ViewSprintsPageTableSection({
    title,
    sprints,
}: Readonly<ViewSprintsPageTableSectionProps>) {
    return (
        <SectionContainer>
            <SectionTitle>{title}</SectionTitle>
            <Table.Table>
                <ViewSprintsPageTableHeader />
                <Table.Body>
                    {sprints.map((sprint) => (
                        <ViewSprintsPageTableRow key={sprint.id} sprint={sprint} />
                    ))}
                </Table.Body>
            </Table.Table>
        </SectionContainer>
    );
}

export default ViewSprintsPageTableSection;
