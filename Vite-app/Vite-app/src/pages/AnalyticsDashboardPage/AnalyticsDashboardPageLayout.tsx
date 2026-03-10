import styled from "styled-components";
import type { ReactNode } from "react";

interface AnalyticsDashboardPageLayoutProps {
    children: ReactNode;
}

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: var(--section-background);
    overflow-y: auto;
`;

function AnalyticsDashboardPageLayout({ children }: Readonly<AnalyticsDashboardPageLayoutProps>) {
    return <Layout>{children}</Layout>;
}

export default AnalyticsDashboardPageLayout;
