package edu.brown.cs.student.server.handlers;

import com.squareup.moshi.Moshi;
import edu.brown.cs.student.server.data.ESPNContents;
import edu.brown.cs.student.server.data.TeamID;
import edu.brown.cs.student.util.WebResponse;
import java.io.IOException;
import spark.Request;
import spark.Response;
import spark.Route;

public class SportsHandler implements Route {
  public static final String API_URL_STUB = "https://site.api.espn.com/apis/site/v2/sports/";
  // example: http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/15/schedule
  public final Moshi moshi;
  private final TeamID idConverter;

  public SportsHandler(Moshi moshi) {
    this.moshi = moshi;
    this.idConverter = new TeamID(this);
  }

  @Override
  public Object handle(Request request, Response response) throws Exception {
    String sportName = request.queryParams("sport");
    String leagueName = request.queryParams("league");
    String teamName = request.queryParams("team");

    int teamID = getTeamID(sportName, leagueName, teamName);

    try {
      String fullURL = API_URL_STUB + sportName + "/"
          + leagueName + "/teams/" + teamID + "/schedule";
      String apiJSON = WebResponse.getWebResponse(fullURL).body();
      ESPNContents scheduleData = this.deserializeSchedule(apiJSON);

    } catch (IOException | InterruptedException e) {
      this.errorHandle();
    }
    return null; // TODO return output map
  }

  private int getTeamID(String sportName, String leagueName, String teamName) {
    return this.idConverter.getTeamID(sportName, leagueName, teamName);
  }

  private ESPNContents deserializeSchedule(String json) throws IOException {
    return moshi.adapter(ESPNContents.class).fromJson(json);
  }

  public void errorHandle() {
    // TODO: write
  }
}
