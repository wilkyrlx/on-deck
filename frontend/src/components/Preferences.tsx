import { sportToString } from "../model/Sport";
import { Team } from "../model/Team"
import '../styles/Preferences.css';
import {Cross1Icon} from "@radix-ui/react-icons";
import {useState} from "react";

// allows for mocking of saved teams
import { mockSavedTeams } from "../data/mock";
import { allTeams } from "../data/allTeams";

export interface PreferencesProps {
    savedTeams: Team[],
    onRemoveTeam: (team: Team) => void,
    onAddTeam: (team: Team) => void
}
function Preferences({savedTeams, onRemoveTeam, onAddTeam}: PreferencesProps) {
    return (
        <div className="preferences">
            { savedTeams.length > 0 && (
                <div className="your-teams">
                    <h1>Your Teams</h1>
                    {savedTeams.map((team) =>
                    <SavedTeamItem team={team} onRemove={() => onRemoveTeam(team)}/>
                    )}
                </div>
            )}
            <div className="add-teams">
                <h1>Add Teams</h1>
                <TeamSearch teams={allTeams.filter(t => !savedTeams.includes(t))} onAdd={onAddTeam}/>
            </div>
        </div>
    )
}

function SavedTeamItem({ team, onRemove }: { team: Team, onRemove: () => void }) {
    return (
        <div className="saved-team-item">
            <TeamItem team={team} onClick={() => false}/>
            <Cross1Icon onClick={onRemove}/>
        </div>
    )
}

function TeamItem({ team, onClick }: { team: Team, onClick: () => void }) {
    return (
        <div className="team-item" onClick={onClick}>
            <img src={team.iconUrl} alt=""/>
            <div className="team-item-text">
                <p className="team-item-name">{team.name}</p>
                <p className="team-item-sport">{sportToString(team.sport)}</p>
            </div>
        </div>
    )
}

function TeamSearch({ teams, onAdd }:{ teams: Team[], onAdd: (team: Team) => void }) {
    const [ searchTerm, setSearchTerm ] = useState("")
    const results = teams.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()))
    return (
        <div className="search-wrapper">
            <input className="add-teams-search" placeholder="Search teams" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            { searchTerm.length > 0 &&
                <div className="search-results">
                    { results.map(team =>
                    <TeamItem team={team} onClick={() => onAdd(team)}/>
                    )}
                </div>
            }
        </div>

    )
}

export { Preferences }