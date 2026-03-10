import styled from "styled-components";

interface InviteTeamMemberModalBodyProps {
    email: string;
    onEmailChange: (email: string) => void;
    role: string;
    onRoleChange: (role: string) => void;
}

const Body = styled.div`
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
`;

const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
`;

const Label = styled.label`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--text-secondary);
`;

const Input = styled.input`
    padding: 0.625rem 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-primary);
    transition: border-color 0.15s ease, box-shadow 0.15s ease;

    &:focus {
        outline: none;
        border-color: var(--purple);
        box-shadow: 0 0 0 3px var(--purple-light);
    }

    &::placeholder {
        color: var(--text-tertiary);
    }
`;

const Select = styled.select`
    padding: 0.625rem 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-primary);
    background-color: var(--white);
    cursor: pointer;

    &:focus {
        outline: none;
        border-color: var(--purple);
        box-shadow: 0 0 0 3px var(--purple-light);
    }
`;

const Hint = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-tertiary);
    margin: 0.25rem 0 0 0;
`;

const ROLES = [
    { value: "member", label: "Team Member" },
    { value: "lead", label: "Team Lead" },
    { value: "admin", label: "Admin" },
    { value: "viewer", label: "Viewer (Read-only)" },
];

function InviteTeamMemberModalBody({
    email,
    onEmailChange,
    role,
    onRoleChange,
}: Readonly<InviteTeamMemberModalBodyProps>) {
    return (
        <Body>
            <Field>
                <Label htmlFor="invite-email">Email address</Label>
                <Input
                    id="invite-email"
                    type="email"
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                    placeholder="colleague@company.com"
                    autoFocus
                />
                <Hint>They'll receive an email invitation to join your workspace.</Hint>
            </Field>
            <Field>
                <Label htmlFor="invite-role">Role</Label>
                <Select
                    id="invite-role"
                    value={role}
                    onChange={(e) => onRoleChange(e.target.value)}
                >
                    {ROLES.map((r) => (
                        <option key={r.value} value={r.value}>
                            {r.label}
                        </option>
                    ))}
                </Select>
            </Field>
        </Body>
    );
}

export default InviteTeamMemberModalBody;
