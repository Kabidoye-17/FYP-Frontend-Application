import styled from "styled-components";
import type { ReactNode } from "react";

interface WidgetCardBodyProps {
    children: ReactNode;
    padding?: string;
    minHeight?: string;
}

const Body = styled.div<{ $padding: string; $minHeight: string }>`
    padding: ${({ $padding }) => $padding};
    min-height: ${({ $minHeight }) => $minHeight};
`;

function WidgetCardBody({
    children,
    padding = "1.25rem",
    minHeight = "200px",
}: Readonly<WidgetCardBodyProps>) {
    return (
        <Body $padding={padding} $minHeight={minHeight}>
            {children}
        </Body>
    );
}

export default WidgetCardBody;
