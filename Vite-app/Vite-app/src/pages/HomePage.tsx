import styled from "styled-components";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideNavBar from "../navigation/SideNavBar";
import ViewPageHeader from "../navigation/Headers/ViewPageHeader";
import { PageContainer as PageContentWrapper, TableScrollContainer } from "./ViewIssuesPage";
import Button from "../design_system/Button";
import Icon from "../design_system/Icon";
import CreateIssueModal from "../modals/issue/CreateIssueModal";
import CreateProjectModal from "../modals/project/CreateProjectModal";
import CreateSprintModal from "../modals/sprint/CreateSprintModal";
import CreateMilestoneModal from "../modals/milestone/CreateMilestoneModal";
import NotificationPanel from "../panels/NotificationPanel";
import NotificationPreferencesModal from "../modals/notification/NotificationPreferencesModal";
import NotificationBadge from "../design_system/NotificationBadge";

const PageContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
`;

const ContentContainer = styled.div`
    width: 100%;
    height: 100vh;
    background-color: var(--page-background);
    color: white;
    display: flex;
    flex-direction: column;
`;

const HeaderActions = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const NotificationButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: var(--white);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    position: relative;

    &:hover {
        background-color: var(--section-background);
    }
`;

const BadgeWrapper = styled.div`
    position: absolute;
    top: 4px;
    right: 4px;
`;

type PageConfig = {
    title: string;
    createLabel?: string;
    icon?: string;
    showCreate: boolean;
};

const pageConfigs: Record<string, PageConfig> = {
    issues: { title: "Issues", createLabel: "Create Issue", showCreate: true },
    projects: { title: "Projects", createLabel: "Create Project", showCreate: true },
    sprints: { title: "Sprints", createLabel: "New Sprint", showCreate: true },
    milestones: { title: "Milestones", createLabel: "New Milestone", showCreate: true },
    kanban: { title: "Kanban Board", showCreate: false },
    roadmap: { title: "Roadmap", showCreate: false },
    workload: { title: "Team Workload", showCreate: false },
};

function HomePage() {
  const location = useLocation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [isNotificationPrefsOpen, setIsNotificationPrefsOpen] = useState(false);

  // Determine current page from pathname
  const getCurrentPage = (): string => {
      const path = location.pathname;
      if (path.includes('/issues')) return 'issues';
      if (path.includes('/projects')) return 'projects';
      if (path.includes('/sprints')) return 'sprints';
      if (path.includes('/milestones')) return 'milestones';
      if (path.includes('/kanban')) return 'kanban';
      if (path.includes('/roadmap')) return 'roadmap';
      if (path.includes('/workload')) return 'workload';
      return 'issues';
  };

  const currentPage = getCurrentPage();
  const config = pageConfigs[currentPage] || pageConfigs.issues;

  // Mock unread count
  const unreadCount = 3;

  const renderCreateModal = () => {
      switch (currentPage) {
          case 'issues':
              return (
                  <CreateIssueModal
                      open={isCreateModalOpen}
                      onOpenChange={setIsCreateModalOpen}
                  />
              );
          case 'projects':
              return (
                  <CreateProjectModal
                      open={isCreateModalOpen}
                      onOpenChange={setIsCreateModalOpen}
                  />
              );
          case 'sprints':
              return (
                  <CreateSprintModal
                      open={isCreateModalOpen}
                      onOpenChange={setIsCreateModalOpen}
                  />
              );
          case 'milestones':
              return (
                  <CreateMilestoneModal
                      open={isCreateModalOpen}
                      onOpenChange={setIsCreateModalOpen}
                  />
              );
          default:
              return null;
      }
  };

  return (
    <PageContainer>
      <SideNavBar />
      <ContentContainer>
        <PageContentWrapper>
          <ViewPageHeader
            button={
              <HeaderActions>
                <NotificationButton onClick={() => setIsNotificationPanelOpen(true)}>
                  <Icon name="Bell" size={20} color="var(--text-primary)" weight="regular" />
                  {unreadCount > 0 && (
                      <BadgeWrapper>
                          <NotificationBadge count={unreadCount} />
                      </BadgeWrapper>
                  )}
                </NotificationButton>
                {config.showCreate && config.createLabel && (
                  <Button
                    backgroundColor='white'
                    color='var(--plum)'
                    rightIcon={<Icon name="Plus" size={20} color="var(--plum)" weight='bold' />}
                    onClick={() => setIsCreateModalOpen(true)}
                  >
                    {config.createLabel}
                  </Button>
                )}
              </HeaderActions>
            }
          >
            {config.title}
          </ViewPageHeader>
          <TableScrollContainer>
            <Outlet />
          </TableScrollContainer>
        </PageContentWrapper>
        {renderCreateModal()}
        <NotificationPanel
          isOpen={isNotificationPanelOpen}
          onClose={() => setIsNotificationPanelOpen(false)}
          onOpenPreferences={() => {
              setIsNotificationPanelOpen(false);
              setIsNotificationPrefsOpen(true);
          }}
        />
        <NotificationPreferencesModal
          open={isNotificationPrefsOpen}
          onOpenChange={setIsNotificationPrefsOpen}
        />
      </ContentContainer>
    </PageContainer>
  );
}
export default HomePage;