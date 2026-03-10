import styled from "styled-components";
import Icon from "../../design_system/Icon";
import type * as PhosphorIcons from "@phosphor-icons/react";

type IconName = keyof typeof PhosphorIcons;

type ExportFormat = "csv" | "json" | "xlsx";

interface ExportWizardFormatSelectorProps {
    selectedFormat: ExportFormat;
    onFormatSelect: (format: ExportFormat) => void;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const FormatOption = styled.button<{ $selected: boolean }>`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid
        ${({ $selected }) => ($selected ? "var(--purple)" : "var(--border-color)")};
    border-radius: 10px;
    background-color: ${({ $selected }) =>
        $selected ? "var(--purple-light)" : "var(--white)"};
    cursor: pointer;
    text-align: left;
    transition: all 0.15s ease;

    &:hover {
        border-color: var(--purple);
    }
`;

const IconWrapper = styled.div<{ $color: string }>`
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background-color: ${({ $color }) => $color};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

const Content = styled.div`
    flex: 1;
`;

const FormatName = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--text-primary);
    display: block;
`;

const FormatDescription = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.8125rem;
    color: var(--text-secondary);
`;

const CheckIcon = styled.div<{ $visible: boolean }>`
    opacity: ${({ $visible }) => ($visible ? 1 : 0)};
    transition: opacity 0.15s ease;
`;

const FORMATS = [
    {
        id: "csv" as const,
        name: "CSV",
        description: "Comma-separated values, works with Excel",
        icon: "FileCsv" as IconName,
        color: "var(--success-light)",
    },
    {
        id: "json" as const,
        name: "JSON",
        description: "Machine-readable format for developers",
        icon: "FileCode" as IconName,
        color: "var(--warning-light)",
    },
    {
        id: "xlsx" as const,
        name: "Excel",
        description: "Native Excel format with formatting",
        icon: "FileXls" as IconName,
        color: "var(--blue-light)",
    },
] as const;

function ExportWizardFormatSelector({
    selectedFormat,
    onFormatSelect,
}: Readonly<ExportWizardFormatSelectorProps>) {
    return (
        <Container>
            {FORMATS.map((format) => (
                <FormatOption
                    key={format.id}
                    type="button"
                    $selected={selectedFormat === format.id}
                    onClick={() => onFormatSelect(format.id)}
                >
                    <IconWrapper $color={format.color}>
                        <Icon name={format.icon} size={20} color="var(--text-primary)" weight="regular" />
                    </IconWrapper>
                    <Content>
                        <FormatName>{format.name}</FormatName>
                        <FormatDescription>{format.description}</FormatDescription>
                    </Content>
                    <CheckIcon $visible={selectedFormat === format.id}>
                        <Icon name="CheckCircle" size={20} color="var(--purple)" weight="fill" />
                    </CheckIcon>
                </FormatOption>
            ))}
        </Container>
    );
}

export default ExportWizardFormatSelector;
