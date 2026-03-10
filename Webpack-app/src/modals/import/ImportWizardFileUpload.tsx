import { useState, useRef } from "react";
import styled from "styled-components";
import Icon from "../../design_system/Icon";

interface ImportWizardFileUploadProps {
    file: File | null;
    onFileSelect: (file: File) => void;
    accept?: string;
}

const Container = styled.div`
    padding: 1.5rem;
`;

const DropZone = styled.div<{ $isDragging: boolean; $hasFile: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2.5rem 2rem;
    border: 2px dashed
        ${({ $isDragging, $hasFile }) =>
            $hasFile
                ? "var(--success)"
                : $isDragging
                ? "var(--purple)"
                : "var(--border-color)"};
    border-radius: 12px;
    background-color: ${({ $isDragging, $hasFile }) =>
        $hasFile
            ? "var(--success-light)"
            : $isDragging
            ? "var(--purple-light)"
            : "var(--section-background)"};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        border-color: var(--purple);
        background-color: var(--purple-light);
    }
`;

const IconWrapper = styled.div<{ $hasFile: boolean }>`
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: ${({ $hasFile }) =>
        $hasFile ? "var(--success)" : "var(--white)"};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
`;

const Title = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--text-primary);
    margin: 0 0 0.25rem 0;
`;

const Subtitle = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 0.8125rem;
    color: var(--text-secondary);
    margin: 0;
`;

const FileInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
    padding: 0.75rem 1rem;
    background-color: var(--white);
    border-radius: 8px;
`;

const FileName = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.8125rem;
    color: var(--text-primary);
    flex: 1;
`;

const FileSize = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
`;

const HiddenInput = styled.input`
    display: none;
`;

function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

function ImportWizardFileUpload({
    file,
    onFileSelect,
    accept = ".csv,.xlsx,.json",
}: Readonly<ImportWizardFileUploadProps>) {
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            onFileSelect(droppedFile);
        }
    };

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            onFileSelect(selectedFile);
        }
    };

    return (
        <Container>
            <DropZone
                $isDragging={isDragging}
                $hasFile={!!file}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
            >
                <IconWrapper $hasFile={!!file}>
                    <Icon
                        name={file ? "CheckCircle" : "CloudArrowUp"}
                        size={28}
                        color={file ? "var(--white)" : "var(--purple)"}
                        weight={file ? "fill" : "regular"}
                    />
                </IconWrapper>
                <Title>{file ? "File ready" : "Drop your file here"}</Title>
                <Subtitle>
                    {file ? "Click to select a different file" : "or click to browse"}
                </Subtitle>
                {file && (
                    <FileInfo>
                        <Icon name="File" size={16} color="var(--text-secondary)" weight="regular" />
                        <FileName>{file.name}</FileName>
                        <FileSize>{formatFileSize(file.size)}</FileSize>
                    </FileInfo>
                )}
            </DropZone>
            <HiddenInput
                ref={inputRef}
                type="file"
                accept={accept}
                onChange={handleChange}
            />
        </Container>
    );
}

export default ImportWizardFileUpload;
