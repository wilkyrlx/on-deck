import './styles/App.css';
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Preferences } from "./components/Preferences";
import { Navigator } from "./components/Navigator";
import { pageView } from "./types/pageView";
import { MockRepository } from './data/mock';
import { MainCalendar } from './components/MainCalendar';
import { Team } from './model/Team';
import { loadPreferencesCookie, savePreferencesCookie } from './save-data/preferencesManager';
import { EventsRepository } from "./data/EventsRepository";
import { BackendRepository } from "./data/BackendRepository";
import { Consent } from './components/Consent';

// props for pageView component
export interface viewProps {
	setView: Dispatch<SetStateAction<pageView>>,
	view: pageView,
}


function App() {

	const repository: EventsRepository = new BackendRepository()
	// const repository: EventsRepository = new MockRepository()

	const [view, setView] = useState<pageView>(pageView.MAIN)	// determines which tab to open
	const [savedTeams, setSavedTeams] = useState<Team[]>([]) 	// stores the teams that the user has selected
	/* determines whether or not to show the consent form. NOTE: 
	 * This does NOT track if the user has given consent to save data. 
	 * It only tracks if the user has answered the consent form in some way
	*/
	const [consentAsk, setConsentAsk] = useState<boolean>(true);

	// FIXME: component mounts twice because index.tsx has react.strictmode. see https://stackoverflow.com/questions/61254372/my-react-component-is-rendering-twice-because-of-strict-mode/61897567#61897567
	// runs when the component is mounted (only once)
	useEffect(() => {
		console.log('initializing app - sending request to server');
		checkConsent();
		setSavedTeams(loadPreferencesCookie());
	}, []);


	/**
	 * Checks if the user has given consent to save data already. If they have, hide
	 * the consent form. If they haven't, show the consent form (by default)
	 * 
	 * NOTE: this is agnostic to whether or not the user has given consent. It only
	 * tracks if the user answered the consent form in some way
	 */
	function checkConsent() {
		const cookieConsent: string | null = localStorage.getItem("cookieConsent");
		if (cookieConsent !== null) {
			setConsentAsk(false);
		} else {
			setConsentAsk(true);
		}
	}

	/**
	 * Adds or removes a team from the user's preferences.  
	 * @param team - the team to add or remove from the user's preferences
	 * @param isAdding whether or not the user is adding or removing a team
	 */
	function updateTeamPreference(team: Team, isAdding: boolean) {
		if (isAdding) {
			// runs if user is adding a preference, adds the team to the list
			(() => setSavedTeams(savedTeams.concat(team)))();
		} else {
			// runs if user is removing a preference, removes the team from the list
			setSavedTeams(savedTeams.filter(t => t !== team))
		}
	}

	/**
	 * Saves the new preferences to local storage ONLY IF the user has given consent
	 * every time savedTeams is updated, this effect runs
	 */
	useEffect(() => {
		const cookieConsent: string | null = localStorage.getItem("cookieConsent");
		if (cookieConsent === "true") {
			savePreferencesCookie(savedTeams);
			console.log('contents of savedTeams from effect: ' + savedTeams.map(t => t.name).join(','));
		}
	}, [savedTeams]);

	return (
		<div className="app">
			{consentAsk && <Consent setConsentAsk={setConsentAsk} />}
			<Navigator setView={setView} view={view} />
			{view === pageView.PREFERENCES &&
				<Preferences
					savedTeams={savedTeams}
					onRemoveTeam={(team) => updateTeamPreference(team, false)}
					onAddTeam={(team) => updateTeamPreference(team, true)} />}
			{view === pageView.MAIN &&
				<MainCalendar repository={repository} savedTeams={savedTeams} />}
		</div>
	);
}

export default App;


