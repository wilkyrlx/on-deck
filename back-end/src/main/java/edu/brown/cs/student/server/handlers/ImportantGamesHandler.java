package edu.brown.cs.student.server.handlers;

import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.server.data.ESPNContents.Event;
import edu.brown.cs.student.util.Scorer;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * A class to handle <em>important</em> requests to the backend.
 */
public final class ImportantGamesHandler implements Route {
  private final Moshi moshi;
  private final Scorer scorer;

  /**
   * Constructs a new instance of the ImportantGamesHandler.

   * @param moshi the Moshi instance shared by the server
   * @param scorer scores the games based on importance/interest
   */
  public ImportantGamesHandler(Moshi moshi, Scorer scorer) {
    this.moshi = moshi;
    this.scorer = scorer;
  }

  /**
   * Handles a request from the backend. Should have a response for the <em>count</em> query.
   */
  @Override
  public Object handle(Request request, Response response) {
    Map<String, Object> responseMap;
    try {
      int gamesCount = Integer.parseInt(request.queryParams("count"));
      List<Event> mostInteresting = scorer.getMostInterestingEvents(gamesCount);
      responseMap = addEventsToMap(mostInteresting);
    } catch (NumberFormatException e) {
      responseMap = Map.of("result", "error_bad_request");
    }
    return moshi.adapter(Types.newParameterizedType(Map.class, String.class, Object.class))
        .toJson(responseMap);
  }


  /**
   * Returns all the events in the list in a Map, or puts an error result.

   * @param mostInteresting a List of the most interesting events, a scored by Scorer
   * @return a Map representing either a successful addition or an error message
   */
  private static Map<String, Object> addEventsToMap(List<Event> mostInteresting) {
    if (mostInteresting != null) {
      List<Map<String, String>> eventList = new ArrayList<>();
      for (Event event : mostInteresting) {
        Map<String, String> innerMap = new LinkedHashMap<>(Map.of(
          "date", event.date(), "name", event.name(),
          "id", event.id(), "link", event.links().get(0).href()
      ));
        eventList.add(innerMap);
      }
      return Map.of("result", "success", "eventList", eventList);
    } else {
      return Map.of("result", "error_datasource");
    }
  }
}
