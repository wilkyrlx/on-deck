package edu.brown.cs.student.server.handlers;

import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.server.data.ESPNContents;
import edu.brown.cs.student.server.data.ESPNContents.Event;
import edu.brown.cs.student.server.data.ESPNContents.Event.Competition.Competitor;
import edu.brown.cs.student.server.data.TeamID;
import edu.brown.cs.student.util.Scorer;
import edu.brown.cs.student.util.ServerFailureException;
import edu.brown.cs.student.util.WebResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * A class to handle <em>sports</em> requests to the backend. Pulls from the ESPN API.
 */
public final class SportsHandler implements Route {
  public static final String API_URL_STUB_SCHED = "https://site.api.espn.com/apis/site/v2/sports/";
  // example: http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/15/schedule
  public final Moshi moshi;
  private final TeamID idConverter;
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
    try {
      this.idConverter = new TeamID(moshi);
    } catch (ServerFailureException e) {
      System.err.println("Sever failure");
      throw new RuntimeException(e);
    }
    this.scorer = scorer;
  }

  /**
   * Handles a Spark server request to the backend.
   * Should have responses for the <em>sport</em>, <em>league</em>, and <em>team</em> queries.
   */
  @Override
  public Object handle(Request request, Response response) {
    Map<String, Object> responseMap = new LinkedHashMap<>();

    String sportName = request.queryParams("sport");
    String leagueName = request.queryParams("league");
    String teamName = request.queryParams("team");

    String teamID = this.idConverter.getTeamID(teamName);

    try {
      String fullUrl = API_URL_STUB_SCHED + sportName + "/"
          + leagueName + "/teams/" + teamID + "/schedule";
      String apiJson = WebResponse.getWebResponse(fullUrl).body();
      ESPNContents scheduleData = this.deserializeSchedule(apiJson);
      this.addSuccessResponse(scheduleData, responseMap, sportName, leagueName);
    } catch (IOException | InterruptedException | ServerFailureException e) {
      responseMap.put("result", "error_bad_request");
    }
    return moshi.adapter(Types.newParameterizedType(Map.class, String.class, Object.class))
        .toJson(responseMap);
  }

  /**
   * Modifies the responseMap to have all the relevant data pulled from the API.
   *
   * @param scheduleData the data deserialized from the API JSON
   * @throws ServerFailureException if the game cannot be scored
   */
  private void addSuccessResponse(ESPNContents scheduleData, Map<String, Object> responseMap,
      String sportName, String leagueName) throws ServerFailureException {
    List<Map<String, String>> eventListOfMaps =  new ArrayList<>();
    responseMap.put("result", "success");
    responseMap.put("displayName", scheduleData.team().displayName());


    int i = 0;
    for (Event event : scheduleData.events()) {
      i++;

      // TODO: this line really slows stuff down. consider removing it
      if (i < 5) {  
        this.scorer.addEvent(event, sportName, leagueName);
      }
      
      Map<String, String> innerMap = new LinkedHashMap<>(Map.of(
          "date", event.date(), "name", event.name(),
          "id", event.id(), "link", event.links().get(0).href()
      ));
      this.addHomeAndAway(event, innerMap);

      eventListOfMaps.add(innerMap);
    }
    responseMap.put("eventList", eventListOfMaps);
  }

  /**
   * Adds the home team and away team names to the given map.

   * @param event a sports Event from the ESPN API
   * @param innerMap the Map of String to String
   */
  private void addHomeAndAway(Event event, Map<String, String> innerMap) {
    Competitor firstTeam = event.competitions().get(0).competitors().get(0);
    Competitor secondTeam = event.competitions().get(0).competitors().get(1);
    innerMap.put("homeTeamName", firstTeam.homeAway().equals("home")
        ? firstTeam.team().displayName() : secondTeam.team().displayName());
    innerMap.put("awayTeamName", firstTeam.homeAway().equals("away")
        ? firstTeam.team().displayName() : secondTeam.team().displayName());
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
