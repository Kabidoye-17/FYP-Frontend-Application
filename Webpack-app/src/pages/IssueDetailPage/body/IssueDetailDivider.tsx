import styled from "styled-components";

const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--section-background);
  margin: 1.5rem 0;
`;

function IssueDetailDivider() {
  return <Divider />;
}

export default IssueDetailDivider;
