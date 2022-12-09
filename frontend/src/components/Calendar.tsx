import FullCalendar, { EventInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Event } from '../model/Event';

function FullCalendarApp({ events }: { events: Event[] }) {
    const convertedEvents = events.map(e => convertToCalendarEvent(e))
    console.log(convertedEvents)
    return (
    <div className="calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        headerToolbar={{
          center: 'timeGridWeek,timeGridDay new',
        }}
        customButtons={{
          new: {
            text: 'new',
            click: () => console.log('new event'),
          },
        }}
        events={convertedEvents}
        eventColor="red"
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
  return (
    <div>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
      <p>{eventInfo.event.extendedProps.image}</p>
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