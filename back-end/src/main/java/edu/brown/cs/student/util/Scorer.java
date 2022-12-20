package edu.brown.cs.student.util;

import com.squareup.moshi.Moshi;
import edu.brown.cs.student.server.data.ESPNContents.Event;
import edu.brown.cs.student.server.data.ESPNContents.Event.Competition.Competitor;
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
   */
  public void addEvent(Event event, String sportName, String leagueName) {
    double score = this.scoreEvent(event, sportName, leagueName);
    this.eventScores.put(event, score);
  }

  /**
   * Scores the given event based on how interesting it is.

   * @param event a sports game pulled from the ESPN API
   * @return a number representing how interesting the game should be (higher = more interesting)
   */
  private Double scoreEvent(Event event, String sportName, String leagueName) {
    String gameId = event.id();
    try {
      String fullURL = API_URL_STUB_ODDS + sportName + "/leagues/" + leagueName + "/events/"
          + gameId + "/competitions/" + gameId + "/odds";
      String apiJSON = WebResponse.getWebResponse(fullURL).body();
      ESPNOdds odds = this.deserializeOddsRecord(apiJSON);
      if (odds.items().isEmpty()) {
        throw new IOException();
      }
      return this.calculateScore(odds, sportName);
    } catch (Exception e) {
      return 0.0; // default score if odds can't be reached
    }
  }

  /**
   * Calculates the score of how interesting a game is.

   * @param odds the betting odds from the ESPN API
   * @param sportName the name of the sport ("baseball", "hockey", etc.)
   * @return a double representing the interest score of the game (higher is more interest)
   */
  private Double calculateScore(ESPNOdds odds, String sportName) {
    double baselineOvUnd = averageOverUnder.get(sportName);
    double ovUndDiff = odds.items().get(0).overUnder() - baselineOvUnd; // higher is more interest
    double spread = Math.abs(odds.items().get(0).spread()); // closer to 0 is more interest
    return 1.5 * ovUndDiff - spread;
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
    return Map.copyOf(sortedMap);
  }

  private ESPNOdds deserializeOddsRecord(String json) throws IOException {
    return moshi.adapter(ESPNOdds.class).fromJson(json);
  }

  /**
   * Adds the home team and away team names to the given map.

   * @param event a sports Event from the ESPN API
   * @param innerMap the Map of String to String
   */
  public static void addHomeAndAway(Event event, Map<String, String> innerMap) {
    Competitor firstTeam = event.competitions().get(0).competitors().get(0);
    Competitor secondTeam = event.competitions().get(0).competitors().get(1);
    innerMap.put("homeTeamName", firstTeam.homeAway().equals("home")
        ? firstTeam.team().displayName() : secondTeam.team().displayName());
    innerMap.put("awayTeamName", firstTeam.homeAway().equals("away")
        ? firstTeam.team().displayName() : secondTeam.team().displayName());
  }
}
