import styled from "styled-components";
import Icon from "../../design_system/Icon";

interface MilestoneCardHeaderProps {
    title: string;
    status: "open" | "closed";
    dueDate: string;
}

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    border-bottom: 1px solid var(--section-background);
`;

const HeaderTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const Title = styled.h3`
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
`;

const StatusBadge = styled.span<{ $status: "open" | "closed" }>`
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: "Inter", sans-serif;
    font-size: 0.625rem;
    font-weight: 600;
    text-transform: uppercase;
    background-color: ${({ $status }) =>
        $status === "open" ? "rgba(34, 197, 94, 0.1)" : "var(--section-background)"};
    color: ${({ $status }) =>
        $status === "open" ? "var(--success-green)" : "var(--text-secondary)"};
`;

const DueDate = styled.div<{ $isOverdue: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: ${({ $isOverdue }) => ($isOverdue ? "var(--error-red)" : "var(--text-secondary)")};
`;

function MilestoneCardHeader({
    title,
    status,
    dueDate,
}: MilestoneCardHeaderProps) {
    const isOverdue = status === "open" && new Date(dueDate) < new Date();

    return (
        <HeaderContainer>
            <HeaderTop>
                <TitleContainer>
                    <Icon
                        name="Flag"
                        size={18}
                        color={status === "open" ? "var(--plum)" : "var(--text-secondary)"}
                        weight="fill"
                    />
                    <Title>{title}</Title>
                </TitleContainer>
                <StatusBadge $status={status}>
                    {status === "open" ? (
                        <>
                            <Icon name="Circle" size={8} color="var(--success-green)" weight="fill" />
                            Open
                        </>
                    ) : (
                        <>
                            <Icon name="CheckCircle" size={10} color="var(--text-secondary)" weight="fill" />
                            Closed
                        </>
                    )}
                </StatusBadge>
            </HeaderTop>
            <DueDate $isOverdue={isOverdue}>
                <Icon
                    name="Calendar"
                    size={14}
                    color={isOverdue ? "var(--error-red)" : "var(--text-secondary)"}
                    weight="regular"
                />
                Due {new Date(dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                })}
                {isOverdue && " (Overdue)"}
            </DueDate>
        </HeaderContainer>
    );
}

export default MilestoneCardHeader;
