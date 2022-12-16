import './styles/App.css';
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import FullCalendarApp from "./components/Calendar";
import { Preferences } from "./components/Preferences";
import { Navigator } from "./components/Navigator";
import { pageView } from "./types/pageView";
import { MockRepository } from './data/mock';
import { MainCalendar } from './components/MainCalendar';
import { cookieToTeam, Team } from './model/Team';
import { setCookie } from './save-data/cookieManager';
import { loadPreferencesCookie, sendPreferencesRequest } from './save-data/preferencesManager';
import {EventsRepository} from "./data/EventsRepository";

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
    const [savedTeams, setSavedTeams] = useState<Team[]>([])

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

    const repository: EventsRepository = new MockRepository()

	return (
		<div className="app">
			<button onClick={() => cookieToTeam('football|NFL|new-england-patriots')}>cookie</button>
			<Navigator setView={setView} view={view} />
            { view === pageView.PREFERENCES &&
                <Preferences
                    savedTeams={savedTeams}
                    onRemoveTeam={(team) => updateTeamPreference(team, false)}
                    onAddTeam={(team) => updateTeamPreference(team, true)}/> }
            { view === pageView.MAIN &&
                <MainCalendar repository={repository} savedTeams={savedTeams}/> }
		</div>
	);
}

export default App;
