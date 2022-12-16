import '../styles/Calendar.css';
import FullCalendar, { EventInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Event } from '../model/Event';
import { accessibleEvent } from './MainCalendar';

/**
 * Parses a list of events into a format that is useful for screenreaders
 * 
 * @param events - a list of events being displayed in the calendar
 * @returns a screen-readable string describing the events in the calendar
 */
function accessibleCalendarView(events: Event[]): string {
  const ariaEvents: string[] = events.map(e => accessibleEvent(e))
  const fullLabel: string = 'Calendar view with events: ' + ariaEvents.join(', ')
  return fullLabel;
}

function FullCalendarApp({ events }: { events: Event[] }) {
  const convertedEvents = events.map(e => convertToCalendarEvent(e))
  return (
    <div className="calendar" aria-label ={accessibleCalendarView(events)}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        headerToolbar={{
          center: 'timeGridWeek,timeGridDay',
        }}
        events={convertedEvents}
        eventColor="green"
        nowIndicator
        dateClick={(e) => console.log(e.dateStr)}
        eventClick={(e) => console.log(e.event.id)}
        eventContent={renderEventContent}
      />
    </div>
  );
}

// https://codesandbox.io/s/nxodg?file=/src/App.js:3419-3596
// demonstrates custom event 
function renderEventContent(eventInfo: EventInput) {
  const event: Event = eventInfo.event.extendedProps.eventDetails
  console.log(event)
  return (
    <div aria-label={accessibleEvent(event)} className='calendar-event-container'>
        <b>{eventInfo.timeText}</b>
        <p>{event.title()} </p>
        <img src={event.homeTeam.iconUrl} alt={event.awayTeam.name + "logo"} className='event-image' />
        <img src={event.awayTeam.iconUrl} alt={event.awayTeam.name + "logo"} className='event-image' />
    </div>
  );
}

export default FullCalendarApp;

function convertToCalendarEvent(event: Event): EventInput {
  return {
    id: event.id,
    title: event.title(),
    start: event.startTime.toISOString(), // format of '2022-12-14T10:00:00'
    end: event.endTime.toISOString(),
    eventDetails: event,
  }
}