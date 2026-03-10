import styled from "styled-components";
import Icon from "../../design_system/Icon";

const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-color);
`;

const IconWrapper = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background-color: var(--blue-light);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TitleContent = styled.div``;

const Title = styled.h1`
    font-family: "Inter", sans-serif;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
`;

const Subtitle = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 0.8125rem;
    color: var(--text-secondary);
    margin: 0.125rem 0 0 0;
`;

function CalendarPageHeader() {
    return (
        <Header>
            <IconWrapper>
                <Icon name="Calendar" size={22} color="var(--blue)" weight="fill" />
            </IconWrapper>
            <TitleContent>
                <Title>Calendar</Title>
                <Subtitle>View and manage events across your projects</Subtitle>
            </TitleContent>
        </Header>
    );
}

export default CalendarPageHeader;
