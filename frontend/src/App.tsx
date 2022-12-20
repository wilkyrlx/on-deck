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
	const [isConsentGranted, setIsConsentGranted] = useState<boolean | null>(checkConsent());

	// FIXME: component mounts twice because index.tsx has react.strictmode. see https://stackoverflow.com/questions/61254372/my-react-component-is-rendering-twice-because-of-strict-mode/61897567#61897567
	// runs when the component is mounted (only once)
	useEffect(() => {
		console.log('initializing app - sending request to server');
		checkConsent();
		const initialTeams = (isConsentGranted) ? loadPreferencesCookie() : [];
		console.log(`loading initial teams = ${JSON.stringify(initialTeams)}`)
		setSavedTeams(initialTeams);
	}, []);


	/**
	 * Checks if the user has given consent to save data already. If they have, hide
	 * the consent form. If they haven't, show the consent form (by default)
	 * 
	 * NOTE: this is agnostic to whether or not the user has given consent. It only
	 * tracks if the user answered the consent form in some way
	 */
	function checkConsent(): boolean | null {
		const cookieConsent: string | null = localStorage.getItem("cookieConsent");
		if(cookieConsent == "true") return true;
		if(cookieConsent == "false") return false;
		return null;
	}

	/**
	 * Adds or removes a team from the user's preferences.  
	 * @param team - the team to add or remove from the user's preferences
	 * @param isAdding whether or not the user is adding or removing a team
	 */
	function updateTeamPreference(team: Team, isAdding: boolean) {
		let newTeams: Team[]
		if (isAdding) {
			// runs if user is adding a preference, adds the team to the list
			newTeams = savedTeams.concat(team)
		} else {
			// runs if user is removing a preference, removes the team from the list
			newTeams = savedTeams.filter(t => t !== team)
		}

		setSavedTeams(newTeams)
		if (isConsentGranted == true) {
			savePreferencesCookie(newTeams);
			console.log('contents of savedTeams from effect: ' + newTeams.map(t => t.name).join(','));
		}
	}

	return (
		<div className="app">
			{isConsentGranted == null && <Consent setIsConsentGranted={setIsConsentGranted} />}
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


