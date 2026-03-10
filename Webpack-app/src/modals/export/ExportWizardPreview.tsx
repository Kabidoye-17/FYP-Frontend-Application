import styled from "styled-components";
import Icon from "../../design_system/Icon";

interface ExportWizardPreviewProps {
    format: string;
    fieldCount: number;
    itemCount: number;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;
`;

const IconWrapper = styled.div`
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: var(--purple-light);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.25rem;
`;

const Title = styled.h3`
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 0.5rem 0;
`;

const Summary = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: 0 0 1.5rem 0;
`;

const Details = styled.div`
    display: flex;
    gap: 2rem;
`;

const DetailItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const DetailValue = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
`;

const DetailLabel = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
`;

function ExportWizardPreview({
    format,
    fieldCount,
    itemCount,
}: Readonly<ExportWizardPreviewProps>) {
    return (
        <Container>
            <IconWrapper>
                <Icon name="FileArrowDown" size={32} color="var(--purple)" weight="regular" />
            </IconWrapper>
            <Title>Ready to export</Title>
            <Summary>
                Your data will be exported as {format.toUpperCase()}
            </Summary>
            <Details>
                <DetailItem>
                    <DetailValue>{itemCount}</DetailValue>
                    <DetailLabel>Item{itemCount !== 1 ? "s" : ""}</DetailLabel>
                </DetailItem>
                <DetailItem>
                    <DetailValue>{fieldCount}</DetailValue>
                    <DetailLabel>Field{fieldCount !== 1 ? "s" : ""}</DetailLabel>
                </DetailItem>
            </Details>
        </Container>
    );
}

export default ExportWizardPreview;
