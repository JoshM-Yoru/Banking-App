package com.banking.app.exceptions;

public class NotAnEmployeeException extends RuntimeException {

  /**
   * 
   */
  private static final long serialVersionUID = 1L;

  public NotAnEmployeeException() {
    super("User does not have the required organizational roles to access this information.");
  }

}
