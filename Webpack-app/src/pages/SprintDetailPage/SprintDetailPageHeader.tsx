import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Icon from "../../design_system/Icon";

interface SprintDetailPageHeaderProps {
    sprintName: string;
}

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-bottom: 1px solid var(--section-background);
    background-color: var(--white);
`;

const BackButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 6px;

    &:hover {
        background-color: var(--section-background);
    }
`;

const Breadcrumb = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-secondary);
`;

const BreadcrumbLink = styled.span`
    cursor: pointer;

    &:hover {
        color: var(--text-primary);
        text-decoration: underline;
    }
`;

const Separator = styled.span`
    color: var(--text-secondary);
`;

const SprintId = styled.span`
    color: var(--text-primary);
    font-weight: 500;
`;

function SprintDetailPageHeader({
    sprintName,
}: Readonly<SprintDetailPageHeaderProps>) {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/home/sprints");
    };

    return (
        <HeaderContainer>
            <BackButton onClick={handleBack}>
                <Icon name="ArrowLeft" size={20} color="var(--text-primary)" weight="regular" />
            </BackButton>
            <Breadcrumb>
                <BreadcrumbLink onClick={handleBack}>Sprints</BreadcrumbLink>
                <Separator>/</Separator>
                <SprintId>{sprintName}</SprintId>
            </Breadcrumb>
        </HeaderContainer>
    );
}

export default SprintDetailPageHeader;
