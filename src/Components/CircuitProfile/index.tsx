import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { CircuitType } from '../../types';
import { BackHome, ProfileContainer, 
        Spacer, StyledLink, 
        ProfileName, ProfileWrap } from '../LayoutComponents';
import Spinner from '../Common/Spinner';

import { CIRCUIT_PROFILE } from '../../queries';
import { getGP } from '../../utils/formatting';
import styled from 'styled-components';
import EventSchedule from './EventSchedule';

const ProfileBody = styled(ProfileWrap)`
    background-color: #FFF;
    @media (min-width: 768px) {
        justify-content: center;
        align-items: center;
    }
`;

const RaceName = styled.div`
    font-family: "Work Sans Semi Bold";
    color: #828282;
    font-size: 0.75rem;
    margin: 0 1rem 1rem 1rem;
    
`;

const ProfileGP = styled(ProfileName)`
    padding: 2.5rem 0 0 0;

`;

const CircuitProfile: React.FC = () => {
    const [ circuit, setCircuit ] = useState<CircuitType | null>(null);
    

    const { circuitId } = useParams<{ circuitId: string }>();
    const { loading, data } = useQuery<{ findCircuit: CircuitType }>(CIRCUIT_PROFILE,
          { variables: { circuitId } });
    
    useEffect(() => {
        if ( data ) {
            setCircuit(data.findCircuit);
        }
    }, [data]);

    
    if ( loading ) return <> <Spacer /><Spinner /> </>;

    if ( !circuit ) return null;
    
    return (
        <React.Fragment>
            <ProfileContainer>
                <StyledLink to="/">
                    <BackHome>
                        &larr; {getGP(circuit.circuitId)} Grand Prix
                    </BackHome>
                </StyledLink>
                <Spacer />
                <ProfileBody>
                    <ProfileGP color={"#00c49a"} bg={"none"}>
                        {getGP(circuit.circuitId).toUpperCase()} GP</ProfileGP>
                    <RaceName>{circuit.raceName}</RaceName>
                    
                    <EventSchedule 
                        scheduleTrack={circuit.scheduleTrack}
                        scheduleUTC={circuit.scheduleUTC}    
                    />
                </ProfileBody>
            </ProfileContainer>
        </React.Fragment>
    );
};

export default CircuitProfile;