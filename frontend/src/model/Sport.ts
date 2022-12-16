export enum Sport {
    NFL,
    NBA,
    NHL,
    MLB,
}

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