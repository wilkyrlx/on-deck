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
  },
  {
    id: 2,
    title: 'event 2',
    start: '2022-12-2T10:00:00',
    end: '2022-12-2T12:00:00',
  },
];

function FullCalendarApp() {
  return (
    <div className="calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        headerToolbar={{
          center: 'dayGridMonth,timeGridWeek,timeGridDay new',
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
      />
    </div>
  );
}

export default FullCalendarApp;