package com.banking.app.utils;

import java.util.Random;

public class RandomPasswordGenerator {
	private static char randomChar() {
		    String alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		    Random r = new Random();
		    char c = alphabet.charAt(r.nextInt(alphabet.length()));
		    return c;
		  }
	
	public static String generatePassword() {
		    String password = "";
		    for (int i = 0; i < 8; i++) {
		      password = password + randomChar();
		    }
		    return password;
		  }
}
