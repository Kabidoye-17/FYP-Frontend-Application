import styled from "styled-components";
import Avatar from "../design_system/Avatar";
import Icon from "../design_system/Icon";
import type { TimeEntry } from "./TimeLogPanel";

interface TimeLogEntryProps {
    entry: TimeEntry;
    onDelete: () => void;
}

const EntryContainer = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.75rem;
    border-radius: 8px;
    margin-bottom: 0.5rem;
    background-color: var(--section-background);

    &:last-child {
        margin-bottom: 0;
    }
`;

const EntryContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

const EntryDescription = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-primary);
    margin: 0;
`;

const EntryMeta = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const MetaText = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
`;

const Duration = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    background-color: var(--white);
    border-radius: 4px;
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--plum);
`;

const DeleteButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: transparent;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: var(--text-secondary);
    opacity: 0;
    transition: opacity 0.15s ease;

    ${EntryContainer}:hover & {
        opacity: 1;
    }

    &:hover {
        background-color: var(--error-red);
        color: var(--white);
    }
`;

function TimeLogEntry({ entry, onDelete }: TimeLogEntryProps) {
    const hours = Math.floor(entry.duration / 60);
    const minutes = entry.duration % 60;
    const durationText = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

    return (
        <EntryContainer>
            <Avatar size="xsmall" color={entry.user.color} name={entry.user.name} />
            <EntryContent>
                <EntryDescription>{entry.description}</EntryDescription>
                <EntryMeta>
                    <MetaText>{entry.user.name}</MetaText>
                    <MetaText>•</MetaText>
                    <MetaText>
                        {new Date(entry.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                        })}
                    </MetaText>
                </EntryMeta>
            </EntryContent>
            <Duration>
                <Icon name="Clock" size={12} color="var(--plum)" weight="regular" />
                {durationText}
            </Duration>
            <DeleteButton onClick={onDelete}>
                <Icon name="Trash" size={14} color="currentColor" weight="regular" />
            </DeleteButton>
        </EntryContainer>
    );
}

export default TimeLogEntry;
