import styled from "styled-components";
import type { ReactNode } from "react";

interface StatGridProps {
    children: ReactNode;
    columns?: number;
}

const Grid = styled.div<{ $columns: number }>`
    display: grid;
    grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
    gap: 1rem;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

function StatGrid({ children, columns = 4 }: Readonly<StatGridProps>) {
    return <Grid $columns={columns}>{children}</Grid>;
}

export default StatGrid;
