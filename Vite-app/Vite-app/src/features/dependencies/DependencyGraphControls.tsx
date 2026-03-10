import styled from "styled-components";
import Button from "../../design_system/Button";
import Icon from "../../design_system/Icon";

interface DependencyGraphControlsProps {
    zoom: number;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onReset: () => void;
    onFitView: () => void;
}

const Container = styled.div`
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    background-color: var(--white);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 0.375rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const ZoomLevel = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.6875rem;
    color: var(--text-secondary);
    text-align: center;
    padding: 0.25rem;
`;

const Divider = styled.div`
    height: 1px;
    background-color: var(--border-color);
    margin: 0.25rem 0;
`;

function DependencyGraphControls({
    zoom,
    onZoomIn,
    onZoomOut,
    onReset,
    onFitView,
}: Readonly<DependencyGraphControlsProps>) {
    return (
        <Container>
            <Button
                icon={<Icon name="Plus" size={16} color="var(--text-primary)" weight="regular" />}
                IconOnly
                backgroundColor="transparent"
                onClick={onZoomIn}
            />
            <ZoomLevel>{Math.round(zoom * 100)}%</ZoomLevel>
            <Button
                icon={<Icon name="Minus" size={16} color="var(--text-primary)" weight="regular" />}
                IconOnly
                backgroundColor="transparent"
                onClick={onZoomOut}
            />
            <Divider />
            <Button
                icon={<Icon name="ArrowsIn" size={16} color="var(--text-primary)" weight="regular" />}
                IconOnly
                backgroundColor="transparent"
                onClick={onFitView}
            />
            <Button
                icon={<Icon name="ArrowCounterClockwise" size={16} color="var(--text-primary)" weight="regular" />}
                IconOnly
                backgroundColor="transparent"
                onClick={onReset}
            />
        </Container>
    );
}

export default DependencyGraphControls;
