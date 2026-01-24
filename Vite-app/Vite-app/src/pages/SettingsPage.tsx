import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Heading from '../design_system/Heading';
import SettingsPanel from '../panels/SettingsPanel';
import SettingsPanelSkeleton from '../skeletons/SettingsPanelSkeleton';
import FeatureNavBar from '../navigation/FeatureNavBar';

const PageContainer = styled.div`
  background-color: var(--light-plum);  
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  `;

const HeadingContainer = styled.div`

    width: 100%;
    display: flex;
    align-items: end;
    justify-content: flex-start;
    padding-left: 15rem;
    padding-top: 8rem;
`;

const BodyContainer = styled.div`
    width: 100%;
    display: flex;
    padding-top: 3em;
    align-items: flex-start;
    height: 100%;
    justify-content: center;
`;
function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PageContainer>
        <FeatureNavBar navigatePath="/home" />
        <HeadingContainer>
        <Heading colour='white'>Preferences</Heading>
        </HeadingContainer>
        <BodyContainer>
            {isLoading ? <SettingsPanelSkeleton /> : <SettingsPanel/>}
        </BodyContainer>
    </PageContainer>
  );
}

export default SettingsPage;