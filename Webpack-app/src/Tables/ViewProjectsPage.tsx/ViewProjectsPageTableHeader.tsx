import * as Table from "../../design_system/Table";

function ViewProjectsPageTableHeader() {
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Priority</Table.HeaderCell>
        <Table.HeaderCell>Team</Table.HeaderCell>
          <Table.HeaderCell>Lead</Table.HeaderCell>
        <Table.HeaderCell>Project Name</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );
}

export default ViewProjectsPageTableHeader;
