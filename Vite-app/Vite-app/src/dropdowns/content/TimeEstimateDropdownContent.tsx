import * as Dropdown from "../../design_system/Dropdown";
import Icon from "../../design_system/Icon";
import styled from "styled-components";

const DropdownContent = styled(Dropdown.Content)`
    z-index: 250;
    background-color: var(--white);
    min-width: 180px;
`;

const EstimateItem = styled(Dropdown.Item)`
    position: relative;
    padding-right: 2rem;
`;

const ItemContent = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const CheckContainer = styled.div`
    position: absolute;
    right: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const EstimateLabel = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
`;

const Separator = styled(Dropdown.Separator)``;

const CustomSection = styled.div`
    padding: 0.5rem;
`;

const CustomInput = styled.input`
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--section-background);
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;

    &:focus {
        outline: 2px solid var(--plum);
        outline-offset: -1px;
    }

    &::placeholder {
        color: var(--text-secondary);
    }
`;

interface TimeEstimateDropdownContentProps {
    currentEstimate: number | null;
    onEstimateChange: (estimate: number | null) => void;
}

const presetEstimates = [
    { value: 0.5, label: "30 minutes" },
    { value: 1, label: "1 hour" },
    { value: 2, label: "2 hours" },
    { value: 4, label: "4 hours" },
    { value: 8, label: "1 day" },
    { value: 16, label: "2 days" },
    { value: 40, label: "1 week" },
];

function TimeEstimateDropdownContent({
    currentEstimate,
    onEstimateChange,
}: Readonly<TimeEstimateDropdownContentProps>) {
    const handleCustomInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const value = parseFloat((e.target as HTMLInputElement).value);
            if (!isNaN(value) && value > 0) {
                onEstimateChange(value);
            }
        }
    };

    return (
        <DropdownContent sideOffset={5} align="start">
            {presetEstimates.map((estimate) => {
                const isSelected = currentEstimate === estimate.value;

                return (
                    <EstimateItem
                        key={estimate.value}
                        onSelect={() => onEstimateChange(estimate.value)}
                    >
                        <ItemContent>
                            <Icon
                                name="Clock"
                                size={16}
                                color="var(--text-secondary)"
                                weight="regular"
                            />
                            <EstimateLabel>{estimate.label}</EstimateLabel>
                        </ItemContent>
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
                    </EstimateItem>
                );
            })}
            <Separator />
            <EstimateItem onSelect={() => onEstimateChange(null)}>
                <ItemContent>
                    <Icon
                        name="X"
                        size={16}
                        color="var(--text-secondary)"
                        weight="regular"
                    />
                    <EstimateLabel>Clear estimate</EstimateLabel>
                </ItemContent>
            </EstimateItem>
            <Separator />
            <CustomSection>
                <CustomInput
                    type="number"
                    placeholder="Custom hours..."
                    min="0"
                    step="0.5"
                    onKeyDown={handleCustomInput}
                />
            </CustomSection>
        </DropdownContent>
    );
}

export default TimeEstimateDropdownContent;
