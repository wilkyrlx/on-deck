package edu.brown.cs.student.main;

import edu.brown.cs.student.server.Server;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.HashSet;
import java.util.List;
import java.util.PriorityQueue;

/** The Main class of our project. This is where execution begins. */
public final class Main {
  /**
   * The initial method called when execution begins.
   *
   * @param args An array of command line arguments
   */
  public static void main(String[] args) {
    new Main(args).run();
  }

  private String[] args;

  private Main(String[] args) {
    this.args = args;
  }

  private void run() {
   if (args.length == 1 && args[0].contains("server")){
      Server.initializeServer();
    }
    // command not recognized
    else {
      System.err.println("Command not recognized, please try again");
    }
  }
}
