import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setDistance, setTimeFormat } from '../../store/SettingsStore/actions';
import { SelectionButton, Title } from '../LayoutComponents';

const OptionContainer = styled.div`
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 0.5rem;
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
    font-size: 1rem;
    margin-bottom: 0.25rem;
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
        }
    };
 

    return (
        <React.Fragment>
            <OptionContainer>
                <OptionTitle>{title}</OptionTitle>
                <OptionsWrap>
                    {
                        [defaultFormat, altFormat].map(format => 
                            <SelectionButton
                                key={format}
                                color={format === selected ? "#FFF" : "#828282"}
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
