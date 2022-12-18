package edu.brown.cs.student.server.data;

import java.util.List;

public record ESPNTeams(List<Sport> sports) {
  public record Sport(List<League> leagues) {
    public record League(List<TeamWrapper> teams) {
      public record TeamWrapper(Team team) {
        public record Team(String id, String slug, String color, List<Logo> logos, List<Link> links) {
          public record Logo(String href) {}
          public record Link(String href) {}
        }
      }
    }
  }
}