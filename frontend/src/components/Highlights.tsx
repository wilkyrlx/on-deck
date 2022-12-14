import { Event } from '../model/Event';
import '../styles/Highlights.css';


/**
 * Display the top 3 events based on our weighted addition alogrithm 
 * @param events - a list of events to display in the highlights bar 
 */
function Highlights({ events }: { events: Event[] }) {

    // TODO: add some way to avoid errors with not enough events
    // TODO: need to get top 3, will depend on backend
    const event1: Event = events[0];
    const event2: Event = events[1];
    const event3: Event = events[2];

    return (
        <div>
            <h3 style={{textAlign: 'center'}}>Highlighted Games</h3>
            <div className='highlights-bar'>
                <HighlightItem event={event1} />
                <HighlightItem event={event2} />
                <HighlightItem event={event3} />
            </div>
        </div>
    )
}

/**
 * A single event to display in the highlights bar
 * @param event - a single event to display 
 */
function HighlightItem({ event }: { event: Event }) {
    return (
        <div className="highlight">
            <b>{event.timeRange()}</b>
            <p>{event.title()}</p>
        </div>
    )
}

export default Highlights