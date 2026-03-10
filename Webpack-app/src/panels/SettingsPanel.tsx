import styled from 'styled-components'
import Icon from '../design_system/Icon';
import * as Switch from '../design_system/Switch';
import * as Popover from '../design_system/Popover';
import SelectionButton from '../design_system/SelectionButton';
import * as PanelItem from "./SettingsPanelItem";
import { useLocalStorage } from '../hooks';

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
`;

const HeadingBottomItemContainer = styled(HeadingTopItemContainer)`
    border-radius: 0px 0px 15px 15px;
`;


const LeftContainer = styled.div`
    height: 60px;
    width: 100%;
    font-family: "Inter", sans-serif;
    font-weight: 600;
    font-size: 1.25rem;
    color: var(--plum);
    display: flex;
    align-items: center;
    padding-left: 2rem;
    flex-direction: row;
`;


const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 15px;
`;

function SettingsPanel () {
    // useLocalStorage automatically syncs state with localStorage
    const [defaultView, setDefaultView] = useLocalStorage<string>('defaultHomeView', 'projects');

    // Convert stored value to display value
    const displayView = defaultView === 'issues' ? 'Issues' : 'Projects';

    const handleViewChange = (view: string) => {
        setDefaultView(view.toLowerCase());
    };

    return (
    <PanelContainer>
        <HeadingTopItemContainer>
            <LeftContainer>
                General
            </LeftContainer>
            <IconContainer>
                <Icon name="Gear" size={32} color="var(--plum)" weight='regular' />
            </IconContainer>
        </HeadingTopItemContainer>

        {/* actual panel items*/}
        <PanelItem.ItemContainer>
            <PanelItem.ItemTopContainer>
                Default Home View
            </PanelItem.ItemTopContainer>
            <PanelItem.ItemBottomContainer>
                <PanelItem.ItemLeftBottomContainer>
                    Which view opened when you open Planora
                </PanelItem.ItemLeftBottomContainer>
                <PanelItem.ItemRightBottomContainer>
                    <Popover.Root>
                        <Popover.Trigger asChild>
                            <SelectionButton value={displayView} backgroundColor="var(--white)" />
                        </Popover.Trigger>
                        <Popover.Portal>
                            <Popover.Content $backgroundColor="var(--white)">
                                <Popover.Item onClick={() => handleViewChange('Issues')}>
                                    Issues
                                </Popover.Item>
                                <Popover.Item onClick={() => handleViewChange('Projects')}>
                                    Projects
                                </Popover.Item>
                                <Popover.Arrow $backgroundColor="var(--white)" />
                            </Popover.Content>
                        </Popover.Portal>
                    </Popover.Root>
                </PanelItem.ItemRightBottomContainer>
            </PanelItem.ItemBottomContainer>
        </PanelItem.ItemContainer>

         <PanelItem.ItemContainer>
            <PanelItem.ItemTopContainer>
                Display Full Names
            </PanelItem.ItemTopContainer>
            <PanelItem.ItemBottomContainer>
                <PanelItem.ItemLeftBottomContainer>
                    Show full names of users instead of shorter usernames
                </PanelItem.ItemLeftBottomContainer>
                <PanelItem.ItemRightBottomContainer>
                    <Switch.Root>
                        <Switch.Thumb></Switch.Thumb>
                    </Switch.Root>
                </PanelItem.ItemRightBottomContainer>
            </PanelItem.ItemBottomContainer>
        </PanelItem.ItemContainer>

        {/* end of actual panel items */}

        <HeadingBottomItemContainer>
            <LeftContainer>
                Collapse
            </LeftContainer>
            <IconContainer>
                <Icon name="ArrowUp" size={32} color="var(--plum)" weight='regular' />
            </IconContainer>
        </HeadingBottomItemContainer>
        
    </PanelContainer>
    );

}

export default SettingsPanel;