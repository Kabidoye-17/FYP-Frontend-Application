import styled from "styled-components";
import { NODE_WIDTH } from "./DependencyGraphNode";

export interface GraphEdge {
    id: string;
    source: string;
    target: string;
    type: "blocks" | "blocked-by" | "relates-to" | "duplicates";
}

interface DependencyGraphEdgeProps {
    edge: GraphEdge;
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
}

const EdgePath = styled.path<{ $type: GraphEdge["type"] }>`
    fill: none;
    stroke: ${({ $type }) =>
        $type === "blocks"
            ? "var(--error)"
            : $type === "blocked-by"
            ? "var(--warning)"
            : $type === "relates-to"
            ? "var(--blue)"
            : "var(--text-tertiary)"};
    stroke-width: 2;
    stroke-dasharray: ${({ $type }) => ($type === "duplicates" ? "4,4" : "none")};
`;

const ArrowMarker = styled.marker``;

function DependencyGraphEdge({
    edge,
    sourceX,
    sourceY,
    targetX,
    targetY,
}: Readonly<DependencyGraphEdgeProps>) {
    // Adjust for node dimensions
    const startX = sourceX + NODE_WIDTH / 2;
    const startY = sourceY;
    const endX = targetX - NODE_WIDTH / 2;
    const endY = targetY;

    // Create curved path
    const midX = (startX + endX) / 2;
    const path = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;

    const markerId = `arrow-${edge.type}`;

    return (
        <g>
            <defs>
                <ArrowMarker
                    id={markerId}
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                    markerUnits="strokeWidth"
                >
                    <path
                        d="M0,0 L0,6 L9,3 z"
                        fill={
                            edge.type === "blocks"
                                ? "var(--error)"
                                : edge.type === "blocked-by"
                                ? "var(--warning)"
                                : edge.type === "relates-to"
                                ? "var(--blue)"
                                : "var(--text-tertiary)"
                        }
                    />
                </ArrowMarker>
            </defs>
            <EdgePath d={path} $type={edge.type} markerEnd={`url(#${markerId})`} />
        </g>
    );
}

export default DependencyGraphEdge;
