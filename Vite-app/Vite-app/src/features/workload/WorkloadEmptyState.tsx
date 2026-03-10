import styled from "styled-components";
import EmptyState from "../../design_system/EmptyState";
import Button from "../../design_system/Button";

const EmptyContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
`;

function WorkloadEmptyState() {
    return (
        <EmptyContainer>
            <EmptyState
                icon="Users"
                title="No team members"
                description="Add team members to start tracking their workload and capacity."
                action={<Button>Add Team Member</Button>}
            />
        </EmptyContainer>
    );
}

export default WorkloadEmptyState;
