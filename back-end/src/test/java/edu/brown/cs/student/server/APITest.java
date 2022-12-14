package edu.brown.cs.student.server;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.server.handlers.DefaultHandler;
import edu.brown.cs.student.server.handlers.SportsHandler;
import edu.brown.cs.student.util.Scorer;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.junit.Test;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import spark.Spark;

public class APITest {
  private static final Moshi moshi = new Moshi.Builder().build();
  private static final Scorer s = new Scorer();

  @BeforeAll
  public static void setup_before_everything() {
    // Setting port 0 will cause Spark to use an arbitrary available port.
    Spark.port(0);
    Logger.getLogger("").setLevel(Level.WARNING); // empty name = root logger
  }

  /**
   * Shared state for all tests. We clear this state out after every test runs.
   */
  @BeforeEach
  public void setup() {
    Spark.get("sports", new SportsHandler(moshi, s));
    Spark.get("*", new DefaultHandler());
    Spark.init();
    Spark.awaitInitialization(); // don't continue until the server is listening
  }

  @AfterEach
  public void teardown() {
    // Gracefully stop Spark listening on all endpoints
    Spark.unmap("/sports");

    Spark.awaitStop(); // don't proceed until the server is stopped
  }

  /**
   * Helper to start a connection to a specific API endpoint/params
   * @param apiCall the call string, including endpoint
   *                (NOTE: this would be better if it had more structure!)
   * @return the connection for the given URL, just after connecting
   * @throws IOException if the connection fails for some reason
   */
  static private HttpURLConnection tryRequest(String apiCall) throws IOException {
    // Configure the connection (but don't actually send the request yet)
    URL requestURL = new URL("http://localhost:"+Spark.port()+"/"+apiCall);
    HttpURLConnection clientConnection = (HttpURLConnection) requestURL.openConnection();

    // The default method is "GET", which is what we're using here.
    // If we were using "POST", we'd need to say so.
    //clientConnection.setRequestMethod("GET");

    clientConnection.connect();
    return clientConnection;
  }

  /**
   * Helper function to read JSON from moshi. Used for testing
   *
   * @param clientConnection - the HTTP URL connection resulting from sending an API query
   * @return a map of String, Object pairs generated by moshi
   */
  static private Map<String, Object> getResponse(HttpURLConnection clientConnection) throws IOException {
    StringBuilder sb = new StringBuilder();
    // https://stackoverflow.com/questions/309424/how-do-i-read-convert-an-inputstream-into-a-string-in-java
    for (int ch; (ch = clientConnection.getInputStream().read()) != -1; ) {
      sb.append((char) ch);
    }
    String jsonResp = sb.toString();
    JsonAdapter<Map<String, Object>> adapter = moshi.adapter(Types.newParameterizedType(Map.class,
        String.class, Object.class));
    return adapter.fromJson(jsonResp);
  }

  /** Tests the general call for the Boston Celtics */
  @Test
  public void testBasicCallCeltics() throws IOException {
    String exCall = "sports?sport=basketball&league=nba&team=boston-celtics";
    HttpURLConnection clientConnection = tryRequest(exCall);
    Map<String, Object> response = getResponse(clientConnection);

    Assertions.assertNotNull(response);
    assertEquals(response.get("displayName"),"Boston Celtics");
    assertEquals(response.get("logo"),"https://a.espncdn.com/i/teamlogos/nba/500/bos.png");
    assertEquals(response.get("color"),"006532");
    clientConnection.disconnect();
  }

}
