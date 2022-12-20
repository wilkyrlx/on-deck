export enum Sport {
    NFL,
    NBA,
    NHL,
    MLB,
}

// returns the sport from the enum sport
export function sportToString(sport: Sport): string {
    switch (sport) {
        case Sport.NFL: return "NFL"
        case Sport.NBA: return "NBA"
        case Sport.NHL: return "NHL"
        case Sport.MLB: return "MLB"
    }
}

// Returns the sport from the league of a given sport from the enum sport
export function leagueToSport(sport: Sport): string {
    switch (sport) {
        case Sport.NFL: return "football"
        case Sport.NBA: return "basketball"
        case Sport.NHL: return "hockey"
        case Sport.MLB: return "baseball"
    }
}

// Returns the average game length (hours) of a given sport from the enum sport
export function averageGameLength(sport: Sport): number {
    switch (sport) {
        case Sport.NFL: return 3
        case Sport.NBA: return 2
        case Sport.NHL: return 2
        case Sport.MLB: return 3
    }
}