import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: "Inter", sans-serif;
  background-color: var(--section-background);
  border-radius: 8px;
  overflow: hidden;
`;

export const Header = styled.thead`
  background-color: var(--page-background);
`;

export const Body = styled.tbody``;

export const Row = styled.tr`
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.15s ease;

  &:hover {
    background-color: var(--page-background);
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const HeaderCell = styled.th`
  padding: 0.5rem 0.75rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.025em;
  border-bottom: 2px solid var(--border-color);
`;

export const Cell = styled.td`
  padding: 0.5rem 0.75rem;
  font-size: 0.8125rem;
  color: var(--text-primary);
  vertical-align: middle;
`;
