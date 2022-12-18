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
   */
  public record Team(String displayName) {
  }

  /**
   * All the information about an event that we care about.

   * @param links the links to the ESPN gamecast
   * @param date the data and time (in GMT) of the game
   * @param name the name of the game ("Team One at Team Two")
   * @param id the ESPN internal game ID
   * @param competitions the competition of the event
   */
  public record Event(List<Link> links, String date, String name, String id,
      List<Competition> competitions) {

    /**
     * Information about the competition of the event.

     * @param competitors a list of Competitors
     */
    public record Competition(List<Competitor> competitors) {

      /**
       * A team competing in the event.

       * @param homeAway either "home" or "away"
       * @param team information about the team playing
       */
      public record Competitor(String homeAway, Team team){}
    }

    /**
     * A link to the gamecast.

     * @param href the link url
     */
    public record Link(String href){}
  }
}
