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
import EmptyState from "../../design_system/EmptyState";
import Button from "../../design_system/Button";
import { useDashboardStats, useVelocity } from "../../hooks/queries";

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

const LoadingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 2rem;
    min-height: 400px;
`;

const ErrorContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 2rem;
`;

function AnalyticsDashboardPage() {
    const [timeframe, setTimeframe] = useState("7d");
    const { data: stats, isLoading, isError, error, refetch } = useDashboardStats();
    const { data: velocityData } = useVelocity();

    if (isLoading) {
        return (
            <AnalyticsDashboardPageLayout>
                <AnalyticsDashboardPageHeader
                    timeframe={timeframe}
                    onTimeframeChange={setTimeframe}
                />
                <Content>
                    <LoadingContainer>Loading analytics...</LoadingContainer>
                </Content>
            </AnalyticsDashboardPageLayout>
        );
    }

    if (isError) {
        return (
            <AnalyticsDashboardPageLayout>
                <AnalyticsDashboardPageHeader
                    timeframe={timeframe}
                    onTimeframeChange={setTimeframe}
                />
                <Content>
                    <ErrorContainer>
                        <EmptyState
                            icon="Warning"
                            title="Failed to load analytics"
                            description={error?.message || "An error occurred while loading dashboard data"}
                            action={<Button onClick={() => refetch()}>Retry</Button>}
                        />
                    </ErrorContainer>
                </Content>
            </AnalyticsDashboardPageLayout>
        );
    }

    // Use API data with fallbacks
    const totalIssues = stats?.totalIssues ?? 0;
    const completedIssues = stats?.completedIssues ?? 0;
    const inProgressIssues = stats?.inProgressIssues ?? 0;
    const backlogIssues = stats?.backlogIssues ?? 0;
    const completionRate = totalIssues > 0 ? Math.round((completedIssues / totalIssues) * 100) : 0;

    // Transform data for charts
    const issuesByStatusData = [
        { name: "Backlog", value: backlogIssues, color: "var(--gray-400)" },
        { name: "In Progress", value: inProgressIssues, color: "var(--yellow)" },
        { name: "Done", value: completedIssues, color: "var(--success)" },
    ].filter(d => d.value > 0);

    const issuesByPriorityData = stats?.issuesByPriority ? [
        { name: "High", count: stats.issuesByPriority.high ?? 0, color: "var(--error)" },
        { name: "Medium", count: stats.issuesByPriority.medium ?? 0, color: "var(--yellow)" },
        { name: "Low", count: stats.issuesByPriority.low ?? 0, color: "var(--success)" },
    ].filter(d => d.count > 0) : undefined;

    const velocityChartData = velocityData?.sprints?.map(s => ({
        sprint: s.sprintName,
        planned: s.planned,
        completed: s.completed,
    }));

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
                        value={String(totalIssues)}
                        trend={12}
                        trendLabel="vs last period"
                        icon={<Icon name="Circle" size={18} color="var(--purple)" weight="regular" />}
                    />
                    <StatCard
                        title="Completed"
                        value={String(completedIssues)}
                        trend={24}
                        trendLabel="vs last period"
                        icon={<Icon name="CheckCircle" size={18} color="var(--success)" weight="regular" />}
                    />
                    <StatCard
                        title="In Progress"
                        value={String(inProgressIssues)}
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
                            <IssuesByStatusChart data={issuesByStatusData.length > 0 ? issuesByStatusData : undefined} />
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
                            <TeamVelocityChart data={velocityChartData} />
                        </WidgetCardBody>
                    </WidgetCard>
                    <WidgetCard>
                        <WidgetCardHeader
                            title="By Priority"
                            icon={<Icon name="Flag" size={16} color="var(--error)" weight="regular" />}
                        />
                        <WidgetCardBody minHeight="220px">
                            <IssuesByPriorityChart data={issuesByPriorityData} />
                        </WidgetCardBody>
                    </WidgetCard>
                    <WidgetCard>
                        <WidgetCardHeader
                            title="Sprint Progress"
                            icon={<Icon name="Target" size={16} color="var(--success)" weight="regular" />}
                        />
                        <WidgetCardBody minHeight="220px">
                            <CompletionRateChart rate={completionRate} />
                        </WidgetCardBody>
                    </WidgetCard>
                </SmallChartsGrid>
            </Content>
        </AnalyticsDashboardPageLayout>
    );
}

export default AnalyticsDashboardPage;
