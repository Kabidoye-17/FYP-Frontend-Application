import styled from "styled-components";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

interface SprintBurndownChartProps {
    startDate: string;
    endDate: string;
    totalPoints: number;
}

const ChartContainer = styled.div`
    width: 100%;
    height: 300px;
    padding: 1rem;
    background-color: var(--section-background);
    border-radius: 12px;
`;

const generateMockData = (startDate: string, endDate: string, totalPoints: number) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const pointsPerDay = totalPoints / days;

    const data = [];
    let remainingIdeal = totalPoints;
    let remainingActual = totalPoints;

    for (let i = 0; i <= days; i++) {
        const date = new Date(start);
        date.setDate(date.getDate() + i);

        // Simulate actual progress with some variation
        if (i > 0 && i <= Math.floor(days / 2)) {
            remainingActual -= Math.random() * pointsPerDay * 1.5;
        }

        data.push({
            day: `Day ${i}`,
            date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            ideal: Math.max(0, Math.round(remainingIdeal * 10) / 10),
            actual: i <= Math.floor(days / 2) ? Math.max(0, Math.round(remainingActual * 10) / 10) : null,
        });

        remainingIdeal -= pointsPerDay;
    }

    return data;
};

function SprintBurndownChart({
    startDate,
    endDate,
    totalPoints,
}: SprintBurndownChartProps) {
    const data = generateMockData(startDate, endDate, totalPoints);

    return (
        <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--white)" />
                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12, fill: "var(--text-secondary)" }}
                        tickLine={false}
                        axisLine={{ stroke: "var(--white)" }}
                    />
                    <YAxis
                        tick={{ fontSize: 12, fill: "var(--text-secondary)" }}
                        tickLine={false}
                        axisLine={{ stroke: "var(--white)" }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "var(--white)",
                            border: "1px solid var(--section-background)",
                            borderRadius: "8px",
                            fontFamily: "Inter, sans-serif",
                            fontSize: "0.75rem",
                        }}
                    />
                    <Legend
                        wrapperStyle={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "0.75rem",
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="ideal"
                        stroke="var(--text-secondary)"
                        strokeDasharray="5 5"
                        strokeWidth={2}
                        dot={false}
                        name="Ideal"
                    />
                    <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="var(--plum)"
                        strokeWidth={2}
                        dot={{ fill: "var(--plum)", strokeWidth: 2 }}
                        name="Actual"
                        connectNulls={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
}

export default SprintBurndownChart;
