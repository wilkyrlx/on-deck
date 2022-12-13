package edu.brown.cs.student.server.data;

import java.util.List;

public record ESPNContents(Team team, List<Event> events) {
  public record Team(String displayName, String logo, String recordSummary) {}
  public record Event(List<Link> links, String date, String name) {
    /* The time within the date is GMT (need to correct in front-end) */
    public record Link(String href){}
  }
}
