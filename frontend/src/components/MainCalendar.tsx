import FullCalendarApp from "./Calendar";
import Highlights from "./Highlights";
import { Event } from '../model/Event';


function accessibleEvent(event: Event) {
    return event.title() + ' at ' + event.timeRange();
}

function MainCalendar({ events }: { events: Event[] }) {
    

    return (
        <div>
            <Highlights events={events}/>
            <FullCalendarApp events={events}/>
        </div>
    );
}

export { MainCalendar, accessibleEvent }