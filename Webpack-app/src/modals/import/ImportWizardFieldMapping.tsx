import styled from "styled-components";
import Icon from "../../design_system/Icon";

interface FieldMapping {
    sourceColumn: string;
    targetField: string;
}

interface ImportWizardFieldMappingProps {
    sourceColumns: string[];
    targetFields: Array<{ id: string; label: string; required?: boolean }>;
    mappings: FieldMapping[];
    onMappingChange: (sourceColumn: string, targetField: string) => void;
}

const Container = styled.div`
    padding: 1.5rem;
`;

const Header = styled.div`
    display: grid;
    grid-template-columns: 1fr 40px 1fr;
    gap: 1rem;
    padding: 0.5rem 0;
    margin-bottom: 0.5rem;
`;

const HeaderLabel = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.6875rem;
    font-weight: 600;
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

const MappingRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 40px 1fr;
    gap: 1rem;
    align-items: center;
    padding: 0.5rem 0;

    &:not(:last-child) {
        border-bottom: 1px solid var(--section-background);
    }
`;

const SourceColumn = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background-color: var(--section-background);
    border-radius: 6px;
`;

const ColumnName = styled.span`
    font-family: "SF Mono", Monaco, Consolas, monospace;
    font-size: 0.8125rem;
    color: var(--text-primary);
`;

const ArrowContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TargetSelect = styled.select`
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 0.8125rem;
    color: var(--text-primary);
    background-color: var(--white);
    cursor: pointer;

    &:focus {
        outline: none;
        border-color: var(--purple);
    }
`;

function ImportWizardFieldMapping({
    sourceColumns,
    targetFields,
    mappings,
    onMappingChange,
}: Readonly<ImportWizardFieldMappingProps>) {
    const getMappedField = (sourceColumn: string) =>
        mappings.find((m) => m.sourceColumn === sourceColumn)?.targetField ?? "";

    return (
        <Container>
            <Header>
                <HeaderLabel>Source Column</HeaderLabel>
                <div />
                <HeaderLabel>Map To</HeaderLabel>
            </Header>
            {sourceColumns.map((column) => (
                <MappingRow key={column}>
                    <SourceColumn>
                        <Icon name="Table" size={14} color="var(--text-secondary)" weight="regular" />
                        <ColumnName>{column}</ColumnName>
                    </SourceColumn>
                    <ArrowContainer>
                        <Icon name="ArrowRight" size={16} color="var(--text-tertiary)" weight="regular" />
                    </ArrowContainer>
                    <TargetSelect
                        value={getMappedField(column)}
                        onChange={(e) => onMappingChange(column, e.target.value)}
                    >
                        <option value="">Skip this column</option>
                        {targetFields.map((field) => (
                            <option key={field.id} value={field.id}>
                                {field.label}
                                {field.required ? " *" : ""}
                            </option>
                        ))}
                    </TargetSelect>
                </MappingRow>
            ))}
        </Container>
    );
}

export default ImportWizardFieldMapping;
