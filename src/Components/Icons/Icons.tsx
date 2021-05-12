import React from 'react';
import { getPath } from './Paths';

export type IconType = "Settings" 
    | "Twitter" | "Search" | "CheckBoot" 
    | "Calendar" | "ArrowUp" | "ArrowDown"
    | "Wins" | "Podiums" | "TrendUp" | "DNFs";


interface Props {
    color: string;
    size: string;
    iconType: IconType;
}
const Icons: React.FC<Props> = ({color, size, iconType }: Props) =>{
    return (
        <svg 
        viewBox={getPath(iconType).viewBox} 
        height={size} width={size}
        aria-hidden="true" 
        focusable="false" 
        fill={color} 
        xmlns="http://www.w3.org/2000/svg">
            {
                iconType === "Podiums"
                ? <path 
                    fill="none" 
                    stroke={color} 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="32"
                    d={getPath(iconType).path}></path>
                    
                : <path d={getPath(iconType).path}></path>
            }
        </svg>
    );
};

export default Icons;