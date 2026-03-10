import styled from "styled-components";
import Icon from "./Icon";
import type { IconProps } from "@phosphor-icons/react";

interface EmptyStateProps {
    icon?: IconProps["name"];
    title: string;
    description?: string;
    action?: React.ReactNode;
}

const EmptyStateContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 2rem;
    text-align: center;
    min-height: 200px;
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    border-radius: 16px;
    background-color: var(--section-background);
    margin-bottom: 1.5rem;
`;

const Title = styled.h3`
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 0.5rem 0;
`;

const Description = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: 0 0 1.5rem 0;
    max-width: 320px;
`;

const ActionContainer = styled.div`
    margin-top: 0.5rem;
`;

function EmptyState({
    icon = "Package",
    title,
    description,
    action,
}: Readonly<EmptyStateProps>) {
    return (
        <EmptyStateContainer>
            <IconWrapper>
                <Icon
                    name={icon as any}
                    size={32}
                    color="var(--text-secondary)"
                    weight="regular"
                />
            </IconWrapper>
            <Title>{title}</Title>
            {description && <Description>{description}</Description>}
            {action && <ActionContainer>{action}</ActionContainer>}
        </EmptyStateContainer>
    );
}

export default EmptyState;
