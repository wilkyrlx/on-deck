import FullCalendarApp from "./Calendar";
import { Event } from '../model/Event';
import {EventsRepository} from "../data/EventsRepository";
import { Team } from "../model/Team";
import Highlights from "./Highlights";

function accessibleEvent(event: Event) {
    return event.title() + ' at ' + event.timeRange();
}

function MainCalendar({ repository, savedTeams }: { repository: EventsRepository, savedTeams: Team[] }) {
    
    return (
        <div>
            <Highlights events={repository.getHighlightGames(savedTeams)}/>
            <FullCalendarApp events={repository.getEvents(savedTeams)}/>
        </div>
    );
}

export { MainCalendar, accessibleEvent }