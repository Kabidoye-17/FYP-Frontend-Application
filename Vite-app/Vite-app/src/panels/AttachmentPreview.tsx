import styled from "styled-components";
import Icon from "../design_system/Icon";
import type { Attachment } from "./AttachmentItem";

interface AttachmentPreviewProps {
    attachment: Attachment;
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    background-color: var(--section-background);
    border-radius: 12px;
    overflow: hidden;
`;

const Image = styled.img`
    max-width: 100%;
    max-height: 400px;
    object-fit: contain;
`;

const VideoWrapper = styled.video`
    max-width: 100%;
    max-height: 400px;
`;

const NoPreview = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;
`;

const NoPreviewText = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: 0.75rem 0 0 0;
`;

function AttachmentPreview({ attachment }: Readonly<AttachmentPreviewProps>) {
    if (attachment.type.startsWith("image/")) {
        return (
            <Container>
                <Image src={attachment.url} alt={attachment.name} />
            </Container>
        );
    }

    if (attachment.type.startsWith("video/")) {
        return (
            <Container>
                <VideoWrapper controls>
                    <source src={attachment.url} type={attachment.type} />
                    Your browser does not support video playback.
                </VideoWrapper>
            </Container>
        );
    }

    return (
        <Container>
            <NoPreview>
                <Icon name="File" size={48} color="var(--text-tertiary)" weight="thin" />
                <NoPreviewText>Preview not available for this file type</NoPreviewText>
            </NoPreview>
        </Container>
    );
}

export default AttachmentPreview;
