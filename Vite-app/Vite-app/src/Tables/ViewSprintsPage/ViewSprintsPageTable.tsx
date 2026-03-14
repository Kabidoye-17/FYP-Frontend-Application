import styled from "styled-components";
import ViewSprintsPageTableSection from "./ViewSprintsPageTableSection";
import ViewSprintsPageTableSkeleton from "./ViewSprintsPageTableSkeleton";
import EmptyState from "../../design_system/EmptyState";
import Button from "../../design_system/Button";
import { useSprints } from "../../hooks/queries";
import { groupSprintsByStatus } from "../../utils/dataHelpers";

export interface Sprint {
    id: string;
    name: string;
    status: string;
    startDate: string;
    endDate: string;
    issueCount: number;
    completedIssues: number;
    teamName: string;
}

export interface SprintSection {
    title: string;
    sprints: Sprint[];
}

const TableContainer = styled.div`
    width: 100%;
    padding: 1rem;
    overflow-y: auto;
    flex: 1;
`;

const ErrorContainer = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
`;

function ViewSprintsPageTable() {
    const { data: sprints, isLoading, isError, error, refetch } = useSprints();

    if (isLoading) {
        return <ViewSprintsPageTableSkeleton />;
    }

    if (isError) {
        return (
            <ErrorContainer>
                <EmptyState
                    icon="Warning"
                    title="Failed to load sprints"
                    description={error?.message || "An error occurred while loading sprints"}
                    action={<Button onClick={() => refetch()}>Retry</Button>}
                />
            </ErrorContainer>
        );
    }

    if (!sprints || sprints.length === 0) {
        return (
            <ErrorContainer>
                <EmptyState
                    icon="Timer"
                    title="No sprints yet"
                    description="Create your first sprint to organize your work into time-boxed iterations"
                />
            </ErrorContainer>
        );
    }

    const sections = groupSprintsByStatus(sprints);

    return (
        <TableContainer>
            {sections.map((section) => (
                <ViewSprintsPageTableSection
                    key={section.title}
                    title={section.title}
                    sprints={section.sprints}
                />
            ))}
        </TableContainer>
    );
}

export default ViewSprintsPageTable;
