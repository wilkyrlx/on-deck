package edu.brown.cs.student.server.data;

import com.squareup.moshi.Moshi;
import edu.brown.cs.student.server.data.ESPNTeams.Sport.League.TeamWrapper;
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
  public static final List<String> LEAGUE_LIST = Arrays.asList(
      "football/nfl", "baseball/mlb", "basketball/nba", "hockey/nhl");

  /**
   * Constructor for the TeamID class.

   * @param moshi Moshi instance to adapt the JSON
   */
  public TeamID(Moshi moshi) throws ServerFailureException {
    final String API_URL_STUB = "https://site.api.espn.com/apis/site/v2/sports/";

    try {
      for (String league : LEAGUE_LIST) {
        String fullURL = API_URL_STUB + league + "/teams";
        String apiJSON = WebResponse.getWebResponse(fullURL).body();
        ESPNTeams ESPNRes = moshi.adapter(ESPNTeams.class).fromJson(apiJSON);
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
   * Returns the team ID of the given team.

   * @param teamSlug the name of the sports team
   * @return the team's ESPN internal ID
   */
  public String getTeamID(String teamSlug) {
    return this.teamNameToIDs.get(teamSlug);
  }
}
