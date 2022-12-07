package edu.brown.cs.student.server.data;

import edu.brown.cs.student.server.handlers.SportsHandler;
import edu.brown.cs.student.util.WebResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

public class TeamID {
  private HashMap<String, Integer> TeamNameToIDs;

  public TeamID(SportsHandler sportsHandler) {
    String API_URL_STUB = "https://site.api.espn.com/apis/site/v2/sports/";
    List<String> leagueList = Arrays.asList(
        "football/nfl", "baseball/mlb", "basketball/nba", "hockey/nhl"
    );

    try {
      for (String league : leagueList) {
        String fullURL = API_URL_STUB + league + "/teams";
        String apiJSON = WebResponse.getWebResponse(fullURL).body();
        sportsHandler.moshi.adapter(ESPNContents.class).fromJson(apiJSON);  // TODO: what are we doing with this result
      }
    } catch (IOException | InterruptedException e) {
      sportsHandler.errorHandle();  // TODO: change this
    }
  }

  public int getTeamID(String sportName, String leagueName, String teamName) {
    return 15; // TODO: write
  }
}
