import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const events = [
  {
    id: 1,
    title: 'event 1',
    start: '2022-12-14T10:00:00',
    end: '2022-12-14T12:00:00',
    image: 'test',
  },
  {
    id: 2,
    title: 'event 2',
    start: '2022-12-02T10:00:00',
    end: '2022-12-02T12:00:00',
    image: 'test 2',
  },
  {
    id: 3,
    title: 'event 3',
    start: '2022-12-02T10:00:00',
    end: '2022-12-02T12:00:00',
    image: 'test 2',
  },
];

function FullCalendarApp() {
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
        events={events}
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
function renderEventContent(eventInfo) {
  return (
    <div>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
      <p>{eventInfo.event.extendedProps.image}</p>
    </div>
  );
}

export default FullCalendarApp;