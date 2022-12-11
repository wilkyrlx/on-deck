import { mockSavedTeams } from "../data/mock"
import { sportToString } from "../model/Sport";
import { Team } from "../model/Team"
import '../styles/Preferences.css';

function Preferences() {
    return (
        <div className="preferences">
            <h1>Your Teams</h1>
            {mockSavedTeams.map((team) =>
            <SavedTeamItem team={team} onRemove={() => false}/>
            )}
        </div>
    )
}

function SavedTeamItem({ team, onRemove }: { team: Team, onRemove: () => void }) {
    return (
        <div className="team-item">
            <img src={team.iconUrl}/>
            <div className="team-item-text">
                <p>{team.name}</p>
                <p>{sportToString(team.sport)}</p>
            </div>
        </div>
    )
}

export { Preferences }