import { useState } from "react";
import styled from "styled-components";
import CalendarPageHeader from "./CalendarPageHeader";
import Calendar from "../../features/calendar/Calendar";
import QuickEventModal from "../../modals/event/QuickEventModal";
import { useCalendarEvents, useCreateCalendarEvent } from "../../hooks/queries/useCalendar";
import type { CalendarEventType } from "../../types/api.types";

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

const LoadingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--text-secondary);
    font-family: 'Inter', sans-serif;
`;

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--error);
    font-family: 'Inter', sans-serif;
    gap: 1rem;
`;

function CalendarPage() {
    const { data: events = [], isLoading, isError, error } = useCalendarEvents();
    const createEvent = useCreateCalendarEvent();

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
        createEvent.mutate({
            title: eventData.title,
            date: eventData.date.toISOString(),
            type: eventData.type as CalendarEventType,
        });
    };

    // Transform API events to Calendar component format
    const calendarEvents = events.map(event => ({
        id: event.id,
        title: event.title,
        date: new Date(event.date),
        type: event.type as "issue" | "milestone" | "sprint" | "meeting",
    }));

    if (isLoading) {
        return (
            <PageContainer>
                <CalendarPageHeader />
                <LoadingContainer>Loading calendar events...</LoadingContainer>
            </PageContainer>
        );
    }

    if (isError) {
        return (
            <PageContainer>
                <CalendarPageHeader />
                <ErrorContainer>
                    <span>Failed to load calendar events</span>
                    <span style={{ fontSize: '0.875rem' }}>{error?.message}</span>
                </ErrorContainer>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <CalendarPageHeader />
            <Content>
                <Calendar
                    events={calendarEvents}
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
