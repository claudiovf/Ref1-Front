import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store';
import { setDistance, setTimeFormat, setDarkMode } from '../../store/SettingsStore/actions';
import { SettingsState } from '../../store/SettingsStore/settingsTypes';
import { SelectionButton, Title } from '../LayoutComponents';

const OptionContainer = styled.div`
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 0.25rem;
    
    @media (min-width: 768px) {
        margin-bottom: 1rem;
    }
`;
const OptionsWrap = styled.div`
    width: auto;
    height: auto;
    display: flex;
    flex-direction: row nowrap;
    justify-content: flex-start;
    align-items: center;
`;

const OptionTitle = styled(Title)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 1rem;
    margin-bottom: 0.25rem;

    @media (min-width: 768px) {
        margin-bottom: -0.5rem;
    }
`;

const NewNotif = styled.span`
  background-color: #ff425c;
  font-family: "Work Sans Semi Bold";
  color: #FFF;
  font-size: 10px;
  padding: 0.15rem;
  border-radius: 5px;
  margin: -1rem -2rem 0 0;
  z-index: 2000;
`;

interface Props {
    defaultFormat: string;
    altFormat: string;
    title: string;
    storageKey: string;
}

const FormatSelection: React.FC<Props> = ({altFormat, title, defaultFormat, storageKey}: Props) => {
    const [selected, setSelected] = useState<string>(localStorage.getItem(storageKey) || defaultFormat);
    const dispatch = useDispatch();
    const settings: SettingsState = useSelector((state: RootState) => state.settings);

    useEffect(() => {

        if (selected === defaultFormat) {
            localStorage.removeItem(storageKey);

            if (storageKey === 'distUnit') {
                dispatch (setDistance('k'));
            }
            if (storageKey === 'timeFormat') {
                dispatch (setTimeFormat('24hour'));
            }
        } else if (selected === altFormat) {
            localStorage.setItem(storageKey, selected);

            if (storageKey === 'distUnit') {
                dispatch (setDistance('m'));
            }
            if (storageKey === 'timeFormat') {
                dispatch (setTimeFormat('ampm'));
            }
        }

    }, [selected]);

    const handleSelection = (format: string) => {
        if(format !== selected) {
            setSelected(format);
            
            if (storageKey === 'darkMode') {
                dispatch (setDarkMode());
            }
        }
    };
 

    return (
        <React.Fragment>
            <OptionContainer>
                <OptionTitle darkMode={settings.isDarkMode}>
                    {title}{storageKey === 'darkMode' ? <NewNotif>NEW</NewNotif> : null}
                </OptionTitle>
                <OptionsWrap>
                    {
                        [defaultFormat, altFormat].map(format => 
                            <SelectionButton
                                key={format}
                                color={format === selected ? "#FFF" : "#a2a2a2"}
                                bg={format === selected ? "#00c49a" : "rgb(0,0,0,0)"}
                                border={"rgb(0,0,0,0)"}
                                selected={format === selected ? true : false}
                                onClick={() => handleSelection(format)}
                            >{format}</SelectionButton>    
                        )
                    }
                </OptionsWrap>
            </OptionContainer>
        </React.Fragment>
    );
};

export default FormatSelection;
