import styled from "styled-components";
import * as Table from "../../design_system/Table";

const HeaderCell = styled(Table.HeaderCell)`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.75rem 1rem;
    text-align: left;
`;

function ViewSprintsPageTableHeader() {
    return (
        <Table.Header>
            <Table.Row>
                <HeaderCell style={{ width: "30%" }}>Sprint Name</HeaderCell>
                <HeaderCell style={{ width: "15%" }}>Team</HeaderCell>
                <HeaderCell style={{ width: "15%" }}>Start Date</HeaderCell>
                <HeaderCell style={{ width: "15%" }}>End Date</HeaderCell>
                <HeaderCell style={{ width: "15%" }}>Progress</HeaderCell>
                <HeaderCell style={{ width: "10%" }}>Issues</HeaderCell>
            </Table.Row>
        </Table.Header>
    );
}

export default ViewSprintsPageTableHeader;
