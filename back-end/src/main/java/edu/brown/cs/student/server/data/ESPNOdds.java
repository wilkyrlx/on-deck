package edu.brown.cs.student.server.data;

import java.util.List;

public record ESPNOdds(List<Item> items) {
  public record Item(double overUnder, double spread) {}
}
