import styled from "styled-components";
import Icon from "../../design_system/Icon";

interface WorkloadPageHeaderProps {
    memberCount: number;
}

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid var(--section-background);
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

const PageTitle = styled.h1`
    font-family: "Inter", sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
`;

const MemberCount = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem 0.5rem;
    background-color: var(--section-background);
    border-radius: 12px;
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--text-secondary);
`;

const LegendContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const LegendItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
`;

const LegendDot = styled.div<{ $color: string }>`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ $color }) => $color};
`;

function WorkloadPageHeader({ memberCount }: WorkloadPageHeaderProps) {
    return (
        <HeaderContainer>
            <TitleContainer>
                <Icon name="Users" size={24} color="var(--plum)" weight="fill" />
                <PageTitle>Team Workload</PageTitle>
                <MemberCount>{memberCount} members</MemberCount>
            </TitleContainer>
            <LegendContainer>
                <LegendItem>
                    <LegendDot $color="var(--success-green)" />
                    Under capacity
                </LegendItem>
                <LegendItem>
                    <LegendDot $color="var(--warning-orange)" />
                    At capacity
                </LegendItem>
                <LegendItem>
                    <LegendDot $color="var(--error-red)" />
                    Over capacity
                </LegendItem>
            </LegendContainer>
        </HeaderContainer>
    );
}

export default WorkloadPageHeader;
