import styled from "styled-components";

interface KanbanCardDetailsProps {
    description: string;
}

const DetailsContainer = styled.div`
    margin-top: 0.25rem;
`;

const Description = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin: 0;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

function KanbanCardDetails({ description }: KanbanCardDetailsProps) {
    if (!description) {
        return null;
    }

    return (
        <DetailsContainer>
            <Description>{description}</Description>
        </DetailsContainer>
    );
}

export default KanbanCardDetails;
