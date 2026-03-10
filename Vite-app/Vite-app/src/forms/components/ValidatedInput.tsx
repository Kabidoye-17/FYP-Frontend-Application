import { forwardRef } from "react";
import styled from "styled-components";
import Icon from "../../design_system/Icon";
import type * as PhosphorIcons from "@phosphor-icons/react";

type IconName = keyof typeof PhosphorIcons;

interface ValidatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean;
    leftIcon?: string;
}

const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const LeftIconWrapper = styled.div`
    position: absolute;
    left: 0.75rem;
    display: flex;
    align-items: center;
    pointer-events: none;
`;

const StyledInput = styled.input<{ $hasError: boolean; $hasLeftIcon: boolean }>`
    width: 100%;
    padding: 0.625rem 0.75rem;
    padding-left: ${({ $hasLeftIcon }) => ($hasLeftIcon ? "2.5rem" : "0.75rem")};
    border: 1px solid ${({ $hasError }) => ($hasError ? "var(--error)" : "var(--border-color)")};
    border-radius: 8px;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-primary);
    background-color: var(--white);
    transition: border-color 0.15s ease, box-shadow 0.15s ease;

    &:focus {
        outline: none;
        border-color: ${({ $hasError }) => ($hasError ? "var(--error)" : "var(--purple)")};
        box-shadow: 0 0 0 3px
            ${({ $hasError }) => ($hasError ? "var(--error-light)" : "var(--purple-light)")};
    }

    &::placeholder {
        color: var(--text-tertiary);
    }

    &:disabled {
        background-color: var(--section-background);
        cursor: not-allowed;
    }
`;

const ValidatedInput = forwardRef<HTMLInputElement, ValidatedInputProps>(
    ({ hasError = false, leftIcon, ...props }, ref) => {
        return (
            <InputWrapper>
                {leftIcon && (
                    <LeftIconWrapper>
                        <Icon
                            name={leftIcon as IconName}
                            size={16}
                            color={hasError ? "var(--error)" : "var(--text-secondary)"}
                            weight="regular"
                        />
                    </LeftIconWrapper>
                )}
                <StyledInput
                    ref={ref}
                    $hasError={hasError}
                    $hasLeftIcon={!!leftIcon}
                    {...props}
                />
            </InputWrapper>
        );
    }
);

ValidatedInput.displayName = "ValidatedInput";

export default ValidatedInput;
