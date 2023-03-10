import '../styles/CalendarEvent.css';
import '../styles/Calendar.css';
import FullCalendar, { EventInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Event } from '../model/Event';
import { accessibleEvent } from './MainCalendar';
import { CalendarEvent } from './CalendarEvent';

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

/**
 * React calendar component from the FullCalendar library
 * @param events - list of events to be displayed in the calendar 
 */
function FullCalendarApp({ events }: { events: Event[] }) {
  const convertedEvents = events.map(e => convertToCalendarEvent(e))
  return (
    <div className="calendar" aria-label ={accessibleCalendarView(events)} style={{paddingTop: 20}}>
      <FullCalendar
        eventClassNames={"raw-calendar-event"}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        events={convertedEvents}
        eventColor="#76828d"
        nowIndicator
        dateClick={(e) => console.log(e.dateStr)}
        eventClick={(e) => console.log(e.event.id)}
        eventContent={renderEventContent}
        scrollTime="16:00:00"   
        height="100%" // sets height to container, calendar div
      />
    </div>
  );
}

/**
 * Custom code for the rendering of events in the calendar
 * @param eventInfo - event object from FullCalendar
 */
function renderEventContent(eventInfo: EventInput) {
  const event: Event = eventInfo.event.extendedProps.eventDetails
  return (
    <CalendarEvent event={event} />
  );
}

/**
 * Converts one of our homemade events into a format that is compatible with the FullCalendar library
 * @param event - event object from the model
 * @returns an EventInput object that is compatible with the FullCalendar library
 */
function convertToCalendarEvent(event: Event): EventInput {
  return {
    id: event.id,
    title: event.title(),
    start: event.startTime.toISOString(), // format of '2022-12-14T10:00:00'
    end: event.endTime.toISOString(),
    eventDetails: event,
  }
}

export default FullCalendarApp;
