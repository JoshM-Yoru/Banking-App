package com.banking.app.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.banking.app.models.CreditCardApp;
import com.banking.app.models.CreditCardAppStatus;

import com.banking.app.repositories.CreditCardAppRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class CreditCardAppService {
	private CreditCardAppRepository ccaRepo;
	
	public CreditCardApp createCreditCardApp(CreditCardApp app) {
		return ccaRepo.save(app);
	}
	
	public List<CreditCardApp> getCreditCardAppsByStatus(CreditCardAppStatus s){
		return ccaRepo.getCreditCardAppsByStatus(s);
	}
	
	public CreditCardApp getCreditCardAppByApplicationId(Integer applicationId) {
		return ccaRepo.getCreditCardAppByApplicationId(applicationId);
	}
	
}
