package edu.brown.cs.student.util;

import edu.brown.cs.student.server.data.ESPNContents.Event;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * A class to score all the Events based on how interesting they are.
 */
public final class Scorer {
  private final Map<Event, Integer> eventScores;

  /**
   * Constructs a new instance of Scorer, by initializing the eventScores Map.
   */
  public Scorer() {
    this.eventScores = new LinkedHashMap<>();
  }

  /**
   * Adds the Event and its interest score to the Map.

   * @param event a sports game pulled from the ESPN API
   */
  public void addEvent(Event event) {
    Integer score = this.scoreEvent(event);
    this.eventScores.put(event, score);
  }

  /**
   * Scores the given event based on how interesting it is.

   * @param event a sports game pulled from the ESPN API
   * @return a number representing how interesting the game should be (higher = more interesting)
   */
  private Integer scoreEvent(Event event) {
    // TODO: write
    return 1;
  }

  /**
   * Returns the events with the highest interest scores.

   * @param count how many events to return (should always be >= 1)
   * @return a defensive copy of the top events in a list of size count
   */
  public List<Event> getMostInterestingEvents(int count) {
    // TODO: test this!!
    // from https://stackoverflow.com/a/19671853
    Map<Event, Integer> sortedMap =
        this.eventScores.entrySet().stream()
            .sorted(Map.Entry.comparingByValue())
            .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue,
                (e1, e2) -> e1, LinkedHashMap::new));  // need to reverse??

    List<Event> allEvents = List.copyOf(this.eventScores.keySet());
    List<Event> topEventsList = new ArrayList<>();

    for (int i = 0; i < count && i < allEvents.size(); i++) {
      topEventsList.add(allEvents.get(i));
    }
    return List.copyOf(topEventsList);  // defensive programming
  }


}
