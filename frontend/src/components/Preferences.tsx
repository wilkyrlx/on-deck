import { sportToString } from "../model/Sport";
import { Team } from "../model/Team"
import '../styles/Preferences.css';
import {Cross1Icon} from "@radix-ui/react-icons";

export interface PreferencesProps {
    savedTeams: Team[],
    onRemoveTeam: (team: Team) => void,
    onAddTeam: (team: Team) => void
}
function Preferences({savedTeams, onRemoveTeam, onAddTeam}: PreferencesProps) {
    return (
        <div className="preferences">
            <h1>Your Teams</h1>
            {savedTeams.map((team) =>
                <SavedTeamItem team={team} onRemove={() => onRemoveTeam(team)}/>
            )}
        </div>
    )
}

function SavedTeamItem({ team, onRemove }: { team: Team, onRemove: () => void }) {
    return (
        <div className="team-item">
            <img src={team.iconUrl}/>
            <div className="team-item-text">
                <p className="team-item-name">{team.name}</p>
                <p className="team-item-sport">{sportToString(team.sport)}</p>
            </div>
            <Cross1Icon onClick={onRemove}/>
        </div>
    )
}

export { Preferences }