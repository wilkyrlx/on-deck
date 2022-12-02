import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import FullCalendarApp from "./components/Calendar";


function App() {

	return (
		<div className="app">
			<div className="navbar">
				<h1>FILLER</h1>
			</div>
			<FullCalendarApp/>
		</div>
	);
}

export default App;
