import styled from "styled-components";
import type { ReactNode } from "react";
import Button from "../../../design_system/Button";
import Icon from "../../../design_system/Icon";

interface WidgetCardHeaderProps {
    title: string;
    icon?: ReactNode;
    action?: {
        label: string;
        onClick: () => void;
    };
}

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--border-color);
`;

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 6px;
    background-color: var(--section-background);
`;

const Title = styled.h3`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
`;

function WidgetCardHeader({ title, icon, action }: Readonly<WidgetCardHeaderProps>) {
    return (
        <Header>
            <TitleWrapper>
                {icon && <IconWrapper>{icon}</IconWrapper>}
                <Title>{title}</Title>
            </TitleWrapper>
            {action && (
                <Button
                    rightIcon={<Icon name="ArrowRight" size={14} color="var(--text-secondary)" weight="regular" />}
                    backgroundColor="transparent"
                    color="var(--text-secondary)"
                    onClick={action.onClick}
                >
                    {action.label}
                </Button>
            )}
        </Header>
    );
}

export default WidgetCardHeader;
