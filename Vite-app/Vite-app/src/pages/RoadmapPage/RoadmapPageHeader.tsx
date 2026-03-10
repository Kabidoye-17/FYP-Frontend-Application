import styled from "styled-components";
import * as Dropdown from "../../design_system/Dropdown";
import SmallTimeframeOpener from "../../dropdowns/opener/SmallTimeframeOpener";
import TimeframeDropdownContent from "../../dropdowns/content/TimeframeDropdownContent";
import type { TimeframeOption } from "../RoadmapPage";

interface RoadmapPageHeaderProps {
    timeframe: TimeframeOption;
    onTimeframeChange: (timeframe: TimeframeOption) => void;
}

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid var(--section-background);
`;

const PageTitle = styled.h1`
    font-family: "Inter", sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
`;

const Controls = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

function RoadmapPageHeader({
    timeframe,
    onTimeframeChange,
}: RoadmapPageHeaderProps) {
    return (
        <HeaderContainer>
            <PageTitle>Roadmap</PageTitle>
            <Controls>
                <Dropdown.Root>
                    <Dropdown.Trigger asChild>
                        <SmallTimeframeOpener timeframe={timeframe} />
                    </Dropdown.Trigger>
                    <Dropdown.Portal>
                        <TimeframeDropdownContent
                            currentTimeframe={timeframe}
                            onTimeframeChange={onTimeframeChange}
                        />
                    </Dropdown.Portal>
                </Dropdown.Root>
            </Controls>
        </HeaderContainer>
    );
}

export default RoadmapPageHeader;
