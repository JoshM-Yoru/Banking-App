package com.banking.app.services;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.banking.app.models.Account;
import com.banking.app.models.AccountType;
import com.banking.app.models.TransactionData;
import com.banking.app.models.TransactionType;
import com.banking.app.models.User;
import com.banking.app.repositories.AccountRepository;
import com.banking.app.repositories.TransactionRepository;
import com.banking.app.repositories.UserRepository;
import com.banking.app.utils.TransactionMessageGenerator;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class AccountService {
  private AccountRepository aRepo;
  private UserRepository uRepo;
  private TransactionRepository tRepo;

  public Account createAccount(Account a) {
    return aRepo.save(a);
  }

  public List<Account> getAccountsByUserId(UUID userId) {
    User u = uRepo.findByUserId(userId);
    
    return aRepo.getAccountsByUser(u);
  }

  public Account getAccountByAccountId(UUID accountId) {
    return aRepo.getAccountByAccountId(accountId);
  }

  public List<Account> getAccountsByType(AccountType t) {
    return aRepo.getAccountsByType(t);
  }

  public TransactionData transferBetweenAccounts(UUID accountIdFrom, UUID accountIdTo, Double amount) {
    Account from = aRepo.getAccountByAccountId(accountIdFrom);
    Account to = aRepo.getAccountByAccountId(accountIdTo);

    double fromA = from.getBalance() - amount;
    from.setBalance(fromA);
    double toA = to.getBalance() + amount;
    to.setBalance(toA);
    aRepo.save(from);
    aRepo.save(to);
    LocalDate date = LocalDate.now();

    TransactionData tFrom = new TransactionData();
    tFrom.setAccount(from);
    tFrom.setAmount(amount);
    tFrom.setType(TransactionType.WITHDRAW);
    tFrom.setDate(date);
    tFrom.setMessage(TransactionMessageGenerator.generateMessage(TransactionType.WITHDRAW, amount));

    TransactionData tTo = new TransactionData();
    tTo.setAccount(to);
    tTo.setAmount(amount);
    tFrom.setType(TransactionType.DEPOSIT);
    tTo.setDate(date);
    tTo.setMessage(TransactionMessageGenerator.generateMessage(TransactionType.DEPOSIT, amount));

    tRepo.save(tTo);
    tRepo.save(tFrom);

    return tFrom;
  }
}
