import React from 'react';
import styled from 'styled-components';
import { Driver } from '../../types';
import { getDriverStyle } from '../../utils/currentInfo';
import { formattedDate } from '../../utils/formatting';
import { InfoBox, InfoRow, Label, Value } from '../LayoutComponents';

const GenContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: flex-start;
    min-height: auto;
    padding: 0.5rem;

    @media (min-width: 768px) {
        max-width: 30rem;
        padding: 3rem 0 3rem 3rem;
      }
`;


const ChampValue = styled(Value)`
    font-size: 2rem;
`;




const GeneralInfo: React.FC<{ driver: Driver; }> = ( {driver}: { driver: Driver } ) => {
    const driverStyle = getDriverStyle(driver.driverId);

    return (
        <React.Fragment>
            <GenContainer>
                <InfoRow>
                    <InfoBox>
                        <Value>{driver.nationality}</Value>
                        <Label>Nationality</Label>
                    </InfoBox>
                    <InfoBox>
                        <Value>{formattedDate(driver.dateOfBirth)}</Value>
                        <Label>Born</Label>
                    </InfoBox>
                </InfoRow>
                <InfoRow>
                    <InfoBox>
                        <ChampValue>{driver.championships.length}</ChampValue>
                        <Label>Championships</Label>
                    </InfoBox>
                </InfoRow>
                { driverStyle.team !== 'NA' 
                ? <InfoRow>
                    <InfoBox>
                        <Value>{driverStyle.team}</Value>
                        <Label>Current Team</Label>
                    </InfoBox>
                </InfoRow>
                : null }
            </GenContainer>
        </React.Fragment>
    );
};

export default GeneralInfo;