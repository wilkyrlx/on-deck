import FullCalendarApp from "./Calendar";
import Highlights from "./Highlights";
import { Event } from '../model/Event';
import {EventsRepository} from "../data/EventsRepository";
import { Team } from "../model/Team";

function MainCalendar({ repository, savedTeams }: { repository: EventsRepository, savedTeams: Team[] }) {
    
    return (
        <div>
            <Highlights events={repository.getHighlightGames(savedTeams)}/>
            <FullCalendarApp events={repository.getEvents(savedTeams)}/>
        </div>
    );
}

export { MainCalendar }