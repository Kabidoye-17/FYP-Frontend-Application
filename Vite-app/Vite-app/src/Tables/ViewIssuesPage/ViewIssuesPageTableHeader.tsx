import * as Table from "../../design_system/Table";

function ViewIssuesPageTableHeader() {
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Priority</Table.HeaderCell>
        <Table.HeaderCell>Team</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell>Project Name</Table.HeaderCell>
        <Table.HeaderCell>Assignee</Table.HeaderCell>
        <Table.HeaderCell>Created</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );
}

export default ViewIssuesPageTableHeader;
