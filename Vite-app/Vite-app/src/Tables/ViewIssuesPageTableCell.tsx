import styled from "styled-components";
import * as Table from "../design_system/Table";
import type { ReactNode } from "react";

interface ViewIssuesPageTableCellProps {
  type?: "text" |"icon";
  children: ReactNode;
}

const TextCell = styled(Table.Cell)`
  font-size: 0.8125rem;
  color: var(--text-primary);
  padding: 0.5rem 0.75rem;
`;

const IconCell = styled(Table.Cell)`
  display: flex;
  align-items: center;
  justify-content: 
  flex-start;
  padding: 0.5rem 0.75rem;
  margin-left: 1rem;
`;


function ViewIssuesPageTableCell({
  type,
  children,
}: Readonly<ViewIssuesPageTableCellProps>) {
  switch (type) {
    case "icon":
      return <IconCell>{children}</IconCell>;
    case "text":  
      return <TextCell>{children}</TextCell>;
    default:
      return <TextCell>{children}</TextCell>;
  }
}

export default ViewIssuesPageTableCell;
