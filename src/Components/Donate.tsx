import React from 'react';
import styled from 'styled-components';

const DonateContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 0 0 0.5rem 0;
    width:100%;
`;
const DonateTitle = styled.div`
    font-family: "Work Sans Bold";
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
const DonateText = styled.div`
    font-family: "Work Sans Reg";
    font-size: 0.75rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 0 0.75rem 0.5rem 0.75rem;
    width: auto;
`;


const Donate: React.FC = () => {
    return (
        <React.Fragment>
            <DonateContainer>
                <DonateTitle>
                    Like it so far? Show us some love<span role="img" aria-label="love">❤️</span>
                </DonateTitle>
                <DonateText>
                    Ref1 App is free to use. 
                    Help us maintain and improve the app by contributing to the running costs.
                </DonateText>
                <form action="https://www.paypal.com/donate" method="post" target="_blank">
                    <input type="hidden" name="business" value="contact.ref1app@gmail.com" />
                    <input type="hidden" name="currency_code" value="AUD" />
                    <input type="image" src="https://www.paypalobjects.com/en_AU/i/btn/btn_donate_SM.gif" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                    <img alt="" src="https://www.paypal.com/en_AU/i/scr/pixel.gif" width="1" height="1" />
                </form>
                <HiringTitle>
                    Are you hiring?
                </HiringTitle>
                <DonateText>
                    We would love to hear from you about web development opportunities.  
                    Get in touch at contact.ref1app@gmail.com :)
                </DonateText>
            </DonateContainer>
        </React.Fragment>
    );
};

export default Donate;