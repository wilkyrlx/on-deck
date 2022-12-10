package edu.brown.cs.student.server.handlers;

import com.squareup.moshi.Moshi;
import edu.brown.cs.student.server.data.ESPNContents;
import edu.brown.cs.student.server.data.ESPNContents.Event;
import edu.brown.cs.student.server.data.TeamID;
import edu.brown.cs.student.util.WebResponse;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;
import org.jetbrains.annotations.NotNull;
import spark.Request;
import spark.Response;
import spark.Route;

public class SportsHandler implements Route {
  public static final String API_URL_STUB = "https://site.api.espn.com/apis/site/v2/sports/";
  // example: http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/15/schedule
  public final Moshi moshi;
  private final TeamID idConverter;
  private final Map<String, Object> responseMap;

  public SportsHandler(Moshi moshi) {
    this.moshi = moshi;
    this.idConverter = new TeamID(this);
    this.responseMap = new LinkedHashMap<>();
  }

  @Override
  public Object handle(Request request, Response response) throws Exception {
    this.responseMap.clear();

    String sportName = request.queryParams("sport");
    String leagueName = request.queryParams("league");
    String teamName = request.queryParams("team");

    int teamID = getTeamID(sportName, leagueName, teamName);

    try {
      String fullURL = API_URL_STUB + sportName + "/"
          + leagueName + "/teams/" + teamID + "/schedule";
      String apiJSON = WebResponse.getWebResponse(fullURL).body();
      ESPNContents scheduleData = this.deserializeSchedule(apiJSON);
      this.addSuccessResponse(scheduleData);
      System.out.println(scheduleData);  // for testing purposes

    } catch (IOException | InterruptedException e) {
      this.responseMap.put("result", "error_datasource");
    }
    return this.responseMap;
  }

  private void addSuccessResponse(@NotNull ESPNContents scheduleData) {
    this.responseMap.put("displayName", scheduleData.team().displayName());
    this.responseMap.put("logo", scheduleData.team().logo());
    this.responseMap.put("recordSummary", scheduleData.team().recordSummary());
    for (int i = 0; i < scheduleData.events().size(); i++) {
      this.responseMap.put("date" + i, scheduleData.events().get(i).date());
      this.responseMap.put("link" + i, scheduleData.events().get(i).links());
    }
  }

  private int getTeamID(String sportName, String leagueName, String teamName) {
    return this.idConverter.getTeamID(sportName, leagueName, teamName);
  }

  private ESPNContents deserializeSchedule(String json) throws IOException {
    return moshi.adapter(ESPNContents.class).fromJson(json);
  }
}
