import { CurrTeamStyles } from "../types";

export const patchId = (id: string, firstName: string | null): string => {
    if(id === "mclaren" && firstName ) return "";
    else if(id === "ferrari" && firstName ) return "";
    else if(id === "williams" && firstName ) return "";
    else if(id === "stewart" && firstName ) return "";
    else return id;
};
 
export const getDriverStyle = (id: string): CurrTeamStyles => {
    switch(true) {
        case id === 'hamilton' || id === 'bottas' || id === 'mercedes':
            return {
                team: 'Mercedes AMG Petronas F1 Team',
                primary: '#02CCB6',
                secondary: '#2E2E2E'

            };
        case id === 'max_verstappen' || id === 'perez' || id === 'red_bull':
            return {
                team: 'Red Bull Racing',
                primary: '#0000AE',
                secondary: '#F94774'
            };
        case id === 'leclerc' || id === 'sainz' || id === 'ferrari':
            return {
                team: 'Scuderia Ferrari',
                primary: '#C00000',
                secondary: '#2E2E2E'
            };
        case id === 'norris' || id === 'ricciardo' || id === 'mclaren':
            return {
                team: 'Mclaren Racing',
                primary: '#FF8700',
                secondary: '#2E2E2E'
            };
        case id === 'stroll' || id === 'vettel' || id === 'aston_martin':
            return {
                team: 'Aston Martin Cognizant F1 Team',
                primary: '#006F62',
                secondary: '#FFFFFF'
            };
        case id === 'gasly' || id === 'tsunoda' || id === 'alphatauri':
            return {
                team: 'Scuderia AlphaTauri',
                primary: '#1B2441',
                secondary: '#D4D4D4'
            };
        case id === 'ocon' || id === 'alonso' || id === 'alpine':
            return {
                team: 'Alpine F1 Team',
                primary: '#0090FF',
                secondary: '#FFFFFF'
            };
        case id === 'raikkonen' || id === 'giovinazzi' || id === 'alfa':
            return {
                team: 'Alfa Romeo Racing',
                primary: '#960000',
                secondary: '#FFFFFF'
            };
        case id === 'latifi' || id === 'russell' || id === 'williams':
            return {
                team: 'Williams Racing',
                primary: '#0082FA',
                secondary: '#2E2E2E'
            };
        case id === 'mick_schumacher' || id === 'mazepin' || id === 'haas':
            return {
                team: 'Haas F1 Team',
                primary: '#e60b0b',
                secondary: '#FFFFFF'
            };
        
        default:
            return {
                team: 'NA',
                primary: '#ff425c',
                secondary: '#2D2D2D'
            };
    }
};