import { Event } from '../model/Event';
import '../styles/Highlights.css';
import { accessibleEvent } from './MainCalendar';
import {Shimmer} from "react-shimmer";

export const TEXT_highlighted_games_name = 'Highlighted Games'


/**
 * Display the top 3 events based on our weighted addition alogrithm 
 * @param events - a list of events to display in the highlights bar 
 */
function Highlights({ events }: { events: Event[] | null }) {
    const highlightsItems = (events == null)
    ? [0, 1, 2].map(i => <Shimmer height={64} width={256} className="highlight"/>)
    : events.map(e => <HighlightItem event={e}/>)
    return (
        <div aria-label={TEXT_highlighted_games_name} >
            <h3 style={{textAlign: 'center'}}>{TEXT_highlighted_games_name}</h3>
            <div className='highlights-bar'>
                {highlightsItems}
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
        <div className="highlight" aria-label={accessibleEvent(event)}>
            <b>{event.dateTimeRange()}</b>
            <p>{event.title()}</p>
        </div>
    )
}

export default Highlights