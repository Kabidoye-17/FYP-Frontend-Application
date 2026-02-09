import { useNavigate } from "react-router-dom";
import * as Table from "../../design_system/Table";
import Avatar from "../../design_system/Avatar";
import Icon from "../../design_system/Icon";
import type { Project } from "../types/contentTypes";
import { getPriorityIcon, getStatusIcon } from "../../utils/issueIconMaps";
import * as Tooltip from "../../design_system/Tooltip";
import ViewProjectsPageTableCell from "./ViewProjectsPageTableCell";

interface ViewProjectPageTableRowProps {
  project: Project;
}

function ViewProjectsPageTableRow({
  project,
}: Readonly<ViewProjectPageTableRowProps>) {
  const navigate = useNavigate();
  const priorityIcon = getPriorityIcon(project.priority);
  const statusIcon = getStatusIcon(project.status);

  const handleRowClick = () => {
    navigate(`/home/projects/${project.id}`);
  };

  return (
    <Table.Row onClick={handleRowClick} style={{ cursor: "pointer" }}>
      <ViewProjectsPageTableCell type="icon">
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
                {project.priority}
                <Tooltip.Arrow />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        )}
      </ ViewProjectsPageTableCell>
      < ViewProjectsPageTableCell type="text">{project.team}</ ViewProjectsPageTableCell>
      < ViewProjectsPageTableCell type="icon">
        <Avatar
          size="xsmall"
          color={project.lead.color}
          name={project.lead.name}
        />
      </ ViewProjectsPageTableCell>
       < ViewProjectsPageTableCell type="text">{project.projectName}</ ViewProjectsPageTableCell>
      < ViewProjectsPageTableCell type="icon">
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
                {project.status}
                <Tooltip.Arrow />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        )}
      </ ViewProjectsPageTableCell>
    </Table.Row>
  );
}

export default ViewProjectsPageTableRow;
