export interface Issue {
  id: string;
  team: string;
  priority: string;
  status: string;
  projectName: string;
  assignee: {
    name: string;
    color: string;
  };
  createdDate: string;
}

export interface IssueSection {
  title: string;
  issues: Issue[];
}

export type IssueSectionTitle = "Backlog" | "In Progress" | "Completed";
