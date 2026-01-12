import * as Table from "../../design_system/Table";
import Avatar from "../../design_system/Avatar";
import Icon from "../../design_system/Icon";
import ViewIssuesPageTableCell from "../ViewIssuesPage/ViewIssuesPageTableCell";
import type { Issue } from "../types/contentTypes";
import { getPriorityIcon, getStatusIcon } from "../../utils/issueIconMaps";
import * as Tooltip from "../../design_system/Tooltip";

interface ViewIssuesPageTableRowProps {
  issue: Issue;
}

function ViewIssuesPageTableRow({
  issue,
}: Readonly<ViewIssuesPageTableRowProps>) {
  const priorityIcon = getPriorityIcon(issue.priority);
  const statusIcon = getStatusIcon(issue.status);

  return (
    <Table.Row>
      <ViewIssuesPageTableCell type="icon">
        {priorityIcon && (
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <span style={{ display: "inline-flex" }}>
                <Icon
                  name={priorityIcon.iconName as any}
                  color={priorityIcon.color}
                  size={16}
                  weight={priorityIcon.weight}
                />
              </span>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content side="top" sideOffset={5}>
                {issue.priority}
                <Tooltip.Arrow />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        )}
      </ViewIssuesPageTableCell>
      <ViewIssuesPageTableCell type="text">{issue.team}</ViewIssuesPageTableCell>

      <ViewIssuesPageTableCell type="icon">
        {statusIcon && (
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <span style={{ display: "inline-flex"}}>
                <Icon
                  name={statusIcon.iconName as any}
                  color={statusIcon.color}
                  size={16}
                  weight={statusIcon.weight}
                />
              </span>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content side="top" sideOffset={5}>
                {issue.status}
                <Tooltip.Arrow />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        )}
      </ViewIssuesPageTableCell>


      <ViewIssuesPageTableCell type="text">
        {issue.projectName}
      </ViewIssuesPageTableCell>
      <ViewIssuesPageTableCell type="icon">
        <Avatar
          size="xsmall"
          color={issue.assignee.color}
          name={issue.assignee.name}
        />
      </ViewIssuesPageTableCell>
      <ViewIssuesPageTableCell >
        {issue.createdDate}
      </ViewIssuesPageTableCell>
    </Table.Row>
  );
}

export default ViewIssuesPageTableRow;
