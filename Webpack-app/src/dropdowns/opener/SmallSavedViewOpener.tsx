import styled from "styled-components";
import Icon from "../../design_system/Icon";
import { forwardRef } from "react";
import type { SavedView } from "../../features/filters/FilterBar";

const OpenerButton = styled.button`
    all: unset;
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.5rem;
    background-color: var(--white);
    border: 1px solid var(--section-background);
    border-radius: 6px;
    cursor: pointer;
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-primary);
    transition: background-color 0.15s ease;
    min-width: 100px;

    &:hover {
        background-color: var(--section-background);
    }

    &:focus {
        outline: 2px solid var(--plum);
        outline-offset: 2px;
    }
`;

const ViewName = styled.span`
    flex: 1;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Placeholder = styled.span`
    color: var(--text-secondary);
`;

interface SmallSavedViewOpenerProps {
    currentView: SavedView | null;
}

const SmallSavedViewOpener = forwardRef<HTMLButtonElement, SmallSavedViewOpenerProps>(
    ({ currentView, ...props }, ref) => {
        return (
            <OpenerButton ref={ref} {...props}>
                <Icon
                    name="BookmarkSimple"
                    size={14}
                    color={currentView ? "var(--plum)" : "var(--text-secondary)"}
                    weight={currentView ? "fill" : "regular"}
                />
                <ViewName>
                    {currentView ? (
                        currentView.name
                    ) : (
                        <Placeholder>Saved views</Placeholder>
                    )}
                </ViewName>
                <Icon
                    name="CaretDown"
                    size={10}
                    color="var(--text-secondary)"
                    weight="bold"
                />
            </OpenerButton>
        );
    }
);

SmallSavedViewOpener.displayName = "SmallSavedViewOpener";

export default SmallSavedViewOpener;
