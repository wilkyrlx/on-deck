import { viewProps } from '../App';
import '../styles/Navigator.css';
import { pageView } from '../types/pageView';


export const TEXT_navbar = 'Navbar';
export const TEXT_calendar_button = 'calendar: navigate to page';
export const TEXT_preferences_button = 'preferences: navigate to page';

/**
 * The top bar of the page. Contains the logo and the buttons to navigate to the
 * calendar and preferences page
 */
function Navigator({setView, view}: viewProps) {
    return (
        <div className="navigator" aria-label={TEXT_navbar}>
            <a href='#' onClick={() => setView(pageView.MAIN)}>
                <img src='/images/logo.png' alt='logo' className='logo'/>
            </a>
            <button aria-label={TEXT_calendar_button} onClick={() => setView(pageView.MAIN)} >Calendar</button>
            <button aria-label={TEXT_preferences_button} onClick={() => setView(pageView.PREFERENCES)}>Preferences</button>
        </div>
    )
}


export { Navigator }