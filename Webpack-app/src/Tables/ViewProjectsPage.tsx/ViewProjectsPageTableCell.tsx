import type { ReactNode } from "react";
import {TextCell } from "../ViewIssuesPage/ViewIssuesPageTableCell";
import styled from "styled-components";
import  * as Table from "../../design_system/Table";

interface  ViewProjectPageTableCellProps {
  type?: "text" |"icon";
  children: ReactNode;
}

const IconCell = styled(Table.Cell)`
  display: flex;
  align-items: center;
  justify-content: 
  flex-start;
  padding: 0.5rem 0.75rem;
  margin-left: 1rem;
`;



function  ViewProjectsPageTableCell({
  type,
  children,
}: Readonly< ViewProjectPageTableCellProps>) {
  switch (type) {
    case "icon":
      return <IconCell>{children}</IconCell>;
    case "text":  
      return <TextCell>{children}</TextCell>;
    default:
      return <TextCell>{children}</TextCell>;
  }
}

export default  ViewProjectsPageTableCell;
