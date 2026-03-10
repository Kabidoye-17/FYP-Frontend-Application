import { useState } from "react";
import styled from "styled-components";
import CalendarPageHeader from "./CalendarPageHeader";
import Calendar from "../../features/calendar/Calendar";
import QuickEventModal from "../../modals/event/QuickEventModal";
import type { CalendarEvent } from "../../features/calendar/events/CalendarEventChip";

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: var(--section-background);
`;

const Content = styled.div`
    flex: 1;
    padding: 1.5rem;
    overflow: hidden;
`;

const MOCK_EVENTS: CalendarEvent[] = [
    { id: "1", title: "Sprint Planning", date: new Date(2026, 2, 10), type: "meeting" },
    { id: "2", title: "Fix auth bug", date: new Date(2026, 2, 10), type: "issue" },
    { id: "3", title: "Q1 Release", date: new Date(2026, 2, 15), type: "milestone" },
    { id: "4", title: "Sprint 12", date: new Date(2026, 2, 12), type: "sprint" },
    { id: "5", title: "Code review", date: new Date(2026, 2, 14), type: "issue" },
    { id: "6", title: "Design handoff", date: new Date(2026, 2, 18), type: "meeting" },
];

function CalendarPage() {
    const [events, setEvents] = useState<CalendarEvent[]>(MOCK_EVENTS);
    const [quickEventModalOpen, setQuickEventModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const handleAddEvent = (date?: Date) => {
        if (date) {
            setSelectedDate(date);
        }
        setQuickEventModalOpen(true);
    };

    const handleCreateEvent = (eventData: {
        title: string;
        date: Date;
        type: "issue" | "milestone" | "sprint" | "meeting";
    }) => {
        const newEvent: CalendarEvent = {
            id: String(Date.now()),
            ...eventData,
        };
        setEvents((prev) => [...prev, newEvent]);
    };

    return (
        <PageContainer>
            <CalendarPageHeader />
            <Content>
                <Calendar
                    events={events}
                    onAddEvent={handleAddEvent}
                    onEventClick={(event) => console.log("Event clicked:", event)}
                />
            </Content>
            <QuickEventModal
                open={quickEventModalOpen}
                onOpenChange={setQuickEventModalOpen}
                initialDate={selectedDate}
                onSubmit={handleCreateEvent}
            />
        </PageContainer>
    );
}

export default CalendarPage;
