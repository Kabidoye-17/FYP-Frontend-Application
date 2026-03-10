import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";
import { useState } from "react";
import FilterBuilderModalBody from "./FilterBuilderModalBody";
import Icon from "../../design_system/Icon";
import type { FilterCondition } from "../../features/filters/FilterBar";

interface FilterBuilderModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAddFilter: (filter: FilterCondition) => void;
}

const DialogOverlay = styled(Dialog.Overlay)`
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
    position: fixed;
    inset: 0;
    z-index: 200;
    animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

    @keyframes overlayShow {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const DialogContent = styled(Dialog.Content)`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 440px;
    background-color: var(--white);
    border-radius: 16px;
    box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
        0px 10px 20px -15px rgba(22, 23, 24, 0.2);
    z-index: 201;
    display: flex;
    flex-direction: column;
    animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

    @keyframes contentShow {
        from {
            opacity: 0;
            transform: translate(-50%, -48%) scale(0.96);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid var(--section-background);
`;

const Title = styled(Dialog.Title)`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: "Inter", sans-serif;
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
`;

const CloseButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;

    &:hover {
        background-color: var(--section-background);
    }
`;

const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    padding: 1rem;
    border-top: 1px solid var(--section-background);
`;

const CancelButton = styled.button`
    padding: 0.5rem 1rem;
    background: transparent;
    border: none;
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-secondary);
    cursor: pointer;

    &:hover {
        background-color: var(--section-background);
    }
`;

const ApplyButton = styled.button<{ $isValid: boolean }>`
    padding: 0.5rem 1rem;
    background-color: ${({ $isValid }) =>
        $isValid ? "var(--plum)" : "var(--section-background)"};
    border: none;
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    color: ${({ $isValid }) => ($isValid ? "var(--white)" : "var(--text-secondary)")};
    cursor: ${({ $isValid }) => ($isValid ? "pointer" : "not-allowed")};

    &:hover {
        opacity: ${({ $isValid }) => ($isValid ? 0.9 : 1)};
    }
`;

function FilterBuilderModal({
    open,
    onOpenChange,
    onAddFilter,
}: FilterBuilderModalProps) {
    const [field, setField] = useState("");
    const [operator, setOperator] = useState("");
    const [value, setValue] = useState("");

    const handleApply = () => {
        if (field && operator) {
            onAddFilter({
                id: String(Date.now()),
                field,
                operator,
                value,
            });
            handleClose();
        }
    };

    const handleClose = () => {
        setField("");
        setOperator("");
        setValue("");
        onOpenChange(false);
    };

    const isValid = field && operator && (operator === "is_empty" || operator === "is_not_empty" || value);

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <DialogOverlay />
                <DialogContent>
                    <Header>
                        <Title>
                            <Icon name="Funnel" size={20} color="var(--plum)" weight="fill" />
                            Add Filter
                        </Title>
                        <CloseButton onClick={handleClose}>
                            <Icon
                                name="X"
                                size={20}
                                color="var(--text-secondary)"
                                weight="regular"
                            />
                        </CloseButton>
                    </Header>
                    <FilterBuilderModalBody
                        field={field}
                        operator={operator}
                        value={value}
                        onFieldChange={setField}
                        onOperatorChange={setOperator}
                        onValueChange={setValue}
                    />
                    <Footer>
                        <CancelButton onClick={handleClose}>Cancel</CancelButton>
                        <ApplyButton $isValid={!!isValid} onClick={handleApply} disabled={!isValid}>
                            Apply Filter
                        </ApplyButton>
                    </Footer>
                </DialogContent>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default FilterBuilderModal;
