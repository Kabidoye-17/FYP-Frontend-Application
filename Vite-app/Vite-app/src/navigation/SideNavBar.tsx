import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../design_system/Button";
import Icon from "../design_system/Icon";
import Avatar from "../design_system/Avatar";
import * as Dropdown from "../design_system/Dropdown";
import SideNavButton from "./SideNavButton";

const SideNavBarContainer = styled.div`
    width: 300px;
    height: 100vh;
    background-color: var(--section-background);
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 10;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
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
    gap: 0.5rem;
`;

function SideNavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleIssuesClick = () => {
    navigate('/home/issues');
  };

  const handleProjectsClick = () => {
    navigate('/home/projects');
  };

  const isIssuesActive = location.pathname.includes('/home/issues');
  const isProjectsActive = location.pathname.includes('/home/projects');

  return (
    <SideNavBarContainer>
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
                  <Dropdown.Item onSelect={() => console.log("Settings")}>
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

        <ButtonContainer>
          <SideNavButton
            title="Issues"
            icon={<Icon name="Archive" size={20} color="var(--text-primary)" weight='regular' />}
            onClick={handleIssuesClick}
            isActive={isIssuesActive}
          />
          <SideNavButton
            title="Projects"
            icon={<Icon name="Folder" size={20} color="var(--text-primary)" weight='regular' />}
            onClick={handleProjectsClick}
            isActive={isProjectsActive}
          />
        </ButtonContainer>
    </SideNavBarContainer>
  );
}   

export default SideNavBar;