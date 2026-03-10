import { useState, useMemo } from "react";
import styled from "styled-components";
import DependencyGraphNode, { type GraphNode } from "./DependencyGraphNode";
import DependencyGraphEdge, { type GraphEdge } from "./DependencyGraphEdge";
import DependencyGraphControls from "./DependencyGraphControls";
import DependencyGraphLegend from "./DependencyGraphLegend";
import DependencyGraphEmptyState from "./DependencyGraphEmptyState";

interface DependencyGraphProps {
    nodes: GraphNode[];
    edges: GraphEdge[];
    onNodeClick?: (nodeId: string) => void;
    onAddDependency?: () => void;
}

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 400px;
    background-color: var(--white);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    overflow: hidden;
`;

const SVGContainer = styled.svg`
    width: 100%;
    height: 100%;
    cursor: grab;

    &:active {
        cursor: grabbing;
    }
`;

const BackgroundPattern = styled.pattern``;

function DependencyGraph({
    nodes,
    edges,
    onNodeClick,
    onAddDependency,
}: Readonly<DependencyGraphProps>) {
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [selectedNode, setSelectedNode] = useState<string | null>(null);

    const nodeMap = useMemo(() => {
        const map = new Map<string, GraphNode>();
        nodes.forEach((node) => map.set(node.id, node));
        return map;
    }, [nodes]);

    const handleZoomIn = () => {
        setZoom((prev) => Math.min(prev + 0.1, 2));
    };

    const handleZoomOut = () => {
        setZoom((prev) => Math.max(prev - 0.1, 0.5));
    };

    const handleReset = () => {
        setZoom(1);
        setPan({ x: 0, y: 0 });
    };

    const handleFitView = () => {
        // Auto-fit logic would go here
        handleReset();
    };

    const handleNodeClick = (nodeId: string) => {
        setSelectedNode(nodeId);
        onNodeClick?.(nodeId);
    };

    if (nodes.length === 0) {
        return (
            <Container>
                <DependencyGraphEmptyState onAddDependency={onAddDependency} />
            </Container>
        );
    }

    return (
        <Container>
            <SVGContainer viewBox="0 0 800 500">
                <defs>
                    <BackgroundPattern
                        id="grid"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                    >
                        <circle cx="1" cy="1" r="1" fill="var(--border-color)" opacity="0.5" />
                    </BackgroundPattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
                    {edges.map((edge) => {
                        const source = nodeMap.get(edge.source);
                        const target = nodeMap.get(edge.target);
                        if (!source || !target) return null;
                        return (
                            <DependencyGraphEdge
                                key={edge.id}
                                edge={edge}
                                sourceX={source.x}
                                sourceY={source.y}
                                targetX={target.x}
                                targetY={target.y}
                            />
                        );
                    })}
                    {nodes.map((node) => (
                        <DependencyGraphNode
                            key={node.id}
                            node={node}
                            isSelected={selectedNode === node.id}
                            onClick={() => handleNodeClick(node.id)}
                        />
                    ))}
                </g>
            </SVGContainer>
            <DependencyGraphLegend />
            <DependencyGraphControls
                zoom={zoom}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onReset={handleReset}
                onFitView={handleFitView}
            />
        </Container>
    );
}

export default DependencyGraph;
