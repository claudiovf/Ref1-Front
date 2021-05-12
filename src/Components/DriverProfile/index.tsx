import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Driver } from '../../types';
import { BackHome, ProfileContainer, 
        Spacer, StyledLink, GenAchContainer, 
        ProfileName, ProfileWrap, H1 } from '../LayoutComponents';
import Spinner from '../Common/Spinner';

import StatSection from './StatSection/StatSection';
import GeneralInfo from './GeneralInfo';

import { DRIVER_PROFILE } from '../../queries';
import Achievements from './Achievements';
import { getDriverStyle, invertStyle } from '../../utils/currentInfo';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SettingsState } from '../../store/SettingsStore/settingsTypes';
import styled from 'styled-components';

const DriverProfileWrap = styled(ProfileWrap)<{bg: string}>`
    background-color: ${props => props.bg}
`;


const DriverProfile: React.FC = () => {
    const [ driver, setDriver ] = useState<Driver | null>(null);
    
    const settings: SettingsState = useSelector((state: RootState) => state.settings);

    const { driverId } = useParams<{ driverId: string }>();
    const { loading, data } = useQuery<{ findDriver: Driver }>(DRIVER_PROFILE, { 
        fetchPolicy: "cache-and-network",
        variables: { driverId }
    });
    
    useEffect(() => {
        if ( data ) {
            setDriver(data.findDriver);
        }
    }, [data]);

    
    if ( loading ) return <> <Spacer /><Spinner /> </>;

    if ( !driver ) return null;

    
    return (
        <React.Fragment>
            <ProfileContainer>
                <StyledLink to="/">
                    <BackHome darkMode={settings.isDarkMode}>
                        &larr; {driver.givenName} {driver.familyName}
                    </BackHome>
                </StyledLink>
                <Spacer />
                <DriverProfileWrap bg={invertStyle(settings.isDarkMode, getDriverStyle(driver.driverId)).primary }>
                    <ProfileName 
                        color={invertStyle(settings.isDarkMode, getDriverStyle(driver.driverId)).secondary}
                    >
                        <H1>{[driver.givenName, driver.familyName].join(" ").toUpperCase()}</H1>
                    </ProfileName>
                    <GenAchContainer>
                        <GeneralInfo driver={driver} />
                        <Achievements driver={driver} />
                    </GenAchContainer>
                    <StatSection 
                        driver={driver} />
                </DriverProfileWrap>
            </ProfileContainer>
        </React.Fragment>
    );
};

export default DriverProfile;