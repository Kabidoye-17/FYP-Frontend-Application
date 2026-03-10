import styled from "styled-components";
import type { ReactNode } from "react";

interface TeamPageLayoutProps {
    children: ReactNode;
}

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: var(--section-background);
    overflow-y: auto;
`;

function TeamPageLayout({ children }: Readonly<TeamPageLayoutProps>) {
    return <Layout>{children}</Layout>;
}

export default TeamPageLayout;
