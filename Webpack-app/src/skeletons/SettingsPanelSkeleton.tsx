import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";

const PanelContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const HeadingTopItemContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 40rem;
    background-color: white;
    border: 1px solid var(--text-secondary);
    border-radius: 15px 15px 0px 0px;
    padding: 1rem 2rem;
    height: 60px;
`;

const HeadingBottomItemContainer = styled(HeadingTopItemContainer)`
    border-radius: 0px 0px 15px 15px;
`;

const ItemContainer = styled.div`
    width: 40rem;
    height: 70px;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 0.2em;
    padding-left: 2em;
    padding-right: 2em;
    padding-top: 0.6em;
    border: 1px solid var(--text-secondary);
`;

const ItemTopContainer = styled.div`
    margin-bottom: 0.3em;
`;

const ItemBottomContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

function SettingsPanelSkeleton() {
    return (
        <PanelContainer>
            <HeadingTopItemContainer>
                <Skeleton width={100} height={24} />
            </HeadingTopItemContainer>

            {/* Settings Items */}
            <ItemContainer>
                <ItemTopContainer>
                    <Skeleton width={150} height={16} />
                </ItemTopContainer>
                <ItemBottomContainer>
                    <Skeleton width={300} height={12} />
                </ItemBottomContainer>
            </ItemContainer>

            <ItemContainer>
                <ItemTopContainer>
                    <Skeleton width={180} height={16} />
                </ItemTopContainer>
                <ItemBottomContainer>
                    <Skeleton width={250} height={12} />
                    <Skeleton width={42} height={25} borderRadius={9999} />
                </ItemBottomContainer>
            </ItemContainer>

            <HeadingBottomItemContainer>
                <Skeleton width={80} height={24} />
            </HeadingBottomItemContainer>
        </PanelContainer>
    );
}

export default SettingsPanelSkeleton;
