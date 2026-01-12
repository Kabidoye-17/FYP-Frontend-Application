import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";
import * as Table from "../../design_system/Table";

const SectionContainer = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.div`
  margin-bottom: 0.5rem;
`;

const TableContainer = styled.div`
  width: 100%;
  padding: 1rem;
`;

interface ViewIssuesPageTableSkeletonProps {
  sections?: number;
  rowsPerSection?: number;
}

function ViewIssuesPageTableSkeleton({
  sections = 3,
  rowsPerSection = 3,
}: Readonly<ViewIssuesPageTableSkeletonProps>) {
  return (
    <TableContainer>
      {Array.from({ length: sections }).map((_, sectionIndex) => (
        <SectionContainer key={sectionIndex}>
          <SectionTitle>
            <Skeleton width={100} height={12} />
          </SectionTitle>
          <Table.Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell><Skeleton width={60} /></Table.HeaderCell>
                <Table.HeaderCell><Skeleton width={60} /></Table.HeaderCell>
                <Table.HeaderCell><Skeleton width={50} /></Table.HeaderCell>
                <Table.HeaderCell><Skeleton width={100} /></Table.HeaderCell>
                <Table.HeaderCell><Skeleton width={70} /></Table.HeaderCell>
                <Table.HeaderCell><Skeleton width={60} /></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Array.from({ length: rowsPerSection }).map((_, rowIndex) => (
                <Table.Row key={rowIndex}>
                  <Table.Cell><Skeleton width={80} /></Table.Cell>
                  <Table.Cell><Skeleton width={20} height={20} circle /></Table.Cell>
                  <Table.Cell><Skeleton width={20} height={20} circle /></Table.Cell>
                  <Table.Cell><Skeleton width={150} /></Table.Cell>
                  <Table.Cell>
                    <Skeleton width={32} height={32} circle />
                  </Table.Cell>
                  <Table.Cell><Skeleton width={80} /></Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Table>
        </SectionContainer>
      ))}
    </TableContainer>
  );
}

export default ViewIssuesPageTableSkeleton;
