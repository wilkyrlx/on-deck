package edu.brown.cs.student.server.data;

import edu.brown.cs.student.server.data.ESPNTeams.Sport.League.TeamWrapper;
import edu.brown.cs.student.server.handlers.SportsHandler;
import edu.brown.cs.student.util.WebResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

public class TeamID {
  private HashMap<String, String> teamNameToIDs;

  private TeamWrapper.Team extractTeam(TeamWrapper tw) {
    return tw.t();
  }

  private void constructHashMap(ESPNTeams response) {
    List<TeamWrapper> teamWrapperList = response.alos().get(0).alol().get(0).alot();
    List<TeamWrapper.Team> teamList = new ArrayList<>();

    for (TeamWrapper teamWrapper : teamWrapperList) {
      teamList.add(this.extractTeam(teamWrapper));
    }
    for (TeamWrapper.Team team: teamList) {
      this.teamNameToIDs.put(team.displayName(), team.id());
    }
  }

  public TeamID(SportsHandler sportsHandler) {
    String API_URL_STUB = "https://site.api.espn.com/apis/site/v2/sports/";
    List<String> leagueList = Arrays.asList(
        "football/nfl", "baseball/mlb", "basketball/nba", "hockey/nhl"
    );

    try {
      for (String league : leagueList) {
        String fullURL = API_URL_STUB + league + "/teams";
        String apiJSON = WebResponse.getWebResponse(fullURL).body();
        ESPNTeams ESPNRes = sportsHandler.moshi.adapter(ESPNTeams.class).fromJson(apiJSON);
        if (ESPNRes != null) {
          this.constructHashMap(ESPNRes);
        }
      }
    } catch (IOException | InterruptedException e) {
        // TODO: error handle
    }
  }

  public String getTeamID(String teamName) {
    return this.teamNameToIDs.get(teamName);
  }
}
