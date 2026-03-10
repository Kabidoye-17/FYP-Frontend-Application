import styled from "styled-components";
import { useState } from "react";
import TimeLogPanelHeader from "./TimeLogPanelHeader";
import TimeLogEntry from "./TimeLogEntry";
import TimeLogEntryForm from "./TimeLogEntryForm";
import EmptyState from "../design_system/EmptyState";

export interface TimeEntry {
    id: string;
    description: string;
    duration: number; // in minutes
    date: string;
    user: {
        name: string;
        color: string;
    };
}

interface TimeLogPanelProps {
    issueId: string;
    isOpen: boolean;
    onClose: () => void;
}

const PanelOverlay = styled.div<{ $isOpen: boolean }>`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
    transition: opacity 0.2s ease, visibility 0.2s ease;
    z-index: 100;
`;

const PanelContainer = styled.div<{ $isOpen: boolean }>`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 400px;
    background-color: var(--white);
    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.1);
    transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "100%")});
    transition: transform 0.3s ease;
    z-index: 101;
    display: flex;
    flex-direction: column;
`;

const EntriesList = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
`;

const TotalTime = styled.div`
    padding: 1rem;
    border-top: 1px solid var(--section-background);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TotalLabel = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-secondary);
`;

const TotalValue = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--text-primary);
`;

const mockEntries: TimeEntry[] = [
    {
        id: "1",
        description: "Initial implementation",
        duration: 120,
        date: "2026-03-10",
        user: { name: "John Doe", color: "var(--plum)" },
    },
    {
        id: "2",
        description: "Code review fixes",
        duration: 45,
        date: "2026-03-09",
        user: { name: "Jane Smith", color: "var(--tan)" },
    },
    {
        id: "3",
        description: "Testing and debugging",
        duration: 90,
        date: "2026-03-08",
        user: { name: "John Doe", color: "var(--plum)" },
    },
];

function TimeLogPanel({ isOpen, onClose }: TimeLogPanelProps) {
    const [entries, setEntries] = useState<TimeEntry[]>(mockEntries);
    const [showForm, setShowForm] = useState(false);

    const handleAddEntry = (description: string, duration: number) => {
        const newEntry: TimeEntry = {
            id: String(Date.now()),
            description,
            duration,
            date: new Date().toISOString().split("T")[0],
            user: { name: "Current User", color: "var(--plum)" },
        };
        setEntries([newEntry, ...entries]);
        setShowForm(false);
    };

    const handleDeleteEntry = (id: string) => {
        setEntries(entries.filter((entry) => entry.id !== id));
    };

    const totalMinutes = entries.reduce((sum, entry) => sum + entry.duration, 0);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return (
        <>
            <PanelOverlay $isOpen={isOpen} onClick={onClose} />
            <PanelContainer $isOpen={isOpen}>
                <TimeLogPanelHeader
                    onClose={onClose}
                    onAddClick={() => setShowForm(true)}
                />
                {showForm && (
                    <TimeLogEntryForm
                        onSubmit={handleAddEntry}
                        onCancel={() => setShowForm(false)}
                    />
                )}
                <EntriesList>
                    {entries.length === 0 ? (
                        <EmptyState
                            icon="Clock"
                            title="No time logged"
                            description="Start tracking time on this issue"
                        />
                    ) : (
                        entries.map((entry) => (
                            <TimeLogEntry
                                key={entry.id}
                                entry={entry}
                                onDelete={() => handleDeleteEntry(entry.id)}
                            />
                        ))
                    )}
                </EntriesList>
                <TotalTime>
                    <TotalLabel>Total time logged</TotalLabel>
                    <TotalValue>
                        {hours}h {minutes}m
                    </TotalValue>
                </TotalTime>
            </PanelContainer>
        </>
    );
}

export default TimeLogPanel;
