package edu.brown.cs.student.util;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class WebResponse {
  /**
   * Makes an HTTP Request to the given URL and returns the corresponding HTTP Response.

   * @param url the URL to access
   * @return the response of the HTTP GET request
   * @throws IOException if an I/O error occurs when sending or receiving
   * @throws InterruptedException if the operation is interrupted
   */
  public static HttpResponse<String> getWebResponse(String url)
      throws IOException, InterruptedException {
    HttpClient client = HttpClient.newHttpClient();
    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create(url))
        .build();
    return client.send(request,
        HttpResponse.BodyHandlers.ofString());
  }
}
