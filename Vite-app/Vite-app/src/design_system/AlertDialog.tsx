import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import styled from "styled-components";

const StyledOverlay = styled(RadixAlertDialog.Overlay)`
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
    position: fixed;
    inset: 0;
    z-index: 300;
    animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

    @keyframes overlayShow {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const StyledContent = styled(RadixAlertDialog.Content)`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 420px;
    background-color: var(--white);
    border-radius: 12px;
    box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
        0px 10px 20px -15px rgba(22, 23, 24, 0.2);
    z-index: 301;
    padding: 1.5rem;
    animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

    @keyframes contentShow {
        from {
            opacity: 0;
            transform: translate(-50%, -48%) scale(0.96);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }

    &:focus {
        outline: none;
    }
`;

const StyledTitle = styled(RadixAlertDialog.Title)`
    font-family: "Inter", sans-serif;
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 0.5rem 0;
`;

const StyledDescription = styled(RadixAlertDialog.Description)`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-secondary);
    line-height: 1.5;
    margin: 0 0 1.5rem 0;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
`;

const CancelButton = styled(RadixAlertDialog.Cancel)`
    all: unset;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.625rem 1rem;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 8px;
    background-color: var(--section-background);
    color: var(--text-primary);
    cursor: pointer;
    transition: background-color 0.15s ease;

    &:hover {
        background-color: var(--light-plum);
    }

    &:focus-visible {
        outline: 2px solid var(--plum);
        outline-offset: 2px;
    }
`;

const ActionButton = styled(RadixAlertDialog.Action)<{ $variant?: "danger" | "primary" }>`
    all: unset;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.625rem 1rem;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 8px;
    background-color: ${({ $variant }) =>
        $variant === "danger" ? "var(--error-red)" : "var(--plum)"};
    color: var(--white);
    cursor: pointer;
    transition: opacity 0.15s ease;

    &:hover {
        opacity: 0.9;
    }

    &:focus-visible {
        outline: 2px solid var(--plum);
        outline-offset: 2px;
    }
`;

export const Root = RadixAlertDialog.Root;
export const Trigger = RadixAlertDialog.Trigger;
export const Portal = RadixAlertDialog.Portal;
export const Overlay = StyledOverlay;
export const Content = StyledContent;
export const Title = StyledTitle;
export const Description = StyledDescription;
export const Cancel = CancelButton;
export const Action = ActionButton;
export { ButtonGroup };
