import './styles/App.css';
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import FullCalendarApp from "./components/Calendar";
import { Preferences } from "./components/Preferences";
import { Navigator } from "./components/Navigator";
import { pageView } from "./types/pageView";
import { mockEvents } from './data/mock';

export interface viewProps {
	setView: Dispatch<SetStateAction<pageView>>,
	view: pageView,
}



function App() {

	// determines which tab to open
	const [view, setView] = useState<pageView>(pageView.MAIN)

	return (
		<div className="app">
			<Navigator setView={setView} view={view} />
			{ view === pageView.PREFERENCES && <Preferences /> }
            { view === pageView.MAIN && <FullCalendarApp events={mockEvents}/> }
		</div>
	);
}

export default App;
