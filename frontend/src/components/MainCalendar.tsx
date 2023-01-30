import FullCalendarApp from "./Calendar";
import { Event } from '../model/Event';
import {EventsRepository} from "../data/EventsRepository";
import { Team } from "../model/Team";
import Highlights from "./Highlights";
import {useEffect, useState} from "react";

// turns an event into a string for accessibility
function accessibleEvent(event: Event) {
    return event.title() + ' at ' + event.timeRange();
}

/**
 * This wrapper handles data fetching and passing it to the calendar and highlights components
 * Highlights is the top 3 games to display at the top
 * FullCalendarApp is the calendar component from the FullCalendar library
 * @param repository - repository for fetching events, either BackendEventsRepository or MockEventsRepository
 * @param savedTeams - list of teams that the user has saved 
 */
function MainCalendar({ repository, savedTeams }: { repository: EventsRepository, savedTeams: Team[] }) {
    const [highlightedGames, setHighlightedGames] = useState<Event[] | null>(null)
    const [events, setEvents] = useState<Event[]>([])
    useEffect(() => {
        repository.getEvents(savedTeams).then(e => setEvents(e))
        repository.getHighlightGames(savedTeams).then(h => setHighlightedGames(h))
    }, [repository, savedTeams])
    return (
        <div>
            {/* TODO: uncomment this when we have the highlights component functional */}
            {/* <Highlights events={highlightedGames}/> */}
            <FullCalendarApp events={events}/>
        </div>
    );
}

export { MainCalendar, accessibleEvent }