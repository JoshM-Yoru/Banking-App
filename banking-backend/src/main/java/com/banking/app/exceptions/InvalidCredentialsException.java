package com.banking.app.exceptions;

public class InvalidCredentialsException extends RuntimeException {

  private static final long serialVersionUID = 1L;

  public InvalidCredentialsException() {
    super("Incorrect username or password.");
  }

}
