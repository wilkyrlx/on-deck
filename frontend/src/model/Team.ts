import { Sport } from "./Sport"

export interface Team {
    name: string
    iconUrl: string
    sport: Sport
}

export interface ESPNTeam extends Team {
    id: number
}