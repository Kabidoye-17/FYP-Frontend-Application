import styled from "styled-components";
import { useState } from "react";
import * as Dropdown from "../../design_system/Dropdown";
import FilterChip from "./FilterChip";
import SmallSavedViewOpener from "../../dropdowns/opener/SmallSavedViewOpener";
import SavedViewsDropdownContent from "../../dropdowns/content/SavedViewsDropdownContent";
import FilterBuilderModal from "../../modals/filter/FilterBuilderModal";
import Icon from "../../design_system/Icon";

export interface FilterCondition {
    id: string;
    field: string;
    operator: string;
    value: string;
}

export interface SavedView {
    id: string;
    name: string;
    filters: FilterCondition[];
    isDefault?: boolean;
}

interface FilterBarProps {
    filters: FilterCondition[];
    onFiltersChange: (filters: FilterCondition[]) => void;
    savedViews: SavedView[];
    onSaveView: (name: string, filters: FilterCondition[]) => void;
    onLoadView: (view: SavedView) => void;
}

const BarContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background-color: var(--white);
    border-bottom: 1px solid var(--section-background);
`;

const FiltersContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    flex: 1;
`;

const AddFilterButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.375rem 0.5rem;
    background: transparent;
    border: 1px dashed var(--section-background);
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
    cursor: pointer;

    &:hover {
        border-color: var(--plum);
        color: var(--plum);
        background-color: var(--light-plum);
    }
`;

const ClearButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.375rem 0.5rem;
    background: transparent;
    border: none;
    border-radius: 4px;
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
    cursor: pointer;

    &:hover {
        background-color: var(--section-background);
        color: var(--text-primary);
    }
`;

const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

function FilterBar({
    filters,
    onFiltersChange,
    savedViews,
    onSaveView,
    onLoadView,
}: FilterBarProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentView, setCurrentView] = useState<SavedView | null>(null);

    const handleRemoveFilter = (filterId: string) => {
        onFiltersChange(filters.filter((f) => f.id !== filterId));
    };

    const handleClearAll = () => {
        onFiltersChange([]);
        setCurrentView(null);
    };

    const handleLoadView = (view: SavedView) => {
        setCurrentView(view);
        onLoadView(view);
    };

    const handleAddFilter = (filter: FilterCondition) => {
        onFiltersChange([...filters, filter]);
    };

    return (
        <BarContainer>
            <FiltersContainer>
                {filters.map((filter) => (
                    <FilterChip
                        key={filter.id}
                        filter={filter}
                        onRemove={() => handleRemoveFilter(filter.id)}
                    />
                ))}
                <AddFilterButton onClick={() => setIsModalOpen(true)}>
                    <Icon name="Plus" size={12} color="currentColor" weight="bold" />
                    Add filter
                </AddFilterButton>
            </FiltersContainer>

            <ActionsContainer>
                {filters.length > 0 && (
                    <ClearButton onClick={handleClearAll}>
                        <Icon name="X" size={12} color="currentColor" weight="bold" />
                        Clear all
                    </ClearButton>
                )}
                <Dropdown.Root>
                    <Dropdown.Trigger asChild>
                        <SmallSavedViewOpener currentView={currentView} />
                    </Dropdown.Trigger>
                    <Dropdown.Portal>
                        <SavedViewsDropdownContent
                            savedViews={savedViews}
                            currentFilters={filters}
                            onLoadView={handleLoadView}
                            onSaveView={onSaveView}
                        />
                    </Dropdown.Portal>
                </Dropdown.Root>
            </ActionsContainer>

            <FilterBuilderModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                onAddFilter={handleAddFilter}
            />
        </BarContainer>
    );
}

export default FilterBar;
