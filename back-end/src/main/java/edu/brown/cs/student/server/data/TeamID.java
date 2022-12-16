package edu.brown.cs.student.server.data;

import edu.brown.cs.student.server.data.ESPNTeams.Sport.League.TeamWrapper;
import edu.brown.cs.student.server.handlers.SportsHandler;
import edu.brown.cs.student.util.ServerFailureException;
import edu.brown.cs.student.util.WebResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * A class to pull the ESPN team IDs from the API.
 * Produces a Map from team "slug" to ID.
 */
public final class TeamID {
  private final Map<String, String> teamNameToIDs = new HashMap<>();

  /**
   * Modifies the teamNameToIDs field.

   * @param response the deserialized JSON representing available teams
   */
  private void constructHashMap(ESPNTeams response) {
    List<TeamWrapper> teamWrapperList = response.sports().get(0).leagues().get(0).teams();
    List<TeamWrapper.Team> teamList = new ArrayList<>();

    for (TeamWrapper teamWrapper : teamWrapperList) {
      teamList.add(teamWrapper.team());
    }
    for (TeamWrapper.Team team : teamList) {
      this.teamNameToIDs.put(team.slug(), team.id());
      /* slug is the team name in a computer-friendly format */
    }
  }

  /**
   * Constructor for the TeamID class.

   * @param sportsHandler takes in a SportHandler for access to Moshi
   */
  public TeamID(SportsHandler sportsHandler) throws ServerFailureException {
    final String API_URL_STUB = "https://site.api.espn.com/apis/site/v2/sports/";
    final List<String> leagueList = Arrays.asList(
        "football/nfl", "baseball/mlb", "basketball/nba", "hockey/nhl"
    );

    try {
      for (String league : leagueList) {
        String fullURL = API_URL_STUB + league + "/teams";
        String apiJSON = WebResponse.getWebResponse(fullURL).body();
        ESPNTeams ESPNRes = sportsHandler.moshi.adapter(ESPNTeams.class).fromJson(apiJSON);
        if (ESPNRes != null && ESPNRes.sports() != null) {
          this.constructHashMap(ESPNRes);
        } else {
          throw new ServerFailureException("ESPN Response was null");
        }
      }
    } catch (IOException | InterruptedException e) {
      throw new ServerFailureException("API could not be reached");
    }
  }

  /**
   * Returns the team ID of the given team.

   * @param teamName the name of the sports team
   * @return the team's ESPN internal ID
   */
  public String getTeamID(String teamName) {
    return this.teamNameToIDs.get(teamName);
  }
}
