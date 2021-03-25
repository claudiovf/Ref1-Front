import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Driver } from '../../types';
import { BackHome, ProfileContainer, Spacer, StyledLink } from '../LayoutComponents';
import Spinner from '../Common/Spinner';

import StatSection from './StatSection/StatSection';
import GeneralInfo from './GeneralInfo';

import { DRIVER_PROFILE } from '../../queries';
import Achievements from './Achievements';


const DriverProfile: React.FC = () => {
    const [ driver, setDriver ] = useState<Driver | null>(null);
    

    const { driverId } = useParams<{ driverId: string }>();
    const { loading, data } = useQuery<{ findDriver: Driver }>(DRIVER_PROFILE,
          { variables: { driverId } });
    
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
                    <BackHome>
                        &larr; {driver.givenName} {driver.familyName}
                    </BackHome>
                </StyledLink>

                <GeneralInfo driver={driver} />
                <Achievements driver={driver} />
                <StatSection 
                    driver={driver} />
            </ProfileContainer>
        </React.Fragment>
    );
};

export default DriverProfile;