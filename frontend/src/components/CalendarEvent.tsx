import { Event } from '../model/Event';
import '../styles/CalendarEvent.css';
import {sportToString} from "../model/Sport";
import { accessibleEvent } from './MainCalendar';

export function CalendarEvent({event}: {event: Event}) {
    return (
    <div className="calendar-event" aria-label={accessibleEvent(event)}>
        <img src={event.homeTeam.iconUrl}/>
        <div className="event-text">
            <b>{event.title()}</b>
            <p>{sportToString(event.sport)}</p>
        </div>
        <p className="event-timerange">{event.timeRange()}</p>
    </div>
    );
}