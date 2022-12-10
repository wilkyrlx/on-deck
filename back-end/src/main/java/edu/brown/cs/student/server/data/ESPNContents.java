package edu.brown.cs.student.server.data;

import java.util.List;

public record ESPNContents(Team team, List<Event> events) {}

record Team(String displayName, String logo, String recordSummary) {}

record Event(List<Link> links, String date, String time) {}

record Link(String href){}
