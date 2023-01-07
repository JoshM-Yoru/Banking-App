package com.banking.app.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.banking.app.models.Account;
import com.banking.app.models.CreditCard;
import com.banking.app.models.TransactionData;
import com.banking.app.models.TransactionType;
import com.banking.app.repositories.AccountRepository;
import com.banking.app.repositories.CreditCardRepository;
import com.banking.app.repositories.TransactionRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class TransactionDataService {
	private AccountRepository aRepo;
	private TransactionRepository tRepo;
	private CreditCardRepository ccRepo;
	
	public TransactionData createTransaction(TransactionData t) {
		return tRepo.save(t);
	}
	
	public void deleteTransaction(Integer transactionId) {
		tRepo.deleteById(transactionId);
	}
	
	public List<TransactionData> getTransactionsByAccountId(UUID accountId) {
		Account a = aRepo.getAccountByAccountId(accountId);
		return tRepo.getTransactionsByAccount(a);
	}
	
	public List<TransactionData> getTransactionsByCardId(Long cardId) {
		CreditCard c = ccRepo.getCreditCardByCardId(cardId);
		return tRepo.getTransactionsByCreditCard(c);
	}
	
	public List<TransactionData> getTransactionsByType(TransactionType t) {
		return tRepo.getTransactionsByType(t);
	}
	 
	public TransactionData getTransactionDataByTransactionId(Integer transactionId) {
		return tRepo.getTransactionDataByTransactionId(transactionId);
	}
}
