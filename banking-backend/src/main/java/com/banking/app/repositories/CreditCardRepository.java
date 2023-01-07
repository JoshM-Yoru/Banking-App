package com.banking.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.banking.app.models.User;
import com.banking.app.models.CreditCard;

@Repository
public interface CreditCardRepository  extends JpaRepository<CreditCard, Integer> {
	
	CreditCard getCreditCardByUser(User u);
	CreditCard getCreditCardByCardId(Long cardId);
}
