package com.banking.app.utils;

public class IdGenerator {

  private static final int iMin = 1000;
  private static final int iMax = 9999;
  private static final int aMin = 100000;
  private static final int aMax = 999999;

  public static String generateId(String fName, String lName) {
    String toReturn = "";
    toReturn += fName.charAt(0);
    int num1 = (int) Math.floor(Math.random() * (iMax - iMin + 1) + iMin);
    toReturn += num1;
    toReturn += lName.charAt(0);
    int num2 = (int) Math.floor(Math.random() * (iMax - iMin + 1) + iMin);
    toReturn += num2;
    return toReturn;
  }

  public static String generateID(String t) {
    String toReturn = "";
    toReturn += t.substring(0, 2);
    int num1 = (int) Math.floor(Math.random() * (aMax - aMin + 1) + aMin);
    toReturn += num1;
    return toReturn;
  }
}
