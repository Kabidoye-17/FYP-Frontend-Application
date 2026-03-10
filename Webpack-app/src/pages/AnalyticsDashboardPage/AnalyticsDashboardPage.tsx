import { useState } from "react";
import styled from "styled-components";
import AnalyticsDashboardPageLayout from "./AnalyticsDashboardPageLayout";
import AnalyticsDashboardPageHeader from "./AnalyticsDashboardPageHeader";
import Icon from "../../design_system/Icon";
import StatCard from "../../features/analytics/stats/StatCard";
import StatGrid from "../../features/analytics/stats/StatGrid";
import WidgetCard from "../../features/analytics/widgets/WidgetCard";
import WidgetCardHeader from "../../features/analytics/widgets/WidgetCardHeader";
import WidgetCardBody from "../../features/analytics/widgets/WidgetCardBody";
import IssuesByStatusChart from "../../features/analytics/charts/IssuesByStatusChart";
import IssuesByPriorityChart from "../../features/analytics/charts/IssuesByPriorityChart";
import IssuesOverTimeChart from "../../features/analytics/charts/IssuesOverTimeChart";
import TeamVelocityChart from "../../features/analytics/charts/TeamVelocityChart";
import CompletionRateChart from "../../features/analytics/charts/CompletionRateChart";

const Content = styled.div`
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const ChartsGrid = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
    }
`;

const SmallChartsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;

    @media (max-width: 1200px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

function AnalyticsDashboardPage() {
    const [timeframe, setTimeframe] = useState("7d");

    return (
        <AnalyticsDashboardPageLayout>
            <AnalyticsDashboardPageHeader
                timeframe={timeframe}
                onTimeframeChange={setTimeframe}
            />
            <Content>
                <StatGrid columns={4}>
                    <StatCard
                        title="Total Issues"
                        value="142"
                        trend={12}
                        trendLabel="vs last period"
                        icon={<Icon name="Circle" size={18} color="var(--purple)" weight="regular" />}
                    />
                    <StatCard
                        title="Completed"
                        value="89"
                        trend={24}
                        trendLabel="vs last period"
                        icon={<Icon name="CheckCircle" size={18} color="var(--success)" weight="regular" />}
                    />
                    <StatCard
                        title="In Progress"
                        value="28"
                        trend={-5}
                        trendLabel="vs last period"
                        icon={<Icon name="Clock" size={18} color="var(--yellow)" weight="regular" />}
                    />
                    <StatCard
                        title="Avg. Resolution Time"
                        value="2.4 days"
                        trend={-18}
                        trendLabel="faster"
                        icon={<Icon name="Timer" size={18} color="var(--blue)" weight="regular" />}
                    />
                </StatGrid>

                <ChartsGrid>
                    <WidgetCard>
                        <WidgetCardHeader
                            title="Issues Over Time"
                            icon={<Icon name="ChartLineUp" size={16} color="var(--purple)" weight="regular" />}
                        />
                        <WidgetCardBody>
                            <IssuesOverTimeChart />
                        </WidgetCardBody>
                    </WidgetCard>
                    <WidgetCard>
                        <WidgetCardHeader
                            title="Issues by Status"
                            icon={<Icon name="ChartPie" size={16} color="var(--purple)" weight="regular" />}
                        />
                        <WidgetCardBody>
                            <IssuesByStatusChart />
                        </WidgetCardBody>
                    </WidgetCard>
                </ChartsGrid>

                <SmallChartsGrid>
                    <WidgetCard>
                        <WidgetCardHeader
                            title="Team Velocity"
                            icon={<Icon name="Lightning" size={16} color="var(--yellow)" weight="regular" />}
                        />
                        <WidgetCardBody minHeight="220px">
                            <TeamVelocityChart />
                        </WidgetCardBody>
                    </WidgetCard>
                    <WidgetCard>
                        <WidgetCardHeader
                            title="By Priority"
                            icon={<Icon name="Flag" size={16} color="var(--error)" weight="regular" />}
                        />
                        <WidgetCardBody minHeight="220px">
                            <IssuesByPriorityChart />
                        </WidgetCardBody>
                    </WidgetCard>
                    <WidgetCard>
                        <WidgetCardHeader
                            title="Sprint Progress"
                            icon={<Icon name="Target" size={16} color="var(--success)" weight="regular" />}
                        />
                        <WidgetCardBody minHeight="220px">
                            <CompletionRateChart rate={78} />
                        </WidgetCardBody>
                    </WidgetCard>
                </SmallChartsGrid>
            </Content>
        </AnalyticsDashboardPageLayout>
    );
}

export default AnalyticsDashboardPage;
