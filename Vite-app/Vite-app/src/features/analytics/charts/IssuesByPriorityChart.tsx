import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import styled from "styled-components";

interface IssuesByPriorityChartProps {
    data?: Array<{
        name: string;
        count: number;
        color: string;
    }>;
}

const MOCK_DATA = [
    { name: "Urgent", count: 8, color: "var(--error)" },
    { name: "High", count: 15, color: "var(--warning)" },
    { name: "Medium", count: 32, color: "var(--yellow)" },
    { name: "Low", count: 22, color: "var(--success)" },
    { name: "No Priority", count: 12, color: "var(--gray-400)" },
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

const TooltipLabel = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin: 0 0 0.25rem 0;
`;

const TooltipValue = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
`;

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{ payload: { name: string; count: number } }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <CustomTooltipContainer>
                <TooltipLabel>{data.name}</TooltipLabel>
                <TooltipValue>{data.count} issues</TooltipValue>
            </CustomTooltipContainer>
        );
    }
    return null;
}

function IssuesByPriorityChart({ data = MOCK_DATA }: Readonly<IssuesByPriorityChartProps>) {
    return (
        <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" horizontal={false} />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: "var(--text-secondary)", fontSize: 12 }} />
                    <YAxis
                        type="category"
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                        width={70}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--hover-background)" }} />
                    <Bar dataKey="count" radius={[0, 4, 4, 0]} fill="var(--purple)" />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
}

export default IssuesByPriorityChart;
