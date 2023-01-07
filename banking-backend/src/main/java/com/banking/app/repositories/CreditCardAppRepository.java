package com.banking.app.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.banking.app.models.CreditCardApp;
import com.banking.app.models.CreditCardAppStatus;

@Repository
public interface CreditCardAppRepository extends JpaRepository<CreditCardApp, Integer> {
	
	List<CreditCardApp> getCreditCardAppsByStatus(CreditCardAppStatus s);
	CreditCardApp getCreditCardAppByApplicationId(Integer applicationId);
}
