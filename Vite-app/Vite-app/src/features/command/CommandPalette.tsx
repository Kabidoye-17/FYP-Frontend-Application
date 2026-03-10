import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Command } from "cmdk";
import CommandSearch from "./CommandSearch";
import CommandGroup from "./CommandGroup";
import CommandItem from "./CommandItem";
import Icon from "../../design_system/Icon";

interface CommandPaletteProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCreateIssue?: () => void;
    onShowShortcuts?: () => void;
}

const Overlay = styled.div<{ $open: boolean }>`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
    transition: opacity 0.15s ease, visibility 0.15s ease;
    z-index: 300;
`;

const DialogContainer = styled.div<{ $open: boolean }>`
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translateX(-50%) ${({ $open }) => ($open ? "scale(1)" : "scale(0.96)")};
    width: 90vw;
    max-width: 560px;
    background-color: var(--white);
    border-radius: 12px;
    box-shadow: 0 16px 70px rgba(0, 0, 0, 0.2);
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
    transition: opacity 0.15s ease, visibility 0.15s ease, transform 0.15s ease;
    z-index: 301;
    overflow: hidden;
`;

const StyledCommand = styled(Command)`
    width: 100%;
`;

const List = styled(Command.List)`
    max-height: 350px;
    overflow-y: auto;
    padding: 0.5rem 0;
`;

const EmptyState = styled(Command.Empty)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;
`;

const EmptyText = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: 0.5rem 0 0 0;
`;

const Footer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.625rem 1rem;
    border-top: 1px solid var(--border-color);
    background-color: var(--section-background);
`;

const FooterHint = styled.span`
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-family: "Inter", sans-serif;
    font-size: 0.6875rem;
    color: var(--text-tertiary);
`;

const FooterKey = styled.kbd`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 18px;
    height: 18px;
    padding: 0 0.25rem;
    font-family: "SF Mono", Monaco, Consolas, monospace;
    font-size: 0.625rem;
    color: var(--text-secondary);
    background-color: var(--white);
    border: 1px solid var(--border-color);
    border-radius: 3px;
`;

function CommandPalette({
    open,
    onOpenChange,
    onCreateIssue,
    onShowShortcuts,
}: Readonly<CommandPaletteProps>) {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleClose = useCallback(() => {
        onOpenChange(false);
        setSearch("");
    }, [onOpenChange]);

    const handleNavigate = useCallback(
        (path: string) => () => {
            navigate(path);
            handleClose();
        },
        [navigate, handleClose]
    );

    const handleAction = useCallback(
        (action?: () => void) => () => {
            action?.();
            handleClose();
        },
        [handleClose]
    );

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && open) {
                handleClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, handleClose]);

    return (
        <>
            <Overlay $open={open} onClick={handleClose} />
            <DialogContainer $open={open} role="dialog" aria-modal="true" aria-label="Command palette">
                <StyledCommand shouldFilter>
                    <CommandSearch
                        value={search}
                        onValueChange={setSearch}
                        placeholder="Type a command or search..."
                    />
                    <List>
                        <EmptyState>
                            <Icon name="MagnifyingGlass" size={32} color="var(--text-tertiary)" weight="light" />
                            <EmptyText>No results found</EmptyText>
                        </EmptyState>

                        <CommandGroup heading="Actions">
                            <CommandItem
                                value="create-issue"
                                label="Create new issue"
                                icon={<Icon name="Plus" size={18} color="var(--text-secondary)" weight="regular" />}
                                shortcut={["C"]}
                                onSelect={handleAction(onCreateIssue)}
                            />
                            <CommandItem
                                value="search"
                                label="Search issues"
                                icon={<Icon name="MagnifyingGlass" size={18} color="var(--text-secondary)" weight="regular" />}
                                shortcut={["/"]}
                                onSelect={handleNavigate("/home/issues")}
                            />
                        </CommandGroup>

                        <CommandGroup heading="Navigation">
                            <CommandItem
                                value="go-issues"
                                label="Go to Issues"
                                icon={<Icon name="Circle" size={18} color="var(--text-secondary)" weight="regular" />}
                                onSelect={handleNavigate("/home/issues")}
                            />
                            <CommandItem
                                value="go-projects"
                                label="Go to Projects"
                                icon={<Icon name="Folder" size={18} color="var(--text-secondary)" weight="regular" />}
                                onSelect={handleNavigate("/home/projects")}
                            />
                            <CommandItem
                                value="go-kanban"
                                label="Go to Kanban Board"
                                icon={<Icon name="Kanban" size={18} color="var(--text-secondary)" weight="regular" />}
                                onSelect={handleNavigate("/home/kanban")}
                            />
                            <CommandItem
                                value="go-analytics"
                                label="Go to Analytics"
                                icon={<Icon name="ChartLine" size={18} color="var(--text-secondary)" weight="regular" />}
                                onSelect={handleNavigate("/home/analytics")}
                            />
                            <CommandItem
                                value="go-calendar"
                                label="Go to Calendar"
                                icon={<Icon name="Calendar" size={18} color="var(--text-secondary)" weight="regular" />}
                                onSelect={handleNavigate("/home/calendar")}
                            />
                            <CommandItem
                                value="go-team"
                                label="Go to Team"
                                icon={<Icon name="Users" size={18} color="var(--text-secondary)" weight="regular" />}
                                onSelect={handleNavigate("/home/team")}
                            />
                            <CommandItem
                                value="go-sprints"
                                label="Go to Sprints"
                                icon={<Icon name="Lightning" size={18} color="var(--text-secondary)" weight="regular" />}
                                onSelect={handleNavigate("/home/sprints")}
                            />
                            <CommandItem
                                value="go-roadmap"
                                label="Go to Roadmap"
                                icon={<Icon name="CalendarBlank" size={18} color="var(--text-secondary)" weight="regular" />}
                                onSelect={handleNavigate("/home/roadmap")}
                            />
                        </CommandGroup>

                        <CommandGroup heading="Help">
                            <CommandItem
                                value="shortcuts"
                                label="Keyboard shortcuts"
                                icon={<Icon name="Keyboard" size={18} color="var(--text-secondary)" weight="regular" />}
                                shortcut={["?"]}
                                onSelect={handleAction(onShowShortcuts)}
                            />
                            <CommandItem
                                value="settings"
                                label="Settings"
                                icon={<Icon name="Gear" size={18} color="var(--text-secondary)" weight="regular" />}
                                onSelect={handleNavigate("/settings")}
                            />
                        </CommandGroup>
                    </List>
                    <Footer>
                        <FooterHint>
                            <FooterKey>↑</FooterKey>
                            <FooterKey>↓</FooterKey>
                            to navigate
                        </FooterHint>
                        <FooterHint>
                            <FooterKey>↵</FooterKey>
                            to select
                        </FooterHint>
                        <FooterHint>
                            <FooterKey>esc</FooterKey>
                            to close
                        </FooterHint>
                    </Footer>
                </StyledCommand>
            </DialogContainer>
        </>
    );
}

export default CommandPalette;
