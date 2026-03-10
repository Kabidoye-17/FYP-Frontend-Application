import styled from "styled-components";
import Icon from "../../../design_system/Icon";

type TrendDirection = "up" | "down" | "neutral";

interface StatCardTrendProps {
    value: number;
    label?: string;
}

const Container = styled.div<{ $direction: TrendDirection }>`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: ${({ $direction }) =>
        $direction === "up"
            ? "var(--success)"
            : $direction === "down"
            ? "var(--error)"
            : "var(--text-secondary)"};
`;

const TrendValue = styled.span`
    font-weight: 500;
`;

const TrendLabel = styled.span`
    color: var(--text-secondary);
`;

function StatCardTrend({ value, label }: Readonly<StatCardTrendProps>) {
    const direction: TrendDirection = value > 0 ? "up" : value < 0 ? "down" : "neutral";
    const absValue = Math.abs(value);
    const iconName = direction === "up" ? "TrendUp" : direction === "down" ? "TrendDown" : "Minus";

    return (
        <Container $direction={direction}>
            <Icon
                name={iconName}
                size={14}
                color={
                    direction === "up"
                        ? "var(--success)"
                        : direction === "down"
                        ? "var(--error)"
                        : "var(--text-secondary)"
                }
                weight="bold"
            />
            <TrendValue>
                {direction !== "neutral" && (direction === "up" ? "+" : "-")}
                {absValue}%
            </TrendValue>
            {label && <TrendLabel>{label}</TrendLabel>}
        </Container>
    );
}

export default StatCardTrend;
