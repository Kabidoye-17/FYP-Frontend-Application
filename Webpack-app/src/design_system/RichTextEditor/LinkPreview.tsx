import styled from "styled-components";
import Icon from "../Icon";
import Button from "../Button";

interface LinkPreviewProps {
    url: string;
    onEdit: () => void;
    onRemove: () => void;
}

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background-color: var(--section-background);
    border-radius: 8px;
    max-width: 300px;
`;

const LinkIcon = styled.div`
    flex-shrink: 0;
`;

const LinkText = styled.a`
    flex: 1;
    font-family: "Inter", sans-serif;
    font-size: 0.8125rem;
    color: var(--purple);
    text-decoration: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
        text-decoration: underline;
    }
`;

const Actions = styled.div`
    display: flex;
    gap: 0.25rem;
    flex-shrink: 0;
`;

function LinkPreview({ url, onEdit, onRemove }: Readonly<LinkPreviewProps>) {
    return (
        <Container>
            <LinkIcon>
                <Icon name="Link" size={14} color="var(--text-secondary)" weight="regular" />
            </LinkIcon>
            <LinkText href={url} target="_blank" rel="noopener noreferrer">
                {url}
            </LinkText>
            <Actions>
                <Button
                    icon={<Icon name="PencilSimple" size={14} color="var(--text-secondary)" weight="regular" />}
                    IconOnly
                    backgroundColor="transparent"
                    onClick={onEdit}
                />
                <Button
                    icon={<Icon name="Trash" size={14} color="var(--error)" weight="regular" />}
                    IconOnly
                    backgroundColor="transparent"
                    onClick={onRemove}
                />
            </Actions>
        </Container>
    );
}

export default LinkPreview;
