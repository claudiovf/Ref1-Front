import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Location } from '../../types';

const WeatherContainer = styled.div`
    display: flex;
    display-direction: row;
    justify-content: center;
    align-items: top;
    height: auto;
    width: auto;
    max-width: 85%;
    margin: 0.25rem 0 1rem 0;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: rgb(255, 255, 255, 0.1);

    @media (min-width: 768px) {
        width: 80%;
      }
`;

const IconTextWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 6rem;

    div:nth-child(2) {
        font-family: "Work Sans Semi Bold";
        color: #FFFFFF;
        font-size: 0.75rem;
   }

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
margin: 0.25rem 0 ;
font-family: "Work Sans Bold";
color: white;
`;

const MeasureRow = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    margin: 0.5rem 0.25rem;
    font-family: "Work Sans Bold";
    color: white;
`;

const Value = styled.div`
    font-size: 1.125rem;
    font-family: "Work Sans Bold";
    color: white;

`;
const Unit = styled.span`
    font-family: "Work Sans Semi Bold";
    color: #FFFFFF;
    font-size: 0.75rem;
    min-height: 100%;
`;

const WeatherTitle = styled.div`
    font-size: 1rem;
    margin: 0.25rem;
    font-family: "Work Sans Bold";
    color: white;
`;
const Description = styled.span`
    font-size: 0.5rem;
    margin: 0.25rem 0;
    justify-content: bottom;
    font-family: "Work Sans Semi Bold";
    color: white;
`;


interface Weather {
    chance_of_rain: string;
    temp: number;
    wind: number;
    wind_dir: string;
    condition_text: string;
    icon: string;
}

interface Props {
    nextRaceLoc: Location;
}


const Weather: React.FC<Props> = ({nextRaceLoc}: Props) => {
    const [raceWeather, setRaceWeather] = useState<Weather | null>(null);
    const [isWeather, setIsWeather] = useState<boolean>(false);

    useEffect(() => {
        if (raceWeather) {
            setIsWeather(true);
        }
    }, [raceWeather]);

    const lat = nextRaceLoc.lat;
    const long = nextRaceLoc.long;
    
    const nextRaceDate = "2021-04-18";
    const nextRaceTime= "2021-04-18 15:00";



    if(!isWeather && !raceWeather) {
        
        axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_KEY}&q=${lat},${long}&days=7&aqi=no&alerts=no`)
        .then(res => {
            const raceDay = res.data.forecast.forecastday.find((day: { date: string; }) => day.date === nextRaceDate);
    
            if(raceDay) {
                const raceStart = raceDay.hour.find((hour: { time: string; }) => hour.time === nextRaceTime);
    
                if (raceStart) {
                    const raceForecast = {
                        chance_of_rain: raceStart.chance_of_rain,
                        temp: raceStart.temp_c,
                        wind: raceStart.wind_kph,
                        wind_dir: raceStart.wind_dir,
                        condition_text: raceStart.condition.text,
                        icon: raceStart.condition.icon.substring(21, raceStart.condition.icon.length)
                    };
    
                    setRaceWeather(raceForecast);
                    console.log(raceForecast);
                    
                }
            }
        }); 
    }

    if(!isWeather || !raceWeather) return null;

    

    return (
        <WeatherContainer>
            <IconTextWrap>
                <img src={process.env.PUBLIC_URL + `/${raceWeather.icon}`} />
                <div>{raceWeather.condition_text}</div>   
            </IconTextWrap>
            <MeasureBox>
            <WeatherTitle>Race Forecast</WeatherTitle>
                <MeasuresWrap>
                    <MeasureRow>
                        <Value>{raceWeather.temp}&#176;</Value>
                        <Description>Celcius</Description>
                    </MeasureRow>
                    <MeasureRow>
                        <Value>{raceWeather.chance_of_rain}<Unit>%</Unit></Value> 
                        <Description>Chance of rain</Description>
                    </MeasureRow>
                    <MeasureRow>
                        <Value>{raceWeather.wind}<Unit>kph</Unit></Value>
                        <Description>Wind speed</Description>
                    </MeasureRow>
                </MeasuresWrap>
            </MeasureBox>
        </WeatherContainer>
    );
};

export default Weather;