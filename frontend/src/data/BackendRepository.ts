import { Team } from "../model/Team"
import { EventsRepository } from "./EventsRepository"
import { mockEvents } from "./mock"
import { Event } from '../model/Event'

export class BackendRepository implements EventsRepository {
    getEvents(teamPreferences: Team[]): Promise<Event[]> {
        return new Promise(resolve => setTimeout(resolve, 400))
        .then(() => mockEvents)
    }
    getHighlightGames(teamPreferences: Team[]): Promise<Event[]> {
        return new Promise(resolve => setTimeout(resolve, 400))
        .then(() => mockEvents)
    }
}