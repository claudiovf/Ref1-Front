import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store';
import { SettingsState } from '../../store/SettingsStore/settingsTypes';

const DonateContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 0 0 0.5rem 0;
    width:100%;
`;
const DonateTitle = styled.div<{ darkMode: boolean }>`
    font-family: "Work Sans Bold";
    color: ${props => props.darkMode ? "rgb(255,255,255,0.9)" : "#2f2f2f"};
    font-size: 0.75rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0rem 0 0.25rem 0;
    width:100%;
`;
const HiringTitle = styled(DonateTitle)`
    margin: 1rem 0 0.25rem 0;
`;
const DonateText = styled.div<{ darkMode: boolean }>`
    font-family: "Work Sans Reg";
    color: ${props => props.darkMode ? "rgb(255,255,255,0.7)" : "#2f2f2f"};
    font-size: 0.75rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 0 0.75rem 0.5rem 0.75rem;
    width: auto;
`;


const Donate: React.FC = () => {
    const settings: SettingsState = useSelector((state: RootState) => state.settings);

    return (
        <React.Fragment>
            <DonateContainer>
                <DonateTitle darkMode={settings.isDarkMode}>
                    Like it so far? Show us some love<span role="img" aria-label="love">❤️</span>
                </DonateTitle>
                <DonateText darkMode={settings.isDarkMode}>
                    Ref1 App is free to use. 
                    Help us maintain and improve the app by contributing to the running costs.
                </DonateText>
                <form action="https://www.paypal.com/donate" method="post" target="_blank">
                    <input type="hidden" name="business" value="contact.ref1app@gmail.com" />
                    <input type="hidden" name="currency_code" value="AUD" />
                    <input type="image" src="https://www.paypalobjects.com/en_AU/i/btn/btn_donate_SM.gif" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                    <img alt="" src="https://www.paypal.com/en_AU/i/scr/pixel.gif" width="1" height="1" />
                </form>
                {
                    window.innerHeight > 568
                    ? <>
                        <HiringTitle darkMode={settings.isDarkMode}>
                            Are you hiring?
                        </HiringTitle>
                        <DonateText darkMode={settings.isDarkMode}>
                            We would love to hear from you about development opportunities.  
                            Get in touch at contact@ref1.app :)
                        </DonateText>  
                    </>
                    : null
                }
            </DonateContainer>
        </React.Fragment>
    );
};

export default Donate;