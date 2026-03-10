import styled from "styled-components";
import Button from "../../design_system/Button";
import Icon from "../../design_system/Icon";
import * as Dropdown from "../../design_system/Dropdown";

interface AnalyticsDashboardPageHeaderProps {
    timeframe: string;
    onTimeframeChange: (timeframe: string) => void;
}

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-color);
`;

const TitleSection = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

const IconWrapper = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background-color: var(--purple-light);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TitleContent = styled.div``;

const Title = styled.h1`
    font-family: "Inter", sans-serif;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
`;

const Subtitle = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 0.8125rem;
    color: var(--text-secondary);
    margin: 0.125rem 0 0 0;
`;

const ActionsSection = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

const TIMEFRAME_OPTIONS = [
    { label: "Last 7 days", value: "7d" },
    { label: "Last 14 days", value: "14d" },
    { label: "Last 30 days", value: "30d" },
    { label: "Last 90 days", value: "90d" },
    { label: "This year", value: "year" },
];

function AnalyticsDashboardPageHeader({
    timeframe,
    onTimeframeChange,
}: Readonly<AnalyticsDashboardPageHeaderProps>) {
    const selectedLabel = TIMEFRAME_OPTIONS.find((o) => o.value === timeframe)?.label ?? "Last 7 days";

    return (
        <Header>
            <TitleSection>
                <IconWrapper>
                    <Icon name="ChartLine" size={22} color="var(--purple)" weight="fill" />
                </IconWrapper>
                <TitleContent>
                    <Title>Analytics</Title>
                    <Subtitle>Track project metrics and team performance</Subtitle>
                </TitleContent>
            </TitleSection>
            <ActionsSection>
                <Dropdown.Root>
                    <Dropdown.Trigger asChild>
                        <Button
                            rightIcon={<Icon name="CaretDown" size={16} color="var(--text-primary)" weight="regular" />}
                            backgroundColor="var(--white)"
                            color="var(--text-primary)"
                        >
                            {selectedLabel}
                        </Button>
                    </Dropdown.Trigger>
                    <Dropdown.Portal>
                        <Dropdown.Content sideOffset={5} align="end">
                            {TIMEFRAME_OPTIONS.map((option) => (
                                <Dropdown.Item
                                    key={option.value}
                                    onSelect={() => onTimeframeChange(option.value)}
                                >
                                    {option.label}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Content>
                    </Dropdown.Portal>
                </Dropdown.Root>
                <Button
                    icon={<Icon name="Export" size={16} color="var(--white)" weight="regular" />}
                    backgroundColor="var(--purple)"
                    color="var(--white)"
                    onClick={() => console.log("Export analytics")}
                >
                    Export
                </Button>
            </ActionsSection>
        </Header>
    );
}

export default AnalyticsDashboardPageHeader;
