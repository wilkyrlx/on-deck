package edu.brown.cs.student.util;

import com.squareup.moshi.Moshi;
import edu.brown.cs.student.server.data.ESPNContents.Event;
import edu.brown.cs.student.server.data.ESPNOdds;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

/**
 * A class to score all the Events based on how interesting they are.
 */
public final class Scorer {
  public static final String API_URL_STUB_ODDS = "https://sports.core.api.espn.com/v2/sports/";
  // example: https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/events/401437630/competitions/401437630/odds
  private static final Map<String, Double> averageOverUnder = Map.of(
      "baseball", 7.5, "football", 37.5,
      "basketball", 225.5, "hockey", 5.5);
  private final Moshi moshi;
  private final Map<Event, Double> eventScores;

  /**
   * Constructs a new instance of Scorer, by initializing the eventScores Map.
   */
  public Scorer(Moshi moshi) {
    this.moshi = moshi;
    this.eventScores = new LinkedHashMap<>();
  }

  /**
   * Adds the Event and its interest score to the Map.

   * @param event a sports game pulled from the ESPN API
   * @throws ServerFailureException if the odds API cannot be reached
   */
  public void addEvent(Event event, String sportName, String leagueName) throws ServerFailureException {
    double score = this.scoreEvent(event, sportName, leagueName);
    this.eventScores.put(event, score);
  }

  /**
   * Scores the given event based on how interesting it is.

   * @param event a sports game pulled from the ESPN API
   * @return a number representing how interesting the game should be (higher = more interesting)
   * @throws ServerFailureException if the odds API cannot be reached
   */
  private Double scoreEvent(Event event, String sportName, String leagueName) throws ServerFailureException {
    String gameId = event.id();
    try {
      String fullURL = API_URL_STUB_ODDS + sportName + "/leagues/" + leagueName + "/events/"
          + gameId + "/competitions/" + gameId + "/odds";
      String apiJSON = WebResponse.getWebResponse(fullURL).body();
      ESPNOdds odds = this.deserializeOddsRecord(apiJSON);
      return this.calculateScore(odds, sportName);
    } catch (IOException | InterruptedException e) {
      throw new ServerFailureException("Scoring event's interest failure");
    }
  }

  private Double calculateScore(ESPNOdds odds, String sportName) {
    double baselineOvUnd = averageOverUnder.get(sportName);
    double ovUndDifference = Math.abs(odds.items().get(0).overUnder() - baselineOvUnd);
    double spread = Math.abs(odds.items().get(0).spread());
    return ovUndDifference + spread;
  }

  /**
   * Returns the events with the highest interest scores.

   * @param count how many events to return (should always be >= 1)
   * @return a defensive copy of the top events in a list of size count
   */
  public List<Event> getMostInterestingEvents(int count) {
    // TODO: test this!!
    Map<Event, Double> sortedMap = this.sortByComparator(this.eventScores);

    List<Event> allEvents = List.copyOf(sortedMap.keySet());
    List<Event> topEventsList = new ArrayList<>();

    for (int i = 0; i < count && i < allEvents.size(); i++) {
      topEventsList.add(allEvents.get(i));
    }
    return List.copyOf(topEventsList);  // defensive programming
  }

  private Map<Event, Double> sortByComparator(Map<Event, Double> unsortMap) {
    // from https://stackoverflow.com/a/19671853
    List<Entry<Event, Double>> list = new LinkedList<>(unsortMap.entrySet());
    list.sort((o1, o2) -> o2.getValue().compareTo(o1.getValue()));

    Map<Event, Double> sortedMap = new LinkedHashMap<>();
    for (Entry<Event, Double> entry : list) {
      sortedMap.put(entry.getKey(), entry.getValue());
    }
    return sortedMap;
  }

  private ESPNOdds deserializeOddsRecord(String json) throws IOException {
    return moshi.adapter(ESPNOdds.class).fromJson(json);
  }
}
