import styled from "styled-components";
import Icon from "../../design_system/Icon";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;
`;

const IconWrapper = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background-color: var(--section-background);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
`;

const Title = styled.h4`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 0.25rem 0;
`;

const Description = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 0.8125rem;
    color: var(--text-secondary);
    margin: 0;
`;

function CalendarEmptyState() {
    return (
        <Container>
            <IconWrapper>
                <Icon name="Calendar" size={24} color="var(--text-secondary)" weight="regular" />
            </IconWrapper>
            <Title>No events</Title>
            <Description>No events scheduled for this day</Description>
        </Container>
    );
}

export default CalendarEmptyState;
