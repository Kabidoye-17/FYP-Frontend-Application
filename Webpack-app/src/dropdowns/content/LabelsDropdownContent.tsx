import * as Dropdown from "../../design_system/Dropdown";
import * as Tooltip from "../../design_system/Tooltip";
import Icon from "../../design_system/Icon";
import SearchBar from "../../design_system/SearchBar";
import styled from "styled-components";
import { useState } from "react";
import type { Label } from "../../utils/labelData";
import CreateLabelModal from "../../modals/label/CreateLabelModal";
import { showToast } from "../../utils/toast";

const ModalDropdownContent = styled(Dropdown.Content)`
    z-index: 250;
    background-color: var(--white);
    min-width: 280px;
    padding: 0;
`;

const TopRowContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border-bottom: 1px solid var(--section-background);
`;

const SearchBarWrapper = styled.div`
    flex: 1;
`;

const CreateButton = styled.button`
    all: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.15s ease;

    &:hover {
        background-color: var(--section-background);
    }

    &:focus {
        outline: 2px solid var(--plum);
        outline-offset: 2px;
    }
`;

const LabelsListContainer = styled.div`
    max-height: 320px;
    overflow-y: auto;
    padding: 0.5rem;
`;

const LabelItem = styled(Dropdown.CheckboxItem)`
    position: relative;
    padding-right: 2rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

    &:hover .delete-button {
        opacity: 1;
    }
`;

const ItemContent = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
`;

const ColorCircle = styled.div<{ $color: string }>`
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: ${({ $color }) => $color};
    flex-shrink: 0;
`;

const LabelName = styled.span`
    font-size: 0.875rem;
    color: var(--text-primary);
    flex: 1;
`;

const DeleteButton = styled.button`
    all: unset;
    position: absolute;
    right: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.15s ease, background-color 0.15s ease;

    &:hover {
        background-color: var(--section-background);
    }
`;

const CheckContainer = styled.div`
    position: absolute;
    right: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const EmptyState = styled.div`
    padding: 1rem;
    text-align: center;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-secondary);
`;

interface LabelsDropdownContentProps {
    labels: Label[];
    selectedLabels: string[];
    onLabelChange: (labelIds: string[]) => void;
    onLabelsUpdate: (labels: Label[]) => void;
}

function LabelsDropdownContent({
    labels,
    selectedLabels,
    onLabelChange,
    onLabelsUpdate,
}: Readonly<LabelsDropdownContentProps>) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const filteredLabels = labels.filter((label) =>
        label.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleToggleLabel = (labelId: string) => {
        const isSelected = selectedLabels.includes(labelId);
        if (isSelected) {
            onLabelChange(selectedLabels.filter((id) => id !== labelId));
        } else {
            onLabelChange([...selectedLabels, labelId]);
        }
    };

    const handleDeleteLabel = (e: React.MouseEvent, labelId: string) => {
        e.stopPropagation();
        const updatedLabels = labels.filter((label) => label.id !== labelId);
        onLabelsUpdate(updatedLabels);
        onLabelChange(selectedLabels.filter((id) => id !== labelId));
        showToast.info("Label deleted");
    };

    const handleCreateLabel = (newLabel: Label) => {
        onLabelsUpdate([...labels, newLabel]);
        showToast.success("Label created");
    };

    const handleOpenCreateModal = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsCreateModalOpen(true);
    };

    return (
        <>
            <ModalDropdownContent sideOffset={5} align="start">
                <TopRowContainer>
                    <SearchBarWrapper>
                        <SearchBar
                            placeholder="Search labels..."
                            value={searchTerm}
                            onChange={setSearchTerm}
                            size="compact"
                        />
                    </SearchBarWrapper>
                    <Tooltip.Provider>
                        <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                                <CreateButton onClick={handleOpenCreateModal}>
                                    <Icon
                                        name="Plus"
                                        size={18}
                                        color="var(--text-secondary)"
                                        weight="bold"
                                    />
                                </CreateButton>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                                <Tooltip.Content side="top" sideOffset={5}>
                                    Create new label
                                    <Tooltip.Arrow />
                                </Tooltip.Content>
                            </Tooltip.Portal>
                        </Tooltip.Root>
                    </Tooltip.Provider>
                </TopRowContainer>
                <LabelsListContainer>
                    {filteredLabels.length === 0 ? (
                        <EmptyState>No labels found</EmptyState>
                    ) : (
                        filteredLabels.map((label) => {
                            const isSelected = selectedLabels.includes(label.id);

                            return (
                                <LabelItem
                                    key={label.id}
                                    checked={isSelected}
                                    onCheckedChange={() => handleToggleLabel(label.id)}
                                >
                                    <ItemContent>
                                        <ColorCircle $color={label.color} />
                                        <LabelName>{label.name}</LabelName>
                                    </ItemContent>
                                    <DeleteButton
                                        className="delete-button"
                                        onClick={(e) => handleDeleteLabel(e, label.id)}
                                    >
                                        <Icon
                                            name="Trash"
                                            size={14}
                                            color="var(--text-secondary)"
                                            weight="regular"
                                        />
                                    </DeleteButton>
                                    {isSelected && (
                                        <CheckContainer>
                                            <Icon
                                                name="Check"
                                                size={16}
                                                color="var(--plum)"
                                                weight="bold"
                                            />
                                        </CheckContainer>
                                    )}
                                </LabelItem>
                            );
                        })
                    )}
                </LabelsListContainer>
            </ModalDropdownContent>
            <CreateLabelModal
                open={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
                onLabelCreate={handleCreateLabel}
                fromDropdown
            />
        </>
    );
}

export default LabelsDropdownContent;
