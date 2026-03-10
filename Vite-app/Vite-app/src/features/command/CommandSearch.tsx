import styled from "styled-components";
import { Command } from "cmdk";
import Icon from "../../design_system/Icon";

interface CommandSearchProps {
    value: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
}

const SearchWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    border-bottom: 1px solid var(--border-color);
`;

const SearchIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
`;

const StyledInput = styled(Command.Input)`
    flex: 1;
    border: none;
    outline: none;
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    color: var(--text-primary);
    background: transparent;

    &::placeholder {
        color: var(--text-tertiary);
    }
`;

function CommandSearch({
    value,
    onValueChange,
    placeholder = "Type a command or search...",
}: Readonly<CommandSearchProps>) {
    return (
        <SearchWrapper>
            <SearchIcon>
                <Icon name="MagnifyingGlass" size={20} color="var(--text-secondary)" weight="regular" />
            </SearchIcon>
            <StyledInput
                value={value}
                onValueChange={onValueChange}
                placeholder={placeholder}
                autoFocus
            />
        </SearchWrapper>
    );
}

export default CommandSearch;
