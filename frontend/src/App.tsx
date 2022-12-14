import './styles/App.css';
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import FullCalendarApp from "./components/Calendar";
import { Preferences } from "./components/Preferences";
import { Navigator } from "./components/Navigator";
import { pageView } from "./types/pageView";
import { mockEvents, mockSavedTeams } from './data/mock';
import { MainCalendar } from './components/MainCalendar';

export interface viewProps {
	setView: Dispatch<SetStateAction<pageView>>,
	view: pageView,
}



function App() {

	// determines which tab to open
	const [view, setView] = useState<pageView>(pageView.MAIN)
    const [savedTeams, setSavedTeams] = useState(mockSavedTeams)

	return (
		<div className="app">
			<Navigator setView={setView} view={view} />
            { view === pageView.PREFERENCES &&
                <Preferences
                    savedTeams={savedTeams}
                    onRemoveTeam={(team) => setSavedTeams(savedTeams.filter(t => t !== team))}
                    onAddTeam={(team) => setSavedTeams(savedTeams.concat(team))}/> }
            { view === pageView.MAIN &&
                <MainCalendar events={mockEvents}/> }
		</div>
	);
}

export default App;
