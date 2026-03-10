import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";
import ImportWizardStepIndicator from "./ImportWizardStepIndicator";
import ImportWizardFileUpload from "./ImportWizardFileUpload";
import ImportWizardFieldMapping from "./ImportWizardFieldMapping";
import Button from "../../design_system/Button";
import Icon from "../../design_system/Icon";
import { showToast } from "../../utils/toast";

interface ImportWizardModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onImport?: (data: unknown) => void;
}

const STEPS = [
    { id: "upload", label: "Upload" },
    { id: "mapping", label: "Map Fields" },
    { id: "review", label: "Review" },
];

const TARGET_FIELDS = [
    { id: "title", label: "Title", required: true },
    { id: "description", label: "Description" },
    { id: "status", label: "Status" },
    { id: "priority", label: "Priority" },
    { id: "assignee", label: "Assignee" },
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
    max-width: 600px;
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

const ContentArea = styled.div`
    max-height: 400px;
    overflow-y: auto;
`;

const ReviewMessage = styled.div`
    padding: 2rem;
    text-align: center;
`;

const ReviewTitle = styled.h3`
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 0.5rem 0;
`;

const ReviewSubtitle = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: 0;
`;

const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    border-top: 1px solid var(--border-color);
`;

function ImportWizardModal({
    open,
    onOpenChange,
    onImport,
}: Readonly<ImportWizardModalProps>) {
    const [currentStep, setCurrentStep] = useState(0);
    const [file, setFile] = useState<File | null>(null);
    const [mappings, setMappings] = useState<Array<{ sourceColumn: string; targetField: string }>>([]);
    const [isImporting, setIsImporting] = useState(false);

    // Mock source columns from file
    const sourceColumns = file ? ["Name", "Desc", "State", "Type", "Owner"] : [];

    const handleMappingChange = (sourceColumn: string, targetField: string) => {
        setMappings((prev) => {
            const filtered = prev.filter((m) => m.sourceColumn !== sourceColumn);
            if (targetField) {
                return [...filtered, { sourceColumn, targetField }];
            }
            return filtered;
        });
    };

    const handleClose = () => {
        setCurrentStep(0);
        setFile(null);
        setMappings([]);
        onOpenChange(false);
    };

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleImport = async () => {
        setIsImporting(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            onImport?.({ file, mappings });
            showToast.success("Import completed successfully!");
            handleClose();
        } catch {
            showToast.error("Import failed. Please try again.");
        } finally {
            setIsImporting(false);
        }
    };

    const canProceed = currentStep === 0 ? !!file : currentStep === 1 ? mappings.length > 0 : true;

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <DialogOverlay />
                <DialogContent>
                    <Header>
                        <Title>Import Issues</Title>
                        <Dialog.Close asChild>
                            <Button
                                icon={<Icon name="X" size={18} color="var(--text-secondary)" weight="regular" />}
                                IconOnly
                                backgroundColor="transparent"
                                onClick={handleClose}
                            />
                        </Dialog.Close>
                    </Header>
                    <ImportWizardStepIndicator steps={STEPS} currentStep={currentStep} />
                    <ContentArea>
                        {currentStep === 0 && (
                            <ImportWizardFileUpload file={file} onFileSelect={setFile} />
                        )}
                        {currentStep === 1 && (
                            <ImportWizardFieldMapping
                                sourceColumns={sourceColumns}
                                targetFields={TARGET_FIELDS}
                                mappings={mappings}
                                onMappingChange={handleMappingChange}
                            />
                        )}
                        {currentStep === 2 && (
                            <ReviewMessage>
                                <Icon name="FileArrowUp" size={48} color="var(--purple)" weight="light" />
                                <ReviewTitle style={{ marginTop: "1rem" }}>Ready to import</ReviewTitle>
                                <ReviewSubtitle>
                                    {mappings.length} field{mappings.length !== 1 ? "s" : ""} mapped
                                </ReviewSubtitle>
                            </ReviewMessage>
                        )}
                    </ContentArea>
                    <Footer>
                        <Button
                            backgroundColor="var(--white)"
                            color="var(--text-primary)"
                            onClick={currentStep === 0 ? handleClose : handleBack}
                            disabled={isImporting}
                        >
                            {currentStep === 0 ? "Cancel" : "Back"}
                        </Button>
                        <Button
                            icon={
                                <Icon
                                    name={currentStep === STEPS.length - 1 ? "Check" : "ArrowRight"}
                                    size={14}
                                    color="var(--white)"
                                    weight="bold"
                                />
                            }
                            backgroundColor="var(--purple)"
                            color="var(--white)"
                            onClick={currentStep === STEPS.length - 1 ? handleImport : handleNext}
                            disabled={!canProceed || isImporting}
                        >
                            {currentStep === STEPS.length - 1
                                ? isImporting
                                    ? "Importing..."
                                    : "Import"
                                : "Next"}
                        </Button>
                    </Footer>
                </DialogContent>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default ImportWizardModal;
