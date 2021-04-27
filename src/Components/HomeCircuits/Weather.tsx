import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Location, Schedule } from '../../types';
import { getSessionInfo, handleCountdown } from '../../utils/formatting';

const WeatherContainer = styled.div`
    display: flex;
    display-direction: row;
    justify-content: center;
    align-items: top;
    height: auto;
    width: auto;
    max-width: 90%;
    margin: 0.5rem 0 1.5rem 0;
    border-radius: 0.5rem;
    background-color: rgb(255, 255, 255, 0.1);

    @media (min-width: 768px) {
        width: 80%;
        max-width: 36rem;
        justify-content: left;
      }
`;

const IconTextWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 6rem;
    min-height: 100%;
    background-color: #0b3142;
    margin: 2px;
    border-radius: 0.5rem;

   @media (min-width: 768px) {
        width: 10rem;
  }
`;
const MeasuresWrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;

    @media (min-width: 768px) {
        width: 20rem;
  }
`;

const MeasureBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    margin: 0.5rem 0.5rem 0.5rem 0;
    font-family: "Work Sans Bold";
    color: white;

    @media (min-width: 768px) {
        flex-grow: 2;
        align-items: center;
    }
`;

const MeasureRow = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    margin: 0.5rem 0.125rem;
    font-family: "Work Sans Bold";
    color: white;
    width: 3.75rem;
`;

const Value = styled.div`
    font-size: 1rem;
    font-family: "Work Sans Bold";
    color: white;
    @media (min-width: 768px) {
        font-size: 1.5rem;
    }

`;
const Unit = styled.span`
    font-family: "Work Sans Semi Bold";
    color: #FFFFFF;
    font-size: 0.75rem;
    min-height: 100%;
`;

const WeatherTitle = styled.div`
    font-size: 0.5rem;
    margin: 0.25rem;
    font-family: "Work Sans Bold";
    color: white;
    @media (min-width: 768px) {
        font-size: 0.75rem;
    }
`;
const Description = styled.span`
    font-size: 0.5rem;
    margin: 0.25rem 0;
    justify-content: bottom;
    font-family: "Work Sans Semi Bold";
    color: white;
    @media (min-width: 768px) {
        font-size: 0.75rem;
    }
`;

const Notif = styled.div`
    font-family: "Work Sans Semi Bold";
    color: #FFF;
    font-size: 0.5rem;
    margin: 0.5rem 0;
`;


interface Weather {
    chance_of_rain: string;
    temp_c: number;
    temp_f: number;
    wind_k: number;
    wind_m: number;
    wind_dir: string;
    condition_text: string;
    icon: string;
    locality: string;
    session: string;
}

interface Props {
    nextRaceLoc: Location;
    raceTime: Schedule;
    sessionSelected: string;
}


const Weather: React.FC<Props> = ({nextRaceLoc, raceTime, sessionSelected}: Props) => {
    const [raceWeather, setRaceWeather] = useState<Weather | null>(null);
    const [weekendForecast, setWeekendForecast] = useState<Weather[] | null>(null);
    const [isWeather, setIsWeather] = useState<boolean>(false);

    if (handleCountdown(raceTime.race).days > 7 ) return <Notif>*Weather forecast is available during race week</Notif>;

    const lat = nextRaceLoc.lat;
    const long = nextRaceLoc.long;

    // const nextRaceDate = getSessionInfo(raceTime, sessionSelected).substring(0, 10);
    // const nextRaceTime= `${nextRaceDate} ${getSessionInfo(raceTime, sessionSelected).substring(11, 16)}`;

   
    useEffect(() => {
        if (raceWeather) {
            setIsWeather(true);
        }
        if (weekendForecast) {
            const displayForecast = weekendForecast.find(forecast => forecast.session === sessionSelected);
            if(displayForecast) {
                setRaceWeather(displayForecast);
            }
        }
    }, [raceWeather, nextRaceLoc, sessionSelected, weekendForecast]);



    if((!isWeather && !weekendForecast)) {
        
        axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_KEY}&q=${lat},${long}&days=7&aqi=no&alerts=no`)
        .then(res => {
            const sessionsWeather = ["FP1", "FP2", "FP3", "qualifying", "race"].map(session => {
                const nextRaceDate = getSessionInfo(raceTime, session).substring(0, 10);
                const nextRaceTime = `${nextRaceDate} ${getSessionInfo(raceTime, session).substring(11, 14)}00`;
        
                const sessionDay = res.data.forecast.forecastday.find((day: { date: string; }) => day.date === nextRaceDate);
         
                if(sessionDay) {
                    const sessionStart = sessionDay.hour.find((hour: { time: string; }) => hour.time === nextRaceTime);
        
                    if (sessionStart) {
                        const sessionForecast = {
                            chance_of_rain: sessionStart.chance_of_rain,
                            temp_c: sessionStart.temp_c,
                            temp_f: sessionStart.temp_f,
                            wind_k: sessionStart.wind_kph,
                            wind_m: sessionStart.wind_mph,
                            wind_dir: sessionStart.wind_dir,
                            condition_text: sessionStart.condition.text,
                            icon: sessionStart.condition.icon.substring(21, sessionStart.condition.icon.length),
                            locality: nextRaceLoc.locality,
                            session: session,
                        };
        
                        return sessionForecast;
                        
                    }
                }
            });
            if(sessionsWeather) {
                setWeekendForecast(sessionsWeather as Weather[]);
            }
           
        }); 
    }

    if(!isWeather || !raceWeather) return null;

    return (
        <React.Fragment>
            <WeatherContainer>
                <IconTextWrap>
                    <img src={process.env.PUBLIC_URL + `/${raceWeather.icon}`} />
                </IconTextWrap>
                <MeasureBox>
                <WeatherTitle>SESSION FORECAST</WeatherTitle>
                    <MeasuresWrap>
                        <MeasureRow>
                            <Value>{localStorage.getItem('temp') ? raceWeather.temp_f : raceWeather.temp_c}&#176;</Value>
                            <Description>{localStorage.getItem('temp') ? "Fahrenheit" : "Celcius"}</Description>
                        </MeasureRow>
                        <MeasureRow>
                            <Value>{raceWeather.chance_of_rain}<Unit>%</Unit></Value> 
                            <Description>Chance of rain</Description>
                        </MeasureRow>
                        <MeasureRow>
                            <Value>
                                {localStorage.getItem('distUnit') ? raceWeather.wind_m : raceWeather.wind_k}
                                <Unit>{localStorage.getItem('distUnit') ? "mph" : "kph"}</Unit>
                            </Value>
                            <Description>Wind speed</Description>
                        </MeasureRow>
                    </MeasuresWrap>
                </MeasureBox>
            </WeatherContainer>
        </React.Fragment>
    );
};

export default Weather;