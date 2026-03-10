import styled from "styled-components";

interface StatCardValueProps {
    value: string | number;
    size?: "small" | "medium" | "large";
}

const Value = styled.span<{ $size: "small" | "medium" | "large" }>`
    font-family: "Inter", sans-serif;
    font-weight: 700;
    color: var(--text-primary);
    font-size: ${({ $size }) =>
        $size === "small" ? "1.25rem" : $size === "medium" ? "1.75rem" : "2.25rem"};
    line-height: 1.2;
`;

function StatCardValue({ value, size = "medium" }: Readonly<StatCardValueProps>) {
    return <Value $size={size}>{value}</Value>;
}

export default StatCardValue;
