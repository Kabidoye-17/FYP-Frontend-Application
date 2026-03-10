import styled from "styled-components";
import Icon from "../../design_system/Icon";

interface Step {
    id: string;
    label: string;
}

interface ImportWizardStepIndicatorProps {
    steps: Step[];
    currentStep: number;
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border-bottom: 1px solid var(--border-color);
`;

const StepItem = styled.div`
    display: flex;
    align-items: center;
`;

const StepCircle = styled.div<{ $status: "completed" | "current" | "upcoming" }>`
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    background-color: ${({ $status }) =>
        $status === "completed"
            ? "var(--success)"
            : $status === "current"
            ? "var(--purple)"
            : "var(--section-background)"};
    color: ${({ $status }) =>
        $status === "upcoming" ? "var(--text-secondary)" : "var(--white)"};
    transition: background-color 0.2s ease;
`;

const StepLabel = styled.span<{ $status: "completed" | "current" | "upcoming" }>`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: ${({ $status }) =>
        $status === "current" ? "var(--text-primary)" : "var(--text-secondary)"};
    margin-left: 0.5rem;
    font-weight: ${({ $status }) => ($status === "current" ? 500 : 400)};
`;

const Connector = styled.div<{ $completed: boolean }>`
    width: 40px;
    height: 2px;
    background-color: ${({ $completed }) =>
        $completed ? "var(--success)" : "var(--border-color)"};
    margin: 0 0.5rem;
    transition: background-color 0.2s ease;
`;

function ImportWizardStepIndicator({
    steps,
    currentStep,
}: Readonly<ImportWizardStepIndicatorProps>) {
    const getStatus = (index: number): "completed" | "current" | "upcoming" => {
        if (index < currentStep) return "completed";
        if (index === currentStep) return "current";
        return "upcoming";
    };

    return (
        <Container>
            {steps.map((step, index) => (
                <StepItem key={step.id}>
                    <StepCircle $status={getStatus(index)}>
                        {getStatus(index) === "completed" ? (
                            <Icon name="Check" size={14} color="var(--white)" weight="bold" />
                        ) : (
                            index + 1
                        )}
                    </StepCircle>
                    <StepLabel $status={getStatus(index)}>{step.label}</StepLabel>
                    {index < steps.length - 1 && (
                        <Connector $completed={index < currentStep} />
                    )}
                </StepItem>
            ))}
        </Container>
    );
}

export default ImportWizardStepIndicator;
