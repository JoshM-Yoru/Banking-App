package com.banking.app.controllers;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.banking.app.models.Account;
import com.banking.app.models.CreditCard;
import com.banking.app.models.TransactionData;
import com.banking.app.models.TransactionType;
import com.banking.app.services.AccountService;
import com.banking.app.services.CreditCardService;
import com.banking.app.services.TransactionDataService;
import com.banking.app.utils.TransactionMessageGenerator;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("transactions")
@CrossOrigin("*")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class TransactionController {
	
	private TransactionDataService tdServ;
	private AccountService aServ;
	private CreditCardService ccServ;
	
	@GetMapping("/account/{accountId}")
	public List<TransactionData> getTransactionsByAccountId(@PathVariable("accountId")UUID accountId) {
		return tdServ.getTransactionsByAccountId(accountId);
	}
	
	@GetMapping("/credit-card/{cardId}")
	public List<TransactionData> getTransactionsByCardId(@PathVariable("cardId")Long cardId) {
		return tdServ.getTransactionsByCardId(cardId);
	}
	
	@GetMapping("/type/{typeId}")
	public List<TransactionData> getTransactionsByType(@PathVariable("typeId")String typeId) {
		TransactionType t = TransactionType.valueOf(typeId);
		return tdServ.getTransactionsByType(t);
	}
	
	// Used to create dummy transaction data
	@PostMapping("/transaction/create")
	public TransactionData createTransaction(@RequestBody LinkedHashMap<String, String> body) {
		String type = body.get("type");
		Double amount = Double.parseDouble(body.get("amount"));
		String message = TransactionMessageGenerator.generateMessage(TransactionType.valueOf(type), amount);
		LocalDate date = LocalDate.now();
		
		TransactionData td = new TransactionData();
		td.setType(TransactionType.valueOf(type));
		td.setAmount(amount);
		td.setMessage(message);
		td.setDate(date);
		
		if (body.get("accountId") != null) {
			UUID accountId = UUID.fromString(body.get("accountId"));
			Account userAccount = aServ.getAccountByAccountId(accountId);
			
			td.setAccount(userAccount);
			return tdServ.createTransaction(td);
			
		} else {
			Long cardId = Long.parseLong(body.get("cardId"));
			CreditCard card = ccServ.getCreditCardByCardId(cardId);
			
			td.setCreditCard(card);
			return tdServ.createTransaction(td);
		}
	}

}
