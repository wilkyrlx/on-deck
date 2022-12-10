package edu.brown.cs.student.server.data;

import java.util.List;

public record ESPNTeams(List<Sport> alos) {
  public record Sport(List<League> alol) {
    public record League(List<TeamWrapper> alot) {
      public record TeamWrapper(Team t) {
        public record Team(String id, String displayName, String color, List<Logo> logoList, List<Link> linkList) {
          public record Logo(String href) {

          }
          public record Link(String href) {

          }
        }
      }
    }
  }
}