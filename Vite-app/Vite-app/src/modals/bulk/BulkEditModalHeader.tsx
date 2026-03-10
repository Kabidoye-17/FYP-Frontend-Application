import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";
import Button from "../../design_system/Button";
import Icon from "../../design_system/Icon";

interface BulkEditModalHeaderProps {
    selectedCount: number;
    onClose: () => void;
}

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--border-color);
`;

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const IconWrapper = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background-color: var(--purple-light);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TitleContent = styled.div``;

const Title = styled(Dialog.Title)`
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
`;

const Subtitle = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin: 0.125rem 0 0 0;
`;

function BulkEditModalHeader({ selectedCount, onClose }: Readonly<BulkEditModalHeaderProps>) {
    return (
        <Header>
            <TitleWrapper>
                <IconWrapper>
                    <Icon name="PencilLine" size={18} color="var(--purple)" weight="regular" />
                </IconWrapper>
                <TitleContent>
                    <Title>Bulk Edit</Title>
                    <Subtitle>{selectedCount} item{selectedCount !== 1 ? "s" : ""} selected</Subtitle>
                </TitleContent>
            </TitleWrapper>
            <Dialog.Close asChild>
                <Button
                    icon={<Icon name="X" size={18} color="var(--text-secondary)" weight="regular" />}
                    IconOnly
                    backgroundColor="transparent"
                    onClick={onClose}
                />
            </Dialog.Close>
        </Header>
    );
}

export default BulkEditModalHeader;
