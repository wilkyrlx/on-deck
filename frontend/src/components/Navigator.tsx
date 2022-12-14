import { viewProps } from '../App';
import '../styles/Navigator.css';
import { pageView } from '../types/pageView';

function Navigator({setView, view}: viewProps) {

    return (
        <div className="navigator">
            <button onClick={() => setView(pageView.MAIN)}>Calendar</button>
            <button onClick={() => setView(pageView.PREFERENCES)}>Preferences</button>
        </div>
    )
}


export { Navigator }