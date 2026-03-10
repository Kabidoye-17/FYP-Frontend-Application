import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import styled from "styled-components";

interface IssuesOverTimeChartProps {
    data?: Array<{
        date: string;
        created: number;
        completed: number;
    }>;
}

const MOCK_DATA = [
    { date: "Mon", created: 12, completed: 8 },
    { date: "Tue", created: 15, completed: 12 },
    { date: "Wed", created: 8, completed: 14 },
    { date: "Thu", created: 18, completed: 16 },
    { date: "Fri", created: 14, completed: 20 },
    { date: "Sat", created: 6, completed: 8 },
    { date: "Sun", created: 4, completed: 6 },
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

const TooltipDate = styled.p`
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
    payload?: Array<{ payload: { date: string; created: number; completed: number } }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <CustomTooltipContainer>
                <TooltipDate>{data.date}</TooltipDate>
                <TooltipRow>
                    <TooltipDot $color="var(--purple)" />
                    <TooltipLabel>Created</TooltipLabel>
                    <TooltipValue>{data.created}</TooltipValue>
                </TooltipRow>
                <TooltipRow>
                    <TooltipDot $color="var(--success)" />
                    <TooltipLabel>Completed</TooltipLabel>
                    <TooltipValue>{data.completed}</TooltipValue>
                </TooltipRow>
            </CustomTooltipContainer>
        );
    }
    return null;
}

function IssuesOverTimeChart({ data = MOCK_DATA }: Readonly<IssuesOverTimeChartProps>) {
    return (
        <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--purple)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="var(--purple)" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--success)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="var(--success)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "var(--text-secondary)", fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--text-secondary)", fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="created"
                        stroke="var(--purple)"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorCreated)"
                    />
                    <Area
                        type="monotone"
                        dataKey="completed"
                        stroke="var(--success)"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorCompleted)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
}

export default IssuesOverTimeChart;
