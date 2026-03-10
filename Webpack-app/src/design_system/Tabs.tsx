import * as RadixTabs from "@radix-ui/react-tabs";
import styled from "styled-components";

const StyledRoot = styled(RadixTabs.Root)`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const StyledList = styled(RadixTabs.List)`
    display: flex;
    gap: 0.25rem;
    border-bottom: 1px solid var(--section-background);
    padding: 0 1rem;
`;

const StyledTrigger = styled(RadixTabs.Trigger)`
    all: unset;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-secondary);
    padding: 0.75rem 1rem;
    cursor: pointer;
    position: relative;
    transition: color 0.15s ease;

    &:hover {
        color: var(--text-primary);
    }

    &[data-state="active"] {
        color: var(--plum);

        &::after {
            content: "";
            position: absolute;
            bottom: -1px;
            left: 0;
            right: 0;
            height: 2px;
            background-color: var(--plum);
            border-radius: 2px 2px 0 0;
        }
    }

    &:focus-visible {
        outline: 2px solid var(--plum);
        outline-offset: 2px;
        border-radius: 4px;
    }
`;

const StyledContent = styled(RadixTabs.Content)`
    padding: 1rem;
    flex: 1;

    &:focus-visible {
        outline: none;
    }
`;

export const Root = StyledRoot;
export const List = StyledList;
export const Trigger = StyledTrigger;
export const Content = StyledContent;
