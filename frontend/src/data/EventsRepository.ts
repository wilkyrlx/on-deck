import { Team } from "../model/Team";
import { Event } from "../model/Event";

export interface EventsRepository {
    getEvents(teamPreferences: Team[]): Event[]
    getHighlightGames(teamPreferences: Team[]): Event[]
}