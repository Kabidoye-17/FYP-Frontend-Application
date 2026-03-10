import styled from "styled-components";
import Icon from "../design_system/Icon";
import AttachmentItemActions from "./AttachmentItemActions";
import type * as PhosphorIcons from "@phosphor-icons/react";

type IconName = keyof typeof PhosphorIcons;

export interface Attachment {
    id: string;
    name: string;
    size: number;
    type: string;
    url: string;
    uploadedAt: string;
}

interface AttachmentItemProps {
    attachment: Attachment;
    onPreview: () => void;
    onDownload: () => void;
    onDelete: () => void;
}

const Item = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    transition: background-color 0.15s ease;

    &:hover {
        background-color: var(--hover-background);
    }

    &:not(:last-child) {
        border-bottom: 1px solid var(--section-background);
    }
`;

const IconWrapper = styled.div<{ $color: string }>`
    width: 36px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ $color }) => $color};
    flex-shrink: 0;
`;

const Content = styled.div`
    flex: 1;
    min-width: 0;
`;

const Name = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--text-primary);
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Meta = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.6875rem;
    color: var(--text-secondary);
`;

function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

function getFileIcon(type: string): { icon: string; color: string } {
    if (type.startsWith("image/")) {
        return { icon: "Image", color: "var(--purple-light)" };
    }
    if (type.startsWith("video/")) {
        return { icon: "VideoCamera", color: "var(--error-light)" };
    }
    if (type.includes("pdf")) {
        return { icon: "FilePdf", color: "var(--error-light)" };
    }
    if (type.includes("spreadsheet") || type.includes("excel")) {
        return { icon: "FileXls", color: "var(--success-light)" };
    }
    if (type.includes("document") || type.includes("word")) {
        return { icon: "FileDoc", color: "var(--blue-light)" };
    }
    if (type.includes("zip") || type.includes("archive")) {
        return { icon: "FileZip", color: "var(--warning-light)" };
    }
    return { icon: "File", color: "var(--section-background)" };
}

function AttachmentItem({
    attachment,
    onPreview,
    onDownload,
    onDelete,
}: Readonly<AttachmentItemProps>) {
    const { icon, color } = getFileIcon(attachment.type);

    return (
        <Item className="attachment-item">
            <IconWrapper $color={color}>
                <Icon name={icon as IconName} size={18} color="var(--text-primary)" weight="regular" />
            </IconWrapper>
            <Content>
                <Name>{attachment.name}</Name>
                <Meta>{formatFileSize(attachment.size)}</Meta>
            </Content>
            <AttachmentItemActions
                onPreview={onPreview}
                onDownload={onDownload}
                onDelete={onDelete}
            />
        </Item>
    );
}

export default AttachmentItem;
