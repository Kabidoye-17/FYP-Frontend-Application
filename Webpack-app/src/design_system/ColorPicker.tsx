import styled from "styled-components";

interface ColorPickerProps {
    colors: readonly string[];
    selectedColor: string;
    onChange: (color: string) => void;
}

const ColorSwatchGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 32px);
    gap: 0.75rem;
`;

const ColorSwatch = styled.button<{ $color: string; $isSelected: boolean }>`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${({ $color }) => $color};
    border: 3px solid ${({ $isSelected }) =>
        $isSelected ? 'var(--text-primary)' : 'transparent'};
    cursor: pointer;
    transition: transform 0.15s ease, border-color 0.15s ease;

    &:hover {
        transform: scale(1.1);
    }

    &:focus {
        outline: 2px solid var(--plum);
        outline-offset: 2px;
    }
`;

function ColorPicker({ colors, selectedColor, onChange }: Readonly<ColorPickerProps>) {
    return (
        <ColorSwatchGrid>
            {colors.map((color) => (
                <ColorSwatch
                    key={color}
                    $color={color}
                    $isSelected={color === selectedColor}
                    onClick={() => onChange(color)}
                    type="button"
                    aria-label={`Select color ${color}`}
                />
            ))}
        </ColorSwatchGrid>
    );
}

export default ColorPicker;
