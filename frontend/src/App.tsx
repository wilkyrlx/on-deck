import './styles/App.css';
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import FullCalendarApp from "./components/Calendar";
import { Preferences } from "./components/Preferences";
import { Navigator } from "./components/Navigator";
import { pageView } from "./types/pageView";
import { mockEvents, mockSavedTeams } from './data/mock';
import { MainCalendar } from './components/MainCalendar';
import { Team } from './model/Team';
import { setCookie } from './save-data/cookieManager';
import { loadPreferencesCookie, sendPreferencesRequest } from './save-data/preferencesManager';

export interface viewProps {
	setView: Dispatch<SetStateAction<pageView>>,
	view: pageView,
}




function App() {

	// FIXME: component mounts twice because index.tsx has react.strictmode. see https://stackoverflow.com/questions/61254372/my-react-component-is-rendering-twice-because-of-strict-mode/61897567#61897567
	// runs when the component is mounted (only once)
	useEffect(() => {
		console.log('initializing app - sending request to server');
		sendPreferencesRequest();
	  }, []);
  

	// determines which tab to open
	const [view, setView] = useState<pageView>(pageView.MAIN)
    const [savedTeams, setSavedTeams] = useState(mockSavedTeams)

	function updateTeamPreference(team: Team, isAdding: boolean) {
		if (isAdding) {
			// runs if user is adding a preference
			setSavedTeams(savedTeams.concat(team))
		} else {
			// runs if user is removing a preference
			setSavedTeams(savedTeams.filter(t => t !== team))
		}
		
		// save the new preferences to the cookie
		loadPreferencesCookie(savedTeams);
		sendPreferencesRequest();
	}

	return (
		<div className="app">
			<Navigator setView={setView} view={view} />
            { view === pageView.PREFERENCES &&
                <Preferences
                    savedTeams={savedTeams}
                    onRemoveTeam={(team) => updateTeamPreference(team, false)}
                    onAddTeam={(team) => updateTeamPreference(team, true)}/> }
            { view === pageView.MAIN &&
                <MainCalendar events={mockEvents}/> }
		</div>
	);
}

export default App;
