package edu.brown.cs.student.util;

import edu.brown.cs.student.server.data.ESPNContents.Event;
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
    Map<Event, Integer> sortedMap = this.sortByComparator(this.eventScores);

    List<Event> allEvents = List.copyOf(sortedMap.keySet());
    List<Event> topEventsList = new ArrayList<>();

    for (int i = 0; i < count && i < allEvents.size(); i++) {
      topEventsList.add(allEvents.get(i));
    }
    return List.copyOf(topEventsList);  // defensive programming
  }

  private Map<Event, Integer> sortByComparator(Map<Event, Integer> unsortMap) {
    // from https://stackoverflow.com/a/19671853
    List<Entry<Event, Integer>> list = new LinkedList<>(unsortMap.entrySet());
    list.sort((o1, o2) -> o2.getValue().compareTo(o1.getValue()));

    Map<Event, Integer> sortedMap = new LinkedHashMap<>();
    for (Entry<Event, Integer> entry : list) {
      sortedMap.put(entry.getKey(), entry.getValue());
    }
    return sortedMap;
  }



}
