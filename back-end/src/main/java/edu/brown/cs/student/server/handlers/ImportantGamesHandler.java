package edu.brown.cs.student.server.handlers;

import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.server.data.ESPNContents.Event;
import edu.brown.cs.student.util.Scorer;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

public final class ImportantGamesHandler implements Route {
  private final Moshi moshi;
  private final Scorer scorer;
  private final Map<String, Object> responseMap;

  public ImportantGamesHandler(Moshi moshi, Scorer scorer) {
    this.moshi = moshi;
    this.scorer = scorer;
    this.responseMap = new LinkedHashMap<>();
  }

  @Override
  public Object handle(Request request, Response response) {
    this.responseMap.clear();
    try {
      int gamesCount = Integer.parseInt(request.queryParams("count"));
      List<Event> mostInteresting = scorer.getMostInterestingEvents(gamesCount);
      this.addEventsToMap(mostInteresting);
    } catch (NumberFormatException e) {
      this.responseMap.put("result", "error_bad_request");
    }
    return moshi.adapter(Types.newParameterizedType(Map.class, String.class, Object.class))
        .toJson(this.responseMap);
  }

  private void addEventsToMap(List<Event> mostInteresting) {
    if (mostInteresting != null) {
      this.responseMap.put("result", "success");
      for (int i = 0; i < mostInteresting.size(); i++) {
        this.responseMap.put("game" + i, mostInteresting.get(i));
      }
    } else {
      this.responseMap.put("result", "error_datasource");
    }
  }
}
