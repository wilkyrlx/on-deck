import { Team } from "../model/Team";
import { Event } from "../model/Event";

export interface EventsRepository {
    getEvents(teamPreferences: Team[]): Promise<Event[]>
    getHighlightGames(teamPreferences: Team[]): Promise<Event[]>
}