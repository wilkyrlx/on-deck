import { sportToString } from "../model/Sport";
import { Team } from "../model/Team"
import '../styles/Preferences.css';
import {Cross1Icon, MagnifyingGlassIcon} from "@radix-ui/react-icons";
import {useState} from "react";

// allows for mocking of saved teams
import { mockSavedTeams } from "../data/mock";
import { allTeams } from "../data/allTeams";

export const TEXT_search_name = 'Search for team by name';


export interface PreferencesProps {
    savedTeams: Team[],
    onRemoveTeam: (team: Team) => void,
    onAddTeam: (team: Team) => void
}

/**
 * Broader preferences component for the preferences page. Controls lists of saved teams and teams to add
 * by mapping the saved teams and teams to add to the SavedTeamItem and TeamSearch components
 */
function Preferences({savedTeams, onRemoveTeam, onAddTeam}: PreferencesProps) {
    return (
        <div className="preferences" aria-label="preferences">
            { savedTeams.length > 0 && (
                <div className="your-teams" aria-label="your teams">
                    <h3>Your Teams</h3>
                    {savedTeams.map((team) =>
                    <SavedTeamItem team={team} onRemove={() => onRemoveTeam(team)}/>
                    )}
                </div>
            )}
            <div className="add-teams">
                <h3>Add Teams</h3>
                <TeamSearch teams={allTeams.filter(t => !savedTeams.includes(t))} onAdd={onAddTeam}/>
            </div>
        </div>
    )
}

/**
 * Wrapper for a team item in the saved teams list
 */
function SavedTeamItem({ team, onRemove }: { team: Team, onRemove: () => void }) {
    return (
        <div className="saved-team-item">
            <TeamItem team={team} onClick={() => false}/>
            <Cross1Icon className="icon-button" onClick={onRemove}/>
        </div>
    )
}

/**
 * Base component for a team item in the saved teams list or the teams to add list
 */
function TeamItem({ team, onClick }: { team: Team, onClick: () => void }) {
    return (
        <div className="team-item" onClick={onClick} aria-label={team.name}>
            <img src={team.iconUrl} alt=""/>
            <div className="team-item-text">
                <p className="team-item-name">{team.name}</p>
                <p className="team-item-sport">{sportToString(team.sport)}</p>
            </div>
        </div>
    )
}

/**
 * Wrapper for a team item in the teams to add list
 */

function SearchTeamItem({ team, onClick }: { team: Team, onClick: () => void }) {
    return (<div className="search-team-item"><TeamItem team={team} onClick={onClick}/></div>)
}

/**
 * Searchbar for teams to add. In addition to the searchbar, it also displays the results of the search
 * as a list of TeamItems underneath the searchbar
 */
function TeamSearch({ teams, onAdd }:{ teams: Team[], onAdd: (team: Team) => void }) {
    const [ searchTerm, setSearchTerm ] = useState("")
    const results = teams.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()))
    return (
        <div className="search-wrapper" aria-label={TEXT_search_name}>
            <SearchBar term={searchTerm} onChange={(t) => setSearchTerm(t)} />
            { searchTerm.length > 0 &&
                <div className="search-results">
                    { results.map(team =>
                    <SearchTeamItem team={team} onClick={() => onAdd(team)}/>
                    )}
                </div>
            }
        </div>
    )
}

/**
 * Just the searchbar for teams to add
 */
function SearchBar({term, onChange}: {term: string, onChange: (term: string) => void}) {
    return (
        <div className="search-bar-wrapper">
            <MagnifyingGlassIcon/>
            <input className="add-teams-search" placeholder={TEXT_search_name} value={term} onChange={(e) => onChange(e.target.value)}/>
        </div>
    )
}

export { Preferences }