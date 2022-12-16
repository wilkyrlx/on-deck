package edu.brown.cs.student.util;

/**
 * A class for any exception thrown during the process of running the server.
 */
public class ServerFailureException extends Exception{
  /**
   * Constructs a new exception with the specified detail message.

   * @param message the detail message. The detail message is saved for later retrieval by the
   *                {@link #getMessage()} method.
   */
  public ServerFailureException(String message) {
    super(message);
  }
}
