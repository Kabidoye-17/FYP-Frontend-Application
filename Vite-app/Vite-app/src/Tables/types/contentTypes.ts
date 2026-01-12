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

export interface Project {
  id: string;
  team: string;
  projectName: string;
  lead: {
    name: string;
    color: string;
  };
  priority: string;
  status: string;
}

export interface ProjectSection {
  title: string;
  projects: Project[];
}
