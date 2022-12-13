package edu.brown.cs.student.server.handlers;

import com.squareup.moshi.Moshi;
import edu.brown.cs.student.util.Scorer;
import java.util.LinkedHashMap;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

public class ImportantGamesHandler implements Route {
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
    return null;
  }
}
