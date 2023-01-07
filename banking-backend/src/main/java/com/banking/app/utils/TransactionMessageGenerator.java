package com.banking.app.utils;

import com.banking.app.models.TransactionType;

public class TransactionMessageGenerator {

  public static String generateMessage(TransactionType type, Double amount) {
	  String message = "Unidentified Transaction.";
	  switch(type) {
	  	case WITHDRAW :
		  message = "A widthdrawal of $" + amount + " was made.";
		  break;
	  	case DEPOSIT :
	  		message = "A deposit of $" + amount + " was made.";
	        break;
	  	case TRANSFER :
	  		message = "A transfer of $" + amount + " was made.";
	        break;
	  	case PAY :
	  		message = "A payment of $" + amount + " was made.";
	  	case PURCHASE:
	  		message = "A purchase of $"+amount+" was made.";
	  }
	  return message;
  }
}
