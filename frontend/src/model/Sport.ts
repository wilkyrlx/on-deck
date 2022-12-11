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