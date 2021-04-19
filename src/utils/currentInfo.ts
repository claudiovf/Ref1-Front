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
                primary: '#212121',
                secondary: '#0082FA'
            };
        case id === 'mick_schumacher' || id === 'mazepin' || id === 'haas':
            return {
                team: 'Haas F1 Team',
                primary: '#dbdbdb',
                secondary: '#e60b0b'
            };
        
        default:
            return {
                team: 'NA',
                primary: '#ff425c',
                secondary: '#2D2D2D'
            };
    }
};

export const driversList = [
    {
        driverId: 'hamilton',
        givenName: "Lewis",
        familyName: "Hamilton",
        code: "HAM",
        permanentNumber: "44"
    },
    {
        driverId: 'bottas',
        givenName: "Valtteri",
        familyName: "Bottas",
        code: "BOT",
        permanentNumber: "77"
    },
    {
        driverId: 'max_verstappen',
        givenName: "Max",
        familyName: "Verstappen",
        code: "VER",
        permanentNumber: "33"
    },
    {
        driverId: 'perez',
        givenName: "Sergio",
        familyName: "Pérez",
        code: "PER",
        permanentNumber: "11"
    },
    {
        driverId: 'norris',
        givenName: "Lando",
        familyName: "Norris",
        code: "NOR",
        permanentNumber: "4"
    },
    {
        driverId: 'ricciardo',
        givenName: "Daniel",
        familyName: "Ricciardo",
        code: "RIC",
        permanentNumber: "3"
    },
    {
        driverId: 'stroll',
        givenName: "Lance",
        familyName: "Stroll",
        code: "STR",
        permanentNumber: "18"
    },
    {
        driverId: 'vettel',
        givenName: "Sebastian",
        familyName: "Vettel",
        code: "VET",
        permanentNumber: "5"
    },
    {
        driverId: 'ocon',
        givenName: "Esteban",
        familyName: "Ocon",
        code: "OCO",
        permanentNumber: "31"
    },
    {
        driverId: 'alonso',
        givenName: "Fernando",
        familyName: "Alonso",
        code: "ALO",
        permanentNumber: "14"
    },
    {
        driverId: 'leclerc',
        givenName: "Charles",
        familyName: "Leclerc",
        code: "LEC",
        permanentNumber: "16"
    },
    {
        driverId: 'sainz',
        givenName: "Carlos",
        familyName: "Sainz",
        code: "SAI",
        permanentNumber: "55"
    },
    {
        driverId: 'gasly',
        givenName: "Pierre",
        familyName: "Gasly",
        code: "GAS",
        permanentNumber: "10"
    },
    {
        driverId: 'tsunoda',
        givenName: "Yuki",
        familyName: "Tsunoda",
        code: "TSU",
        permanentNumber: "22"
    },
    {
        driverId: 'raikkonen',
        givenName: "Kimi",
        familyName: "Räikkönen",
        code: "RAI",
        permanentNumber: "7"
    },
    {
        driverId: 'giovinazzi',
        givenName: "Antonio",
        familyName: "Giovinazzi",
        code: "GIO",
        permanentNumber: "99"
    },
    {
        driverId: 'mick_schumacher',
        givenName: "Mick",
        familyName: "Schumacher",
        code: "MSC",
        permanentNumber: "47"
    },
    {
        driverId: 'mazepin',
        givenName: "Nikita",
        familyName: "Mazepin",
        code: "MAZ",
        permanentNumber: "9"
    },
    {
        driverId: 'russell',
        givenName: "George",
        familyName: "Russell",
        code: "RUS",
        permanentNumber: "63"
    },
    {
        driverId: 'latifi',
        givenName: "Nicholas",
        familyName: "Latifi",
        code: "LAT",
        permanentNumber: "6"
    }
];

export const skyList = [
    {
        driverId: "brundle",
        givenName: "Martin",
        familyName: "Brundle"
    },
    {
        driverId: "chandhok",
        givenName: "Karun",
        familyName: "Chandhok"
    },
    {
        driverId: "herbert",
        givenName: "Johnny",
        familyName: "Herbert"
    },
    {
        driverId: "damon_hill",
        givenName: "Damon",
        familyName: "Hill"
    },
    {
        driverId: "button",
        givenName: "Jenson",
        familyName: "Button"
    },
    {
        driverId: "davidson",
        givenName: "Anthony",
        familyName: "Davidson"
    },
    {
        driverId: "resta",
        givenName: "Paul",
        familyName: "Di Resta"
    },
    {
        driverId: "rosberg",
        givenName: "Nico",
        familyName: "Rosberg"
    },
];

export const legendsList = [
    {
        driverId: "michael_schumacher",
        givenName: "Michael",
        familyName: "Schumacher"
    },
    {
        driverId: "senna",
        givenName: "Ayrton",
        familyName: "Senna"
    },
    {
        driverId: "prost",
        givenName: "Alain",
        familyName: "Prost"
    },
    {
        driverId: "mansell",
        givenName: "Nigel",
        familyName: "Mansell"
    },
    {
        driverId: "jack_brabham",
        givenName: "Jack",
        familyName: "Brabham"
    },
    {
        driverId: "stewart",
        givenName: "Jackie",
        familyName: "Stewart"
    },
    {
        driverId: "lauda",
        givenName: "Niki",
        familyName: "Lauda"
    },
    {
        driverId: "moss",
        givenName: "Stirling",
        familyName: "Moss"
    },
    {
        driverId: "piquet",
        givenName: "Nelson",
        familyName: "Piquet"
    },
    {
        driverId: "fangio",
        givenName: "Juan",
        familyName: "Fangio"
    },
    {
        driverId: "clark",
        givenName: "Jim",
        familyName: "Clark"
    },
    {
        driverId: "emerson_fittipaldi",
        givenName: "Emerson",
        familyName: "Fittipaldi"
    },
];