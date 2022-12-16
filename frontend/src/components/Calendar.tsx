import FullCalendar, { EventInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Event } from '../model/Event';
import {CalendarEvent} from "./CalendarEvent";

function FullCalendarApp({ events }: { events: Event[] }) {
    const convertedEvents = events.map(e => convertToCalendarEvent(e))
    console.log(convertedEvents)
    return (
    <div className="calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        headerToolbar={{
          center: 'timeGridWeek,timeGridDay',
        }}
        events={convertedEvents}
          eventColor="#76828d"
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
    const event = eventInfo.event.extendedProps.eventDetails
    console.log(event)
    return (<CalendarEvent event={event}/>)
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