package edu.brown.cs.student.util;

import edu.brown.cs.student.server.data.ESPNContents.Event;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

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
    // TODO: write
    return List.copyOf(this.eventScores.keySet());
  }
}
