package edu.brown.cs.student.util;

import edu.brown.cs.student.server.data.ESPNContents.Event;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Scorer {
  private final Map<Event, Integer> eventScores;

  public Scorer() {
    this.eventScores = new LinkedHashMap<>();
  }

  public void addEvent(Event event) {
    Integer score = this.scoreEvent(event);
    this.eventScores.put(event, score);
  }

  private Integer scoreEvent(Event event) {
    // TODO: write
    return 1;
  }

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
    return List.copyOf(topEventsList);
  }


}
