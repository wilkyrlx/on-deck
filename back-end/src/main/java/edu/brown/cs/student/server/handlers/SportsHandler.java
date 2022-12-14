package edu.brown.cs.student.server.handlers;

import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.server.data.ESPNContents;
import edu.brown.cs.student.server.data.TeamID;
import edu.brown.cs.student.util.Scorer;
import edu.brown.cs.student.util.WebResponse;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;
import org.jetbrains.annotations.NotNull;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * A class to handle <em>sports</em> requests to the backend. Pulls from the ESPN API.
 */
public final class SportsHandler implements Route {
  public static final String API_URL_STUB = "https://site.api.espn.com/apis/site/v2/sports/";
  // example: http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/15/schedule
  public final Moshi moshi;
  private final TeamID idConverter;
  private final Map<String, Object> responseMap;
  private final Scorer scorer;

  /**
   * Constructs a new instance of the SportsHandler with the singular Moshi instance, and new
   * idConverter and Map instances.
   *
   * @param moshi  the shared moshi instance
   * @param scorer a scorer to provide objective ranking of a game's "hype-level"
   */
  public SportsHandler(Moshi moshi, Scorer scorer) {
    this.moshi = moshi;
    this.idConverter = new TeamID(this);
    this.responseMap = new LinkedHashMap<>();
    this.scorer = scorer;
  }

  /**
   * Handles a Spark server request to the backend.
   * Should have responses for the <em>sport</em>, <em>league</em>, and <em>team</em> queries.
   */
  @Override
  public Object handle(Request request, Response response) {
    this.responseMap.clear();

    String sportName = request.queryParams("sport");
    String leagueName = request.queryParams("league");
    String teamName = request.queryParams("team");

    String teamID = this.idConverter.getTeamID(teamName);

    try {
      String fullURL = API_URL_STUB + sportName + "/"
          + leagueName + "/teams/" + teamID + "/schedule";
      String apiJSON = WebResponse.getWebResponse(fullURL).body();
      ESPNContents scheduleData = this.deserializeSchedule(apiJSON);
      this.addSuccessResponse(scheduleData);
    } catch (IOException | InterruptedException e) {
      this.responseMap.put("result", "error_bad_request");
    }
    return moshi.adapter(Types.newParameterizedType(Map.class, String.class, Object.class))
        .toJson(this.responseMap);
  }

  /**
   * Modifies the responseMap to have all the relevant data pulled from the API.

   * @param scheduleData the data deserialized from the API JSON
   */
  private void addSuccessResponse(@NotNull ESPNContents scheduleData) {
    this.responseMap.put("result", "success");
    this.responseMap.put("displayName", scheduleData.team().displayName());
    this.responseMap.put("logo", scheduleData.team().logo());
    this.responseMap.put("recordSummary", scheduleData.team().recordSummary());
    this.responseMap.put("color", scheduleData.team().color());

    for (int i = 0; i < scheduleData.events().size(); i++) {
      scorer.addEvent(scheduleData.events().get(i));
      Map<String, String> internalMap = new LinkedHashMap<>();
      internalMap.put("gameID", scheduleData.events().get(i).id()); // ESPN Game ID
      internalMap.put("gameDate", scheduleData.events().get(i).date());
      internalMap.put("gameName", scheduleData.events().get(i).name());
      internalMap.put("gameLink", scheduleData.events().get(i).links().get(0).href()); // first link
      this.responseMap.put("game" + i, internalMap);
    }
  }

  /**
   * Deserializes the JSON.
   *
   * @param json the JSON to be deserialized
   * @return a new ESPNContents instance containing all the JSON data
   * @throws IOException if the Moshi fails
   */
  private ESPNContents deserializeSchedule(String json) throws IOException {
    return moshi.adapter(ESPNContents.class).fromJson(json);
  }
}
