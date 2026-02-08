import styled from "styled-components";
import ColorPicker from "../../design_system/ColorPicker";
import { LABEL_COLORS } from "../../utils/labelData";

interface CreateLabelFormData {
    name: string;
    color: string;
}

interface CreateLabelModalBodyProps {
    formData: CreateLabelFormData;
    onChange: (field: keyof CreateLabelFormData, value: string) => void;
}

const BodyContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
    background-color: var(--white);
`;

const FormField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Label = styled.label`
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-secondary);
`;

const NameInput = styled.input`
    width: 100%;
    border: 1px solid var(--section-background);
    background: var(--white);
    color: var(--text-primary);
    font-family: 'Inter', sans-serif;
    font-size: 0.9375rem;
    padding: 0.625rem 0.75rem;
    border-radius: 6px;
    outline: none;
    box-sizing: border-box;

    &:focus {
        border-color: var(--plum);
    }

    &::placeholder {
        color: var(--text-secondary);
        opacity: 0.5;
    }
`;

function CreateLabelModalBody({ formData, onChange }: Readonly<CreateLabelModalBodyProps>) {
    return (
        <BodyContainer>
            <FormField>
                <Label htmlFor="label-name">Name</Label>
                <NameInput
                    id="label-name"
                    type="text"
                    placeholder="Label name"
                    value={formData.name}
                    onChange={(e) => onChange("name", e.target.value)}
                    autoFocus
                />
            </FormField>
            <FormField>
                <Label>Color</Label>
                <ColorPicker
                    colors={LABEL_COLORS}
                    selectedColor={formData.color}
                    onChange={(color) => onChange("color", color)}
                />
            </FormField>
        </BodyContainer>
    );
}

export default CreateLabelModalBody;
