import styled from "styled-components";
import Icon from "../../design_system/Icon";
import * as Dropdown from "../../design_system/Dropdown";
import SmallDependencyTypeOpener from "../../dropdowns/opener/SmallDependencyTypeOpener";
import DependencyTypeDropdownContent from "../../dropdowns/content/DependencyTypeDropdownContent";

type DependencyType = "blocks" | "blocked-by" | "relates-to" | "duplicates";

interface LinkIssueModalBodyProps {
    linkType: DependencyType;
    onLinkTypeChange: (type: DependencyType) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedIssueId: string | null;
    onIssueSelect: (issueId: string) => void;
}

interface SearchableIssue {
    id: string;
    title: string;
    status: string;
}

const Body = styled.div`
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
`;

const Label = styled.label`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--text-secondary);
`;

const SearchInput = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;

    &:focus-within {
        border-color: var(--purple);
        box-shadow: 0 0 0 3px var(--purple-light);
    }
`;

const Input = styled.input`
    flex: 1;
    border: none;
    outline: none;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-primary);

    &::placeholder {
        color: var(--text-tertiary);
    }
`;

const IssuesList = styled.div`
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid var(--border-color);
    border-radius: 8px;
`;

const IssueItem = styled.button<{ $selected: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.75rem 1rem;
    border: none;
    background-color: ${({ $selected }) =>
        $selected ? "var(--purple-light)" : "var(--white)"};
    cursor: pointer;
    text-align: left;
    transition: background-color 0.15s ease;

    &:hover {
        background-color: ${({ $selected }) =>
            $selected ? "var(--purple-light)" : "var(--hover-background)"};
    }

    &:not(:last-child) {
        border-bottom: 1px solid var(--border-color);
    }
`;

const IssueTitle = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.8125rem;
    color: var(--text-primary);
    flex: 1;
`;

const IssueId = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.6875rem;
    color: var(--text-tertiary);
`;

const MOCK_ISSUES: SearchableIssue[] = [
    { id: "ISS-123", title: "Fix authentication flow", status: "in-progress" },
    { id: "ISS-124", title: "Update user dashboard", status: "todo" },
    { id: "ISS-125", title: "Implement notifications", status: "backlog" },
    { id: "ISS-126", title: "Refactor API endpoints", status: "done" },
    { id: "ISS-127", title: "Add export functionality", status: "in-review" },
];

function LinkIssueModalBody({
    linkType,
    onLinkTypeChange,
    searchQuery,
    onSearchChange,
    selectedIssueId,
    onIssueSelect,
}: Readonly<LinkIssueModalBodyProps>) {
    const filteredIssues = MOCK_ISSUES.filter(
        (issue) =>
            issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            issue.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Body>
            <Field>
                <Label>Link type</Label>
                <Dropdown.Root>
                    <Dropdown.Trigger asChild>
                        <div>
                            <SmallDependencyTypeOpener value={linkType} />
                        </div>
                    </Dropdown.Trigger>
                    <Dropdown.Portal>
                        <DependencyTypeDropdownContent
                            value={linkType}
                            onValueChange={onLinkTypeChange}
                        />
                    </Dropdown.Portal>
                </Dropdown.Root>
            </Field>
            <Field>
                <Label>Search issues</Label>
                <SearchInput>
                    <Icon name="MagnifyingGlass" size={16} color="var(--text-secondary)" weight="regular" />
                    <Input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search by title or ID..."
                    />
                </SearchInput>
            </Field>
            <IssuesList>
                {filteredIssues.map((issue) => (
                    <IssueItem
                        key={issue.id}
                        type="button"
                        $selected={selectedIssueId === issue.id}
                        onClick={() => onIssueSelect(issue.id)}
                    >
                        <IssueTitle>{issue.title}</IssueTitle>
                        <IssueId>{issue.id}</IssueId>
                        {selectedIssueId === issue.id && (
                            <Icon name="Check" size={14} color="var(--purple)" weight="bold" />
                        )}
                    </IssueItem>
                ))}
            </IssuesList>
        </Body>
    );
}

export default LinkIssueModalBody;
