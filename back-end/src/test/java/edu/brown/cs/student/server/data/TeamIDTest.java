package edu.brown.cs.student.server.data;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.squareup.moshi.Moshi;
import edu.brown.cs.student.util.ServerFailureException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class TeamIDTest {
  private static final Moshi moshi = new Moshi.Builder().build();
  private TeamID teamID;

  @BeforeEach
  public void setUp() throws ServerFailureException {
    teamID = new TeamID(moshi);
  }

  @Test
  public void getTeamIDNBA() {
    assertEquals(teamID.getTeamID("atlanta-hawks"), "1");
    assertEquals(teamID.getTeamID("milwaukee-bucks"), "15");
    assertEquals(teamID.getTeamID("charlotte-hornets"), "30");
  }
}
