package edu.brown.cs.student.server;

import static spark.Spark.after;

import com.squareup.moshi.Moshi;
import edu.brown.cs.student.server.handlers.ImportantGamesHandler;
import edu.brown.cs.student.server.handlers.SportsHandler;
import edu.brown.cs.student.server.handlers.DefaultHandler;
import edu.brown.cs.student.util.Scorer;
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
    Moshi moshi = new Moshi.Builder().build();
    Scorer scorer = new Scorer(moshi);

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
    Spark.get("sports", new SportsHandler(moshi, scorer));
    Spark.get("important", new ImportantGamesHandler(moshi, scorer));
    /* Add new endpoints above this line.
    '*' is a catch-all, and endpoints are assigned in order of declaration */
    Spark.get("*", new DefaultHandler());
    Spark.init();
    Spark.awaitInitialization();
    System.out.println("Server started.");
  }
}
