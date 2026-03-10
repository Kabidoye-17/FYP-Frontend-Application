import styled from "styled-components";
import type { ReactNode } from "react";
import StatCardValue from "./StatCardValue";
import StatCardTrend from "./StatCardTrend";

interface StatCardProps {
    title: string;
    value: string | number;
    trend?: number;
    trendLabel?: string;
    icon?: ReactNode;
    size?: "small" | "medium" | "large";
}

const Card = styled.div`
    background-color: var(--white);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    transition: box-shadow 0.2s ease;

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    }
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Title = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--text-secondary);
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background-color: var(--section-background);
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
`;

function StatCard({
    title,
    value,
    trend,
    trendLabel,
    icon,
    size = "medium",
}: Readonly<StatCardProps>) {
    return (
        <Card>
            <Header>
                <Title>{title}</Title>
                {icon && <IconWrapper>{icon}</IconWrapper>}
            </Header>
            <Content>
                <StatCardValue value={value} size={size} />
                {trend !== undefined && <StatCardTrend value={trend} label={trendLabel} />}
            </Content>
        </Card>
    );
}

export default StatCard;
