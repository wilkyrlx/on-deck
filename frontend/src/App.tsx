import './styles/App.css';
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Preferences } from "./components/Preferences";
import { Navigator } from "./components/Navigator";
import { pageView } from "./types/pageView";
import { MockRepository } from './data/mock';
import { MainCalendar } from './components/MainCalendar';
import { slugToTeam, Team } from './model/Team';
import { loadPreferencesCookie, savePreferencesCookie } from './save-data/preferencesManager';
import { EventsRepository } from "./data/EventsRepository";
import { BackendRepository } from "./data/BackendRepository";
import { Consent } from './components/Consent';

export interface viewProps {
	setView: Dispatch<SetStateAction<pageView>>,
	view: pageView,
}


function App() {

	// determines which tab to open
	const [view, setView] = useState<pageView>(pageView.MAIN)
	// stores the teams that the user has selected
	const [savedTeams, setSavedTeams] = useState<Team[]>([])
	// determines whether or not to show the consent form
	const [consent, setConsent] = useState<boolean>(false);

	// FIXME: component mounts twice because index.tsx has react.strictmode. see https://stackoverflow.com/questions/61254372/my-react-component-is-rendering-twice-because-of-strict-mode/61897567#61897567
	// runs when the component is mounted (only once)
	useEffect(() => {
		console.log('initializing app - sending request to server');
		checkConsent();
		setSavedTeams(loadPreferencesCookie());
	}, []);


	// TODO: make this actually do something
	/**
	 * Checks if the user has given consent to save data already. If they have, hide
	 * the consent form. If they haven't, show the consent form (by default)
	 */
	function checkConsent() {
		const cookieConsent: string | null = localStorage.getItem("cookieConsent");
		if (cookieConsent === "true") {
			setConsent(true);
		} 
	}

	// TODO: clicking do not consent registers but does not hide the consent form
	function askedForConsent() {
		const cookieConsent: string | null = localStorage.getItem("cookieConsent");
		console.log('cookieConsent: ' + cookieConsent);
		return cookieConsent !== null;
	}



	function updateTeamPreference(team: Team, isAdding: boolean) {
		if (isAdding) {
			// runs if user is adding a preference
			setSavedTeams(savedTeams.concat(team))
		} else {
			// runs if user is removing a preference
			setSavedTeams(savedTeams.filter(t => t !== team))
		}

		// TODO: test this
		// save the new preferences to local storage ONLY IF the user has given consent
		console.log(`consent FINDME ${consent} - saving preferences`)
		if (consent) {
			savePreferencesCookie(savedTeams);
		}
	}

    const repository: EventsRepository = new BackendRepository()

	return (
		<div className="app">
			{ !askedForConsent() && <Consent setConsent={setConsent} /> }
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


