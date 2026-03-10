import styled from "styled-components";

interface RoadmapTimelineHeaderProps {
    periods: { label: string; subPeriods: string[] }[];
}

const HeaderContainer = styled.div`
    display: flex;
    border-bottom: 1px solid var(--section-background);
    position: sticky;
    top: 0;
    background-color: var(--white);
    z-index: 10;
`;

const TitleColumn = styled.div`
    width: 250px;
    min-width: 250px;
    padding: 1rem;
    border-right: 1px solid var(--section-background);
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

const PeriodsContainer = styled.div`
    display: flex;
    flex: 1;
`;

const PeriodGroup = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 200px;
`;

const PeriodLabel = styled.div`
    padding: 0.5rem 1rem;
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-primary);
    text-align: center;
    border-bottom: 1px solid var(--section-background);
    background-color: var(--section-background);
`;

const SubPeriodsContainer = styled.div`
    display: flex;
`;

const SubPeriod = styled.div`
    flex: 1;
    padding: 0.375rem;
    font-family: "Inter", sans-serif;
    font-size: 0.625rem;
    color: var(--text-secondary);
    text-align: center;
    border-right: 1px solid var(--section-background);

    &:last-child {
        border-right: none;
    }
`;

function RoadmapTimelineHeader({ periods }: RoadmapTimelineHeaderProps) {
    return (
        <HeaderContainer>
            <TitleColumn>Project</TitleColumn>
            <PeriodsContainer>
                {periods.map((period) => (
                    <PeriodGroup key={period.label}>
                        <PeriodLabel>{period.label}</PeriodLabel>
                        <SubPeriodsContainer>
                            {period.subPeriods.map((subPeriod) => (
                                <SubPeriod key={`${period.label}-${subPeriod}`}>
                                    {subPeriod}
                                </SubPeriod>
                            ))}
                        </SubPeriodsContainer>
                    </PeriodGroup>
                ))}
            </PeriodsContainer>
        </HeaderContainer>
    );
}

export default RoadmapTimelineHeader;
