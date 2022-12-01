package edu.brown.cs.student.server.handlers;

import com.squareup.moshi.Moshi;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import spark.Request;
import spark.Response;
import spark.Route;

public class SportsHandler implements Route {
  private final Moshi moshi;

  public SportsHandler(Moshi moshi) {
    this.moshi = moshi;
  }

  @Override
  public Object handle(Request request, Response response) throws Exception {
    String API_URL_STUB = "https://site.api.espn.com/apis/site/v2/sports/";
    // example: https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard
    String sportName = request.queryParams("sport");
    String leagueName = request.queryParams("league");
    // TODO: get team(s)

    try {
      String apiJSON = getWebResponse(API_URL_STUB + sportName + "/" + leagueName + "/scoreboard").body();
      String schedule = this.deserializeSchedule(apiJSON);


    } catch (IOException | InterruptedException e2) {
      this.errorHandle();
    }

    return null;
  }

  private String deserializeSchedule(String json) {
    // TODO: write
    // return moshi.adapter(FooBar.class).fromJson(json);
    return null;
  }

  /**
   * Makes an HTTP Request to the given URL and returns the corresponding HTTP Response.

   * @param url the URL to access
   * @return the response of the HTTP GET request
   * @throws IOException if an I/O error occurs when sending or receiving
   * @throws InterruptedException if the operation is interrupted
   */
  private static HttpResponse<String> getWebResponse(String url)
      throws IOException, InterruptedException {
    HttpClient client = HttpClient.newHttpClient();
    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create(url))
        .build();
    return client.send(request,
        HttpResponse.BodyHandlers.ofString());
  }

  private void errorHandle() {
    // TODO: write
  }
}
