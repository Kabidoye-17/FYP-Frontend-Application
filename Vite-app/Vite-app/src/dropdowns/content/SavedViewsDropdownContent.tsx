import * as Dropdown from "../../design_system/Dropdown";
import Icon from "../../design_system/Icon";
import styled from "styled-components";
import { useState } from "react";
import type { SavedView, FilterCondition } from "../../features/filters/FilterBar";

const DropdownContent = styled(Dropdown.Content)`
    z-index: 250;
    background-color: var(--white);
    min-width: 220px;
`;

const ViewItem = styled(Dropdown.Item)`
    position: relative;
    padding-right: 2rem;
`;

const ItemContent = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const ViewName = styled.span`
    flex: 1;
`;

const DefaultBadge = styled.span`
    font-size: 0.625rem;
    font-weight: 500;
    color: var(--plum);
    background-color: var(--light-plum);
    padding: 0.125rem 0.25rem;
    border-radius: 3px;
`;

const Separator = styled(Dropdown.Separator)``;

const SaveSection = styled.div`
    padding: 0.5rem;
`;

const SaveInput = styled.input`
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--section-background);
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    margin-bottom: 0.5rem;

    &:focus {
        outline: 2px solid var(--plum);
        outline-offset: -1px;
    }

    &::placeholder {
        color: var(--text-secondary);
    }
`;

const SaveButton = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    padding: 0.5rem;
    background-color: var(--plum);
    color: var(--white);
    border: none;
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;

    &:hover {
        opacity: 0.9;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const EmptyText = styled.div`
    padding: 1rem;
    text-align: center;
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
`;

interface SavedViewsDropdownContentProps {
    savedViews: SavedView[];
    currentFilters: FilterCondition[];
    onLoadView: (view: SavedView) => void;
    onSaveView: (name: string, filters: FilterCondition[]) => void;
}

function SavedViewsDropdownContent({
    savedViews,
    currentFilters,
    onLoadView,
    onSaveView,
}: Readonly<SavedViewsDropdownContentProps>) {
    const [newViewName, setNewViewName] = useState("");

    const handleSave = () => {
        if (newViewName.trim() && currentFilters.length > 0) {
            onSaveView(newViewName.trim(), currentFilters);
            setNewViewName("");
        }
    };

    return (
        <DropdownContent sideOffset={5} align="end">
            {savedViews.length === 0 ? (
                <EmptyText>No saved views yet</EmptyText>
            ) : (
                savedViews.map((view) => (
                    <ViewItem key={view.id} onSelect={() => onLoadView(view)}>
                        <ItemContent>
                            <Icon
                                name="BookmarkSimple"
                                size={16}
                                color="var(--text-secondary)"
                                weight={view.isDefault ? "fill" : "regular"}
                            />
                            <ViewName>{view.name}</ViewName>
                            {view.isDefault && <DefaultBadge>Default</DefaultBadge>}
                        </ItemContent>
                    </ViewItem>
                ))
            )}

            {currentFilters.length > 0 && (
                <>
                    <Separator />
                    <SaveSection>
                        <SaveInput
                            placeholder="View name..."
                            value={newViewName}
                            onChange={(e) => setNewViewName(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSave()}
                        />
                        <SaveButton
                            onClick={handleSave}
                            disabled={!newViewName.trim()}
                        >
                            <Icon
                                name="BookmarkSimple"
                                size={12}
                                color="currentColor"
                                weight="fill"
                            />
                            Save current view
                        </SaveButton>
                    </SaveSection>
                </>
            )}
        </DropdownContent>
    );
}

export default SavedViewsDropdownContent;
