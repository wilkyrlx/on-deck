import FullCalendarApp from "./Calendar";
import { Event } from '../model/Event';
import {EventsRepository} from "../data/EventsRepository";
import { Team } from "../model/Team";
import Highlights from "./Highlights";
import {useEffect, useState} from "react";

function accessibleEvent(event: Event) {
    return event.title() + ' at ' + event.timeRange();
}

function MainCalendar({ repository, savedTeams }: { repository: EventsRepository, savedTeams: Team[] }) {
    const [highlightedGames, setHighlightedGames] = useState<Event[] | null>(null)
    const [events, setEvents] = useState<Event[]>([])
    useEffect(() => {
        repository.getEvents(savedTeams).then(e => setEvents(e))
        repository.getHighlightGames(savedTeams).then(h => setHighlightedGames(h))
    }, [repository, savedTeams])
    return (
        <div>
            <Highlights events={highlightedGames}/>
            <FullCalendarApp events={events}/>
        </div>
    );
}

export { MainCalendar, accessibleEvent }