import styled from "styled-components";
import type { ReactNode } from "react";

interface WidgetCardProps {
    children: ReactNode;
    className?: string;
}

const Card = styled.div`
    background-color: var(--white);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    overflow: hidden;
    transition: box-shadow 0.2s ease;

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
`;

function WidgetCard({ children, className }: Readonly<WidgetCardProps>) {
    return <Card className={className}>{children}</Card>;
}

export default WidgetCard;
