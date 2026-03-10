import styled from "styled-components";
import BulkEditFieldSelector from "./BulkEditFieldSelector";
import BulkEditPreviewList from "./BulkEditPreviewList";

interface BulkEditItem {
    id: string;
    title: string;
}

interface BulkEditField {
    id: string;
    label: string;
    icon: string;
}

interface BulkEditModalBodyProps {
    items: BulkEditItem[];
    fields: BulkEditField[];
    selectedFields: string[];
    onToggleField: (fieldId: string) => void;
}

const Body = styled.div`
    padding: 1.25rem;
`;

const AVAILABLE_FIELDS: BulkEditField[] = [
    { id: "status", label: "Status", icon: "Circle" },
    { id: "priority", label: "Priority", icon: "Flag" },
    { id: "assignees", label: "Assignees", icon: "User" },
    { id: "labels", label: "Labels", icon: "Tag" },
    { id: "project", label: "Project", icon: "Folder" },
    { id: "targetDate", label: "Target Date", icon: "Calendar" },
];

function BulkEditModalBody({
    items,
    fields = AVAILABLE_FIELDS,
    selectedFields,
    onToggleField,
}: Readonly<BulkEditModalBodyProps>) {
    return (
        <Body>
            <BulkEditFieldSelector
                fields={fields}
                selectedFields={selectedFields}
                onToggleField={onToggleField}
            />
            <BulkEditPreviewList items={items} />
        </Body>
    );
}

export default BulkEditModalBody;
