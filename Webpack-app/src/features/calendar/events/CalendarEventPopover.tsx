import styled from "styled-components";
import { format } from "date-fns";
import * as Popover from "@radix-ui/react-popover";
import type { CalendarEvent } from "./CalendarEventChip";
import Icon from "../../../design_system/Icon";
import Button from "../../../design_system/Button";

interface CalendarEventPopoverProps {
    event: CalendarEvent;
    children: React.ReactNode;
    onEdit?: () => void;
    onDelete?: () => void;
}

const Content = styled(Popover.Content)`
    width: 280px;
    background-color: var(--white);
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    border: 1px solid var(--border-color);
    overflow: hidden;
    z-index: 100;
`;

const Header = styled.div<{ $color: string }>`
    padding: 1rem;
    background-color: ${({ $color }) => $color};
`;

const EventType = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--text-secondary);
`;

const EventTitle = styled.h4`
    font-family: "Inter", sans-serif;
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0.375rem 0 0 0;
`;

const Body = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const InfoRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const InfoText = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.8125rem;
    color: var(--text-secondary);
`;

const Footer = styled.div`
    padding: 0.75rem 1rem;
    border-top: 1px solid var(--border-color);
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
`;

const TYPE_BG: Record<CalendarEvent["type"], string> = {
    issue: "var(--purple-light)",
    milestone: "var(--success-light)",
    sprint: "var(--blue-light)",
    meeting: "var(--yellow-light)",
};

function CalendarEventPopover({
    event,
    children,
    onEdit,
    onDelete,
}: Readonly<CalendarEventPopoverProps>) {
    return (
        <Popover.Root>
            <Popover.Trigger asChild>{children}</Popover.Trigger>
            <Popover.Portal>
                <Content sideOffset={5} align="start">
                    <Header $color={TYPE_BG[event.type]}>
                        <EventType>{event.type}</EventType>
                        <EventTitle>{event.title}</EventTitle>
                    </Header>
                    <Body>
                        <InfoRow>
                            <Icon name="Calendar" size={16} color="var(--text-secondary)" weight="regular" />
                            <InfoText>{format(event.date, "EEEE, MMMM d, yyyy")}</InfoText>
                        </InfoRow>
                    </Body>
                    <Footer>
                        {onDelete && (
                            <Button
                                icon={<Icon name="Trash" size={14} color="var(--error)" weight="regular" />}
                                IconOnly
                                backgroundColor="transparent"
                                onClick={onDelete}
                            />
                        )}
                        {onEdit && (
                            <Button
                                icon={<Icon name="PencilSimple" size={14} color="var(--white)" weight="regular" />}
                                backgroundColor="var(--purple)"
                                color="var(--white)"
                                onClick={onEdit}
                            >
                                Edit
                            </Button>
                        )}
                    </Footer>
                </Content>
            </Popover.Portal>
        </Popover.Root>
    );
}

export default CalendarEventPopover;
