import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../design_system/Button";
import Icon from "../design_system/Icon";
import Avatar from "../design_system/Avatar";
import * as Dropdown from "../design_system/Dropdown";
import SideNavButton from "./SideNavButton";
import { useIsMobile, useLocalStorage, useToggle } from "../hooks";
import { ROUTES } from "../config";

const SideNavBarContainer = styled.div<{ $collapsed?: boolean; $isMobile?: boolean }>`
    width: ${({ $collapsed }) => ($collapsed ? "72px" : "300px")};
    height: 100vh;
    background-color: var(--section-background);
    display: flex;
    flex-direction: column;
    position: ${({ $isMobile }) => ($isMobile ? "fixed" : "relative")};
    z-index: 10;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
    transition: width 0.2s ease;
    overflow: hidden;
`;

const CollapseButton = styled.button`
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    background-color: var(--white);
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
        background-color: var(--section-background);
    }
`;

const TopSection = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    margin-bottom: 0.5rem;
`;

const TopRightSection = styled.div`
    width: 3rem;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const TopLeftSection = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: start;
    padding-left: 1rem;
    align-items: center;
`;

const NameContainer = styled.div`
    margin-left: 0.5rem;
    color: var(--text-primary);
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 1rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0 0.5rem;
`;

const SectionLabel = styled.div`
    font-family: 'Inter', sans-serif;
    font-size: 0.625rem;
    font-weight: 700;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 1rem 0.75rem 0.5rem 0.75rem;
`;


function SideNavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useLocalStorage("sidebarCollapsed", false);
  const [, toggleCollapsed] = useToggle(isCollapsed);

  const handleNavigate = (path: string) => () => navigate(path);

  const handleSettingsClick = () => {
    navigate(ROUTES.SETTINGS);
  };

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    toggleCollapsed();
  };

  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <SideNavBarContainer $collapsed={isCollapsed} $isMobile={isMobile}>
        <TopSection>
          <TopLeftSection>
            <Avatar size="small" color="var(--plum)" name="Kelly"/>
            <NameContainer>Kelly</NameContainer>
          </TopLeftSection>
          <TopRightSection>
            <Dropdown.Root>
              <Dropdown.Trigger asChild>
                <Button
                  icon={<Icon name="CaretDown" size={24} color="var(--text-primary)" weight='regular' />}
                  IconOnly={true}
                  backgroundColor="transparent"
                />
              </Dropdown.Trigger>
              <Dropdown.Portal>
                <Dropdown.Content sideOffset={5} align="end">
                  <Dropdown.Item onSelect={() => console.log("Profile")}>
                    <Icon name="User" size={16} color="var(--text-primary)" weight='regular' />
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item onSelect={handleSettingsClick}>
                    <Icon name="Gear" size={16} color="var(--text-primary)" weight='regular' />
                    Settings
                  </Dropdown.Item>
                  <Dropdown.Separator />
                  <Dropdown.Item onSelect={() => console.log("Logout")}>
                    <Icon name="SignOut" size={16} color="var(--text-primary)" weight='regular' />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Content>
              </Dropdown.Portal>
            </Dropdown.Root>
          </TopRightSection>
        </TopSection>

        <SectionLabel>Workspace</SectionLabel>
        <ButtonContainer>
          <SideNavButton
            title="Issues"
            icon={<Icon name="Circle" size={20} color="var(--text-primary)" weight='regular' />}
            onClick={handleNavigate(ROUTES.ISSUES)}
            isActive={isActive(ROUTES.ISSUES)}
          />
          <SideNavButton
            title="Projects"
            icon={<Icon name="Folder" size={20} color="var(--text-primary)" weight='regular' />}
            onClick={handleNavigate(ROUTES.PROJECTS)}
            isActive={isActive(ROUTES.PROJECTS)}
          />
          <SideNavButton
            title="Kanban Board"
            icon={<Icon name="Kanban" size={20} color="var(--text-primary)" weight='regular' />}
            onClick={handleNavigate(ROUTES.KANBAN)}
            isActive={isActive(ROUTES.KANBAN)}
          />
        </ButtonContainer>

        <SectionLabel>Insights</SectionLabel>
        <ButtonContainer>
          <SideNavButton
            title="Analytics"
            icon={<Icon name="ChartBar" size={20} color="var(--text-primary)" weight='regular' />}
            onClick={handleNavigate(ROUTES.ANALYTICS)}
            isActive={isActive(ROUTES.ANALYTICS)}
          />
        </ButtonContainer>

        <SectionLabel>Planning</SectionLabel>
        <ButtonContainer>
          <SideNavButton
            title="Sprints"
            icon={<Icon name="Lightning" size={20} color="var(--text-primary)" weight='regular' />}
            onClick={handleNavigate(ROUTES.SPRINTS)}
            isActive={isActive(ROUTES.SPRINTS)}
          />
          <SideNavButton
            title="Milestones"
            icon={<Icon name="Flag" size={20} color="var(--text-primary)" weight='regular' />}
            onClick={handleNavigate(ROUTES.MILESTONES)}
            isActive={isActive(ROUTES.MILESTONES)}
          />
          <SideNavButton
            title="Roadmap"
            icon={<Icon name="CalendarBlank" size={20} color="var(--text-primary)" weight='regular' />}
            onClick={handleNavigate(ROUTES.ROADMAP)}
            isActive={isActive(ROUTES.ROADMAP)}
          />
          <SideNavButton
            title="Calendar"
            icon={<Icon name="Calendar" size={20} color="var(--text-primary)" weight='regular' />}
            onClick={handleNavigate(ROUTES.CALENDAR)}
            isActive={isActive(ROUTES.CALENDAR)}
          />
        </ButtonContainer>

        <SectionLabel>Organization</SectionLabel>
        <ButtonContainer>
          <SideNavButton
            title="Team"
            icon={<Icon name="UsersThree" size={20} color="var(--text-primary)" weight='regular' />}
            onClick={handleNavigate(ROUTES.TEAM)}
            isActive={isActive(ROUTES.TEAM)}
          />
          <SideNavButton
            title="Workload"
            icon={<Icon name="Users" size={20} color="var(--text-primary)" weight='regular' />}
            onClick={handleNavigate(ROUTES.WORKLOAD)}
            isActive={isActive(ROUTES.WORKLOAD)}
          />
        </ButtonContainer>

        {!isMobile && (
          <CollapseButton onClick={handleToggleCollapse} aria-label="Toggle sidebar">
            <Icon
              name={isCollapsed ? "CaretRight" : "CaretLeft"}
              size={16}
              color="var(--text-secondary)"
              weight="bold"
            />
          </CollapseButton>
        )}
    </SideNavBarContainer>
  );
}

export default SideNavBar;
