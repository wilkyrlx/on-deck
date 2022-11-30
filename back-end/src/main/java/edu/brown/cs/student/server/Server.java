package edu.brown.cs.student.server;

import static spark.Spark.after;

import com.squareup.moshi.Moshi;
import edu.brown.cs.student.server.handlers.csvapi.GetCSVHandler;
import edu.brown.cs.student.server.handlers.csvapi.LoadCSVHandler;
import edu.brown.cs.student.server.handlers.csvapi.ProtectedCSVWrapper;
import edu.brown.cs.student.server.handlers.csvapi.StatsHandler;
import edu.brown.cs.student.server.handlers.DefaultHandler;
import edu.brown.cs.student.server.handlers.geojsonapi.GeoJSONHandler;
import edu.brown.cs.student.server.handlers.weatherapi.WeatherHandler;
import spark.Spark;

/**
 * Top-level class for the sprint.
 * Contains the main method, which starts the server and allows for API access.
 */
public class Server {

  public static void main(String[] args) {
    initializeServer();
  }

  /**
   * Initializes server. Please note, no longer uses main method
   */
  public static void initializeServer() {
    ProtectedCSVWrapper loadedCSV = new ProtectedCSVWrapper();
    Moshi moshi = new Moshi.Builder().build();
    String FILEPATH = "/Users/caleb/Desktop/CS32/Sprints/integration-cmoran5-ekehaya/back-end/src/main/java/edu/brown/cs/student/server/data/fullDownload.geojson";

    Spark.port(3232);
    /*
    Setting CORS headers to allow cross-origin requests from the client;
    this is necessary for the client to be able to make requests to the server.

    By setting the Access-Control-Allow-Origin header to "*", we allow requests from any origin.
    This is not a good idea in real-world applications,
    since it opens up your server to cross-origin requests from any website.
    Instead, you should set this header to the origin of your client,
    or a list of origins that you trust.

    By setting the Access-Control-Allow-Methods header to "*",
    we allow requests with any HTTP method. Again, it's generally better to be more specific here
    and only allow the methods you need, but for this demo we'll allow all methods.

    We recommend you learn more about CORS with these resources:
        - https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
        - https://portswigger.net/web-security/cors
     */
    after((request, response) -> {
      response.header("Access-Control-Allow-Origin", "*");
      response.header("Access-Control-Allow-Methods", "*");
    });

    // Setting up the handler for the GET endpoints
    Spark.get("loadcsv", new LoadCSVHandler(loadedCSV, moshi));
    Spark.get("getcsv", new GetCSVHandler(loadedCSV, moshi));
    Spark.get("stats", new StatsHandler(loadedCSV, moshi));
    Spark.get("weather", new WeatherHandler(moshi));
    Spark.get("geojson", new GeoJSONHandler(moshi));

    /* Add new endpoints above this line.
    '*' is a catch-all, and endpoints are assigned in order of declaration */
    Spark.get("*", new DefaultHandler());
    Spark.init();
    Spark.awaitInitialization();
    System.out.println("Server started.");
  }
}
