import { RadialBarChart, RadialBar, ResponsiveContainer, Legend } from "recharts";
import styled from "styled-components";

interface CompletionRateChartProps {
    rate?: number;
    label?: string;
}

const ChartContainer = styled.div`
    width: 100%;
    height: 200px;
    position: relative;
`;

const CenterLabel = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    text-align: center;
`;

const RateValue = styled.div`
    font-family: "Inter", sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-primary);
`;

const RateLabel = styled.div`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
`;

function CompletionRateChart({
    rate = 78,
    label = "Completion Rate",
}: Readonly<CompletionRateChartProps>) {
    const data = [
        {
            name: "Completion",
            value: rate,
            fill: rate >= 80 ? "var(--success)" : rate >= 60 ? "var(--yellow)" : "var(--error)",
        },
    ];

    return (
        <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="90%"
                    barSize={12}
                    data={data}
                    startAngle={90}
                    endAngle={-270}
                >
                    <RadialBar
                        background={{ fill: "var(--section-background)" }}
                        dataKey="value"
                        cornerRadius={10}
                    />
                    <Legend
                        iconSize={0}
                        layout="horizontal"
                        verticalAlign="bottom"
                        content={() => null}
                    />
                </RadialBarChart>
            </ResponsiveContainer>
            <CenterLabel>
                <RateValue>{rate}%</RateValue>
                <RateLabel>{label}</RateLabel>
            </CenterLabel>
        </ChartContainer>
    );
}

export default CompletionRateChart;
