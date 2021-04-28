import React, { useState } from 'react';
import { SelectionButton } from '../LayoutComponents';
import styled from 'styled-components';
import CurrentDriversPanel from '../CurrentDriversPanel';
import CurrentTeamsPanel from '../CurrentTeamsPanel';
import ExploreDrivers from '../ExploreDrivers';
import ExploreTeams from '../ExploreTeams';
import LegendsPanel from '../LegendsPanel';
import SkySportsPanel from '../SkySportsPanel';
import Standings from '../Standings';

const OptionsWrap = styled.div`
    width: auto;
    height: auto;
    display: flex;
    flex-direction: row nowrap;
    justify-content: flex-start;
    align-items: center;
    margin: 3rem 0 1rem 0; 
`;

const DesktopSwitch: React.FC = () => {
    const [selected, setSelected] = useState<string>("2021 Drivers");

    const viewOptions = [
        "2021 Drivers", "2021 Teams", "Standings", "Explore", "Legends", "Sky Sports Team"
    ];

    const handleSelection = (option: string) => {
        if(option !== selected) {
            setSelected(option);
        }
    };

    const displayContentFor = (selected: string) => {
        if (selected === "2021 Drivers") return <CurrentDriversPanel />;
        else if (selected === "2021 Teams") return <CurrentTeamsPanel />;
        else if (selected === "Standings") return <Standings />;
        else if (selected === "Explore") return <><ExploreDrivers /><ExploreTeams /> </>;
        else if (selected === "Legends") return <LegendsPanel />;
        else return <SkySportsPanel />;
    };

  return (
    <React.Fragment>
        <OptionsWrap>
            {viewOptions.map(option => 
                <SelectionButton
                    key={option}
                    color={option === selected ? "#FFF" : "#828282"}
                    bg={option === selected ? "#00c49a" : "rgb(0,0,0,0)"}
                    border={"rgb(0,0,0,0)"}
                    selected={option === selected ? true : false}
                    onClick={() => handleSelection(option)}
                >
                    {option}
                </SelectionButton>    
            )}
        </OptionsWrap>
        {displayContentFor(selected)}
    </React.Fragment>
  );
};

export default DesktopSwitch;