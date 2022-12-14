package edu.brown.cs.student.server.data;

import java.util.List;

/**
 * A record to match the ESPN API JSON structure.

 * @param team the team to fetch
 * @param events the games that team is playing
 */
public record ESPNContents(Team team, List<Event> events) {

  /**
   * All the information about a team that we care about.

   * @param displayName their full name
   * @param logo a link to their logo
   * @param recordSummary their current win-loss record
   * @param color the primary team color, as a hex code
   */
  public record Team(String displayName, String logo, String recordSummary, String color) {}

  /**
   * All the information about an event that we care about.

   * @param links the links to the ESPN gamecast
   * @param date the data and time (in GMT) of the game
   * @param name the name of the game ("Team One at Team Two")
   * @param id the ESPN internal game ID
   */
  public record Event(List<Link> links, String date, String name, String id) {

    /**
     * A link to the gamecast.

     * @param href the link url
     */
    public record Link(String href){}
  }
}
