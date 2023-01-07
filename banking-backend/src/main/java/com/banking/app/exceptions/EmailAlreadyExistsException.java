package com.banking.app.exceptions;

public class EmailAlreadyExistsException extends RuntimeException {

  /**
   * 
   */
  private static final long serialVersionUID = 1L;

  public EmailAlreadyExistsException() {
    super("This email address is not available. Please log in or register with a different email address.");
  }
}
