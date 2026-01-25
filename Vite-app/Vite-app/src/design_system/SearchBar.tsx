import styled from "styled-components";
import Icon from "./Icon";

type SearchBarSize = "default" | "compact";

interface SearchBarProps {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    size?: SearchBarSize;
}

const Container = styled.div<{ $size: SearchBarSize }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    background-color: var(--white);
    border: 1px solid var(--section-background);
    border-radius: 6px;
    padding: ${(props) => (props.$size === "compact" ? "0.5rem 0.75rem" : "0.625rem 1rem")};
    height: ${(props) => (props.$size === "compact" ? "2.5rem" : "3rem")};
    box-sizing: border-box;
`;

const Input = styled.input`
    all: unset;
    flex: 1;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-primary);

    &::placeholder {
        color: var(--text-secondary);
        opacity: 0.7;
    }
`;

function SearchBar({ placeholder = "Search...", value, onChange, size = "default" }: Readonly<SearchBarProps>) {
    const iconSize = size === "compact" ? 16 : 20;

    return (
        <Container $size={size}>
            <Icon
                name="MagnifyingGlass"
                size={iconSize}
                color="var(--text-secondary)"
                weight="regular"
            />
            <Input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </Container>
    );
}

export default SearchBar;
