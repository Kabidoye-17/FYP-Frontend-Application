import styled from "styled-components";
import ViewIssuesPageTableSection from "./ViewIssuesPageTableSection";
import type { IssueSection } from "./types/issueTypes";

const TableContainer = styled.div`
  width: 100%;
  padding: 1rem;
`;

const mockSections: IssueSection[] = [
  {
    title: "Backlog",
    issues: [
      {
        id: "1",
        team: "Engineering",
        status: "backlog",
        priority: "high",
        projectName: "Website Redesign",
        assignee: { name: "John Doe", color: "var(--plum)" },
        createdDate: "2026-01-10",
      },
      {
        id: "2",
        team: "Design",
        status: "backlog",
        priority: "medium",
        projectName: "Mobile App",
        assignee: { name: "Jane Smith", color: "var(--tan)" },
        createdDate: "2026-01-09",
      },
      {
        id: "3",
        team: "Marketing",
        status: "backlog",
        priority: "low",
        projectName: "Q1 Campaign",
        assignee: { name: "Mike Johnson", color: "var(--light-plum)" },
        createdDate: "2026-01-08",
      },
    ],
  },
  {
    title: "In Progress",
    issues: [
      {
        id: "4",
        team: "Engineering",
        priority: "high",
        status: "in progress",
        projectName: "API Development",
        assignee: { name: "Bob Wilson", color: "var(--plum)" },
        createdDate: "2026-01-07",
      },
      {
        id: "5",
        team: "Design",
        priority: "medium",
        status: "in progress",
        projectName: "Design System",
        assignee: { name: "Sarah Lee", color: "var(--tan)" },
        createdDate: "2026-01-06",
      },
    ],
  },
  {
    title: "Completed",
    issues: [
      {
        id: "6",
        team: "Marketing",
        priority: "high",
        status: "completed",
        projectName: "Campaign Launch",
        assignee: { name: "Alice Brown", color: "var(--plum)" },
        createdDate: "2026-01-05",
      },
      {
        id: "7",
        team: "Engineering",
        priority: "medium",
        status: "completed",
        projectName: "Bug Fixes",
        assignee: { name: "Tom Davis", color: "var(--light-plum)" },
        createdDate: "2026-01-04",
      },
      {
        id: "8",
        team: "Design",
        priority: "low",
        status: "completed",
        projectName: "Logo Refresh",
        assignee: { name: "Emma White", color: "var(--tan)" },
        createdDate: "2026-01-03",
      },
    ],
  },
];

function ViewIssuesPageTable() {
  return (
    <TableContainer>
      {mockSections.map((section) => (
        <ViewIssuesPageTableSection
          key={section.title}
          title={section.title}
          issues={section.issues}
        />
      ))}
    </TableContainer>
  );
}

export default ViewIssuesPageTable;
