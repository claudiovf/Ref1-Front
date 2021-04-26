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
import RaceInfo from './RaceInfo';
import PreviousResults from './PreviousResults/PreviousResults';

const ProfileBody = styled(ProfileWrap)`
    background-color: #FFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    overflow: hidden;
    @media (min-width: 960px) {
        width: 80%;
        margin: 0 10% 0 10%;
      }
`;

const RaceName = styled.div`
    font-family: "Work Sans Semi Bold";
    color: #828282;
    font-size: 0.75rem;
    margin: 0 1rem 1rem 1rem;
    
`;

const CircuitName = styled.div`
    font-family: "Work Sans Semi Bold";
    color: #2f2f2f;
    font-size: 1rem;
    margin: 1rem 1rem 0 1rem;
    white-space: nowrap;
`;

const Local = styled.div`
    font-family: "Work Sans Bold";
    font-size: 1rem;
    color: #00c49a;
    white-space: nowrap;
`;

const ProfileGP = styled(ProfileName)`
    padding: 2rem 0 0 0;

`;

const CircuitProfile: React.FC = () => {
    const [ circuit, setCircuit ] = useState<CircuitType | null>(null);
    

    const { circuitId } = useParams<{ circuitId: string }>();
    const { loading, data } = useQuery<{ findCircuit: CircuitType }>(CIRCUIT_PROFILE, {
        fetchPolicy: "cache-and-network", 
        variables: { circuitId } 
    });
    
    useEffect(() => {
        if ( data ) {
            setCircuit(data.findCircuit);
        }
    }, [data]);

    
    if ( loading ) return <> <Spacer /><Spinner /> </>;

    if ( !circuit) return null;
    
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
                    <CircuitName>{circuit.circuitName}</CircuitName>
                    <Local>{circuit.location?.locality}, {circuit.location?.country}</Local>
                    
                    <EventSchedule 
                        scheduleTrack={circuit.scheduleTrack}
                        scheduleUTC={circuit.scheduleUTC}    
                    />
                    <RaceInfo 
                        circuit={circuit}
                    />
                    <PreviousResults circuitId={circuit.circuitId}/>
                </ProfileBody>
            </ProfileContainer>
        </React.Fragment>
    );
};

export default CircuitProfile;