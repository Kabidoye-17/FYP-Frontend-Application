import styled from "styled-components";

export interface GraphNode {
    id: string;
    label: string;
    x: number;
    y: number;
    status: "done" | "in-progress" | "blocked" | "todo";
}

interface DependencyGraphNodeProps {
    node: GraphNode;
    isSelected?: boolean;
    onClick?: () => void;
}

const NodeGroup = styled.g`
    cursor: pointer;

    &:hover rect {
        stroke-width: 2;
    }
`;

const NodeRect = styled.rect<{ $status: GraphNode["status"]; $isSelected: boolean }>`
    fill: ${({ $status }) =>
        $status === "done"
            ? "var(--success-light)"
            : $status === "in-progress"
            ? "var(--yellow-light)"
            : $status === "blocked"
            ? "var(--error-light)"
            : "var(--section-background)"};
    stroke: ${({ $status, $isSelected }) =>
        $isSelected
            ? "var(--purple)"
            : $status === "done"
            ? "var(--success)"
            : $status === "in-progress"
            ? "var(--yellow)"
            : $status === "blocked"
            ? "var(--error)"
            : "var(--border-color)"};
    stroke-width: ${({ $isSelected }) => ($isSelected ? 2 : 1)};
    transition: stroke-width 0.15s ease;
`;

const NodeText = styled.text`
    font-family: "Inter", sans-serif;
    font-size: 11px;
    fill: var(--text-primary);
    text-anchor: middle;
    dominant-baseline: middle;
    pointer-events: none;
`;

const NODE_WIDTH = 120;
const NODE_HEIGHT = 36;
const BORDER_RADIUS = 8;

function DependencyGraphNode({
    node,
    isSelected = false,
    onClick,
}: Readonly<DependencyGraphNodeProps>) {
    return (
        <NodeGroup onClick={onClick}>
            <NodeRect
                x={node.x - NODE_WIDTH / 2}
                y={node.y - NODE_HEIGHT / 2}
                width={NODE_WIDTH}
                height={NODE_HEIGHT}
                rx={BORDER_RADIUS}
                ry={BORDER_RADIUS}
                $status={node.status}
                $isSelected={isSelected}
            />
            <NodeText x={node.x} y={node.y}>
                {node.label.length > 14 ? `${node.label.slice(0, 14)}...` : node.label}
            </NodeText>
        </NodeGroup>
    );
}

export default DependencyGraphNode;
export { NODE_WIDTH, NODE_HEIGHT };
