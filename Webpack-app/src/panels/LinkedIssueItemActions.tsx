import styled from "styled-components";
import Button from "../design_system/Button";
import Icon from "../design_system/Icon";

interface LinkedIssueItemActionsProps {
    onView: () => void;
    onUnlink: () => void;
}

const Container = styled.div`
    display: flex;
    gap: 0.25rem;
    opacity: 0;
    transition: opacity 0.15s ease;

    .linked-issue-item:hover & {
        opacity: 1;
    }
`;

function LinkedIssueItemActions({ onView, onUnlink }: Readonly<LinkedIssueItemActionsProps>) {
    return (
        <Container>
            <Button
                icon={<Icon name="ArrowSquareOut" size={14} color="var(--text-secondary)" weight="regular" />}
                IconOnly
                backgroundColor="transparent"
                onClick={onView}
            />
            <Button
                icon={<Icon name="LinkBreak" size={14} color="var(--error)" weight="regular" />}
                IconOnly
                backgroundColor="transparent"
                onClick={onUnlink}
            />
        </Container>
    );
}

export default LinkedIssueItemActions;
