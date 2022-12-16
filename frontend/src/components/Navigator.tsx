import { viewProps } from '../App';
import '../styles/Navigator.css';
import { pageView } from '../types/pageView';


export const TEXT_navbar = 'Navbar';
export const TEXT_calendar_button = 'calendar: navigate to page';
export const TEXT_preferences_button = 'preferences: navigate to page';


function Navigator({setView, view}: viewProps) {

    return (
        <div className="navigator" aria-label={TEXT_navbar}>
            <img src='/images/logo.png' alt='logo' className='logo'/>
            <button aria-label={TEXT_calendar_button} onClick={() => setView(pageView.MAIN)} >Calendar</button>
            <button aria-label={TEXT_preferences_button} onClick={() => setView(pageView.PREFERENCES)}>Preferences</button>
        </div>
    )
}


export { Navigator }