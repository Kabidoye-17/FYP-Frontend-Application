import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import styled from "styled-components";

interface TeamVelocityChartProps {
    data?: Array<{
        sprint: string;
        planned: number;
        completed: number;
    }>;
}

const MOCK_DATA = [
    { sprint: "Sprint 1", planned: 24, completed: 20 },
    { sprint: "Sprint 2", planned: 28, completed: 26 },
    { sprint: "Sprint 3", planned: 32, completed: 28 },
    { sprint: "Sprint 4", planned: 30, completed: 32 },
    { sprint: "Sprint 5", planned: 34, completed: 30 },
    { sprint: "Sprint 6", planned: 32, completed: 34 },
];

const ChartContainer = styled.div`
    width: 100%;
    height: 250px;
`;

const CustomTooltipContainer = styled.div`
    background-color: var(--white);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const TooltipTitle = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--text-primary);
    margin: 0 0 0.5rem 0;
`;

const TooltipRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.25rem;
`;

const TooltipDot = styled.div<{ $color: string }>`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ $color }) => $color};
`;

const TooltipLabel = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
`;

const TooltipValue = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-left: auto;
`;

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{ payload: { sprint: string; planned: number; completed: number } }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <CustomTooltipContainer>
                <TooltipTitle>{data.sprint}</TooltipTitle>
                <TooltipRow>
                    <TooltipDot $color="var(--blue)" />
                    <TooltipLabel>Planned</TooltipLabel>
                    <TooltipValue>{data.planned} pts</TooltipValue>
                </TooltipRow>
                <TooltipRow>
                    <TooltipDot $color="var(--success)" />
                    <TooltipLabel>Completed</TooltipLabel>
                    <TooltipValue>{data.completed} pts</TooltipValue>
                </TooltipRow>
            </CustomTooltipContainer>
        );
    }
    return null;
}

function TeamVelocityChart({ data = MOCK_DATA }: Readonly<TeamVelocityChartProps>) {
    const avgVelocity = Math.round(
        data.reduce((sum, item) => sum + item.completed, 0) / data.length
    );

    return (
        <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                    <XAxis
                        dataKey="sprint"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "var(--text-secondary)", fontSize: 11 }}
                    />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--text-secondary)", fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine
                        y={avgVelocity}
                        stroke="var(--text-tertiary)"
                        strokeDasharray="5 5"
                        label={{
                            value: `Avg: ${avgVelocity}`,
                            fill: "var(--text-secondary)",
                            fontSize: 11,
                            position: "right",
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="planned"
                        stroke="var(--blue)"
                        strokeWidth={2}
                        dot={{ fill: "var(--blue)", r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="completed"
                        stroke="var(--success)"
                        strokeWidth={2}
                        dot={{ fill: "var(--success)", r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
}

export default TeamVelocityChart;
