import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import styled from "styled-components";

interface IssuesByStatusChartProps {
    data?: Array<{
        name: string;
        value: number;
        color: string;
    }>;
}

const MOCK_DATA = [
    { name: "Backlog", value: 24, color: "var(--gray-400)" },
    { name: "Todo", value: 18, color: "var(--blue)" },
    { name: "In Progress", value: 12, color: "var(--yellow)" },
    { name: "In Review", value: 8, color: "var(--purple)" },
    { name: "Done", value: 38, color: "var(--success)" },
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
    payload?: Array<{ payload: { name: string; value: number } }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <CustomTooltipContainer>
                <TooltipLabel>{data.name}</TooltipLabel>
                <TooltipValue>{data.value} issues</TooltipValue>
            </CustomTooltipContainer>
        );
    }
    return null;
}

function IssuesByStatusChart({ data = MOCK_DATA }: Readonly<IssuesByStatusChartProps>) {
    return (
        <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        formatter={(value) => (
                            <span style={{ color: "var(--text-secondary)", fontSize: "0.75rem" }}>
                                {value}
                            </span>
                        )}
                    />
                </PieChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
}

export default IssuesByStatusChart;
