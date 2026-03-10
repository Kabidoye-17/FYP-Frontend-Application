import styled from "styled-components";
import Icon from "../../design_system/Icon";
import Button from "../../design_system/Button";

interface DependencyGraphEmptyStateProps {
    onAddDependency?: () => void;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 3rem;
    text-align: center;
`;

const IconWrapper = styled.div`
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: var(--section-background);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.25rem;
`;

const Title = styled.h3`
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 0.375rem 0;
`;

const Description = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: 0 0 1.25rem 0;
    max-width: 300px;
`;

function DependencyGraphEmptyState({ onAddDependency }: Readonly<DependencyGraphEmptyStateProps>) {
    return (
        <Container>
            <IconWrapper>
                <Icon name="GitBranch" size={32} color="var(--text-secondary)" weight="regular" />
            </IconWrapper>
            <Title>No dependencies</Title>
            <Description>
                Link issues together to visualize how work depends on each other.
            </Description>
            {onAddDependency && (
                <Button
                    icon={<Icon name="Plus" size={14} color="var(--white)" weight="bold" />}
                    backgroundColor="var(--purple)"
                    color="var(--white)"
                    onClick={onAddDependency}
                >
                    Add dependency
                </Button>
            )}
        </Container>
    );
}

export default DependencyGraphEmptyState;
