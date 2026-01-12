import type { ProjectSection } from "../types/contentTypes";
import { TableContainer } from "../ViewIssuesPage/ViewIssuesPageTable";
import ViewProjectsPageTableSection from "./ViewProjectsPageTableSection";

const mockSections: ProjectSection[] = [
  {
    title: "Backlog",
    projects: [
      {
        id: "proj-001",
        team: "Backend Team",
        projectName: "User Authentication System",
        lead: {
          name: "John Smith",
          color: "#FF6B6B"
        },
        priority: "High",
        status: "Backlog"
      },
      {
        id: "proj-002",
        team: "Frontend Team",
        projectName: "Dashboard Redesign",
        lead: {
          name: "Sarah Johnson",
          color: "#4ECDC4"
        },
        priority: "Medium",
        status: "Backlog"
      }
    ]
  },
  {
    title: "In Progress",
    projects: [
      {
        id: "proj-003",
        team: "DevOps Team",
        projectName: "CI/CD Pipeline Setup",
        lead: {
          name: "Mike Chen",
          color: "#95E1D3"
        },
        priority: "High",
        status: "In Progress"
      }
    ]
  },
  {
    title: "Completed",
    projects: [
      {
        id: "proj-004",
        team: "QA Team",
        projectName: "Automated Testing Framework",
        lead: {
          name: "Emma Davis",
          color: "#F38181"
        },
        priority: "Medium",
        status: "Completed"
      }
    ]
  }
];


function ViewIssuesPageTable() {
  return (
    <TableContainer>
      {mockSections.map((section) => (
        <ViewProjectsPageTableSection
          key={section.title}
          title={section.title}
          projects={section.projects}
        />
      ))}
    </TableContainer>
  );
}

export default ViewIssuesPageTable;
