import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";
import ExportWizardFormatSelector from "./ExportWizardFormatSelector";
import ExportWizardOptions from "./ExportWizardOptions";
import ExportWizardPreview from "./ExportWizardPreview";
import Button from "../../design_system/Button";
import Icon from "../../design_system/Icon";
import { showToast } from "../../utils/toast";

type ExportFormat = "csv" | "json" | "xlsx";

interface ExportWizardModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    itemCount?: number;
    onExport?: (format: ExportFormat, fields: string[]) => void;
}

const EXPORT_FIELDS = [
    { id: "id", label: "ID", icon: "Hash" },
    { id: "title", label: "Title", icon: "TextT" },
    { id: "description", label: "Description", icon: "Paragraph" },
    { id: "status", label: "Status", icon: "Circle" },
    { id: "priority", label: "Priority", icon: "Flag" },
    { id: "assignees", label: "Assignees", icon: "User" },
    { id: "labels", label: "Labels", icon: "Tag" },
    { id: "createdAt", label: "Created Date", icon: "Calendar" },
    { id: "updatedAt", label: "Updated Date", icon: "Clock" },
];

const DialogOverlay = styled(Dialog.Overlay)`
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    position: fixed;
    inset: 0;
    z-index: 200;
`;

const DialogContent = styled(Dialog.Content)`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 500px;
    max-height: 85vh;
    background-color: var(--white);
    border-radius: 12px;
    box-shadow: 0 16px 70px rgba(0, 0, 0, 0.2);
    z-index: 201;
    overflow: hidden;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--border-color);
`;

const Title = styled(Dialog.Title)`
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
`;

const Body = styled.div`
    padding: 1.25rem;
    max-height: 450px;
    overflow-y: auto;
`;

const Section = styled.div`
    &:not(:last-child) {
        margin-bottom: 1.5rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid var(--border-color);
    }
`;

const SectionTitle = styled.h4`
    font-family: "Inter", sans-serif;
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 0.75rem 0;
`;

const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    border-top: 1px solid var(--border-color);
`;

function ExportWizardModal({
    open,
    onOpenChange,
    itemCount = 0,
    onExport,
}: Readonly<ExportWizardModalProps>) {
    const [format, setFormat] = useState<ExportFormat>("csv");
    const [selectedFields, setSelectedFields] = useState<string[]>(["id", "title", "status", "priority"]);
    const [isExporting, setIsExporting] = useState(false);

    const handleToggleField = (fieldId: string) => {
        setSelectedFields((prev) =>
            prev.includes(fieldId)
                ? prev.filter((id) => id !== fieldId)
                : [...prev, fieldId]
        );
    };

    const handleSelectAll = () => {
        setSelectedFields(EXPORT_FIELDS.map((f) => f.id));
    };

    const handleDeselectAll = () => {
        setSelectedFields([]);
    };

    const handleClose = () => {
        setFormat("csv");
        setSelectedFields(["id", "title", "status", "priority"]);
        onOpenChange(false);
    };

    const handleExport = async () => {
        if (selectedFields.length === 0) return;

        setIsExporting(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            onExport?.(format, selectedFields);
            showToast.success(`Export started as ${format.toUpperCase()}`);
            handleClose();
        } catch {
            showToast.error("Export failed. Please try again.");
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <DialogOverlay />
                <DialogContent>
                    <Header>
                        <Title>Export Data</Title>
                        <Dialog.Close asChild>
                            <Button
                                icon={<Icon name="X" size={18} color="var(--text-secondary)" weight="regular" />}
                                IconOnly
                                backgroundColor="transparent"
                                onClick={handleClose}
                            />
                        </Dialog.Close>
                    </Header>
                    <Body>
                        <Section>
                            <SectionTitle>Export Format</SectionTitle>
                            <ExportWizardFormatSelector
                                selectedFormat={format}
                                onFormatSelect={setFormat}
                            />
                        </Section>
                        <Section>
                            <ExportWizardOptions
                                fields={EXPORT_FIELDS}
                                selectedFields={selectedFields}
                                onToggleField={handleToggleField}
                                onSelectAll={handleSelectAll}
                                onDeselectAll={handleDeselectAll}
                            />
                        </Section>
                        <ExportWizardPreview
                            format={format}
                            fieldCount={selectedFields.length}
                            itemCount={itemCount}
                        />
                    </Body>
                    <Footer>
                        <Button
                            backgroundColor="var(--white)"
                            color="var(--text-primary)"
                            onClick={handleClose}
                            disabled={isExporting}
                        >
                            Cancel
                        </Button>
                        <Button
                            icon={<Icon name="DownloadSimple" size={14} color="var(--white)" weight="bold" />}
                            backgroundColor="var(--purple)"
                            color="var(--white)"
                            onClick={handleExport}
                            disabled={selectedFields.length === 0 || isExporting}
                        >
                            {isExporting ? "Exporting..." : "Export"}
                        </Button>
                    </Footer>
                </DialogContent>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default ExportWizardModal;
