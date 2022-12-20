import { Event } from '../model/Event';
import '../styles/CalendarEvent.css';
import {sportToString} from "../model/Sport";
import { accessibleEvent } from './MainCalendar';

/**
 * Different stylization for an event bar in the calendar
 * @param event - event object from the model 
 */
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