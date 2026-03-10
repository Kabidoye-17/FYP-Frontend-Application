import { useState, useRef } from "react";
import styled from "styled-components";
import Icon from "../design_system/Icon";

interface AttachmentUploadZoneProps {
    onFilesSelect: (files: FileList) => void;
    accept?: string;
    maxSize?: number;
}

const Zone = styled.div<{ $isDragging: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    border: 2px dashed
        ${({ $isDragging }) => ($isDragging ? "var(--purple)" : "var(--border-color)")};
    border-radius: 12px;
    background-color: ${({ $isDragging }) =>
        $isDragging ? "var(--purple-light)" : "var(--section-background)"};
    cursor: pointer;
    transition: border-color 0.15s ease, background-color 0.15s ease;

    &:hover {
        border-color: var(--purple);
        background-color: var(--purple-light);
    }
`;

const IconWrapper = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
`;

const Title = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-primary);
    margin: 0 0 0.25rem 0;
`;

const Hint = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin: 0;
`;

const BrowseLink = styled.span`
    color: var(--purple);
    text-decoration: underline;
    cursor: pointer;
`;

const HiddenInput = styled.input`
    display: none;
`;

function AttachmentUploadZone({
    onFilesSelect,
    accept,
    maxSize,
}: Readonly<AttachmentUploadZoneProps>) {
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
        if (e.dataTransfer.files.length > 0) {
            onFilesSelect(e.dataTransfer.files);
        }
    };

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onFilesSelect(e.target.files);
        }
    };

    const maxSizeMB = maxSize ? maxSize / (1024 * 1024) : 10;

    return (
        <Zone
            $isDragging={isDragging}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
        >
            <IconWrapper>
                <Icon name="CloudArrowUp" size={24} color="var(--purple)" weight="regular" />
            </IconWrapper>
            <Title>
                Drag & drop files or <BrowseLink>browse</BrowseLink>
            </Title>
            <Hint>Max file size: {maxSizeMB}MB</Hint>
            <HiddenInput
                ref={inputRef}
                type="file"
                accept={accept}
                multiple
                onChange={handleChange}
            />
        </Zone>
    );
}

export default AttachmentUploadZone;
