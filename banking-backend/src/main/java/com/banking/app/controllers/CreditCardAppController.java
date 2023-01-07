package com.banking.app.controllers;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.banking.app.models.User;
import com.banking.app.models.CreditCard;
import com.banking.app.models.CreditCardApp;
import com.banking.app.models.CreditCardAppStatus;
import com.banking.app.services.CreditCardService;
import com.banking.app.services.UserService;

import com.banking.app.services.CreditCardAppService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("credit-card-app")
@CrossOrigin("*")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class CreditCardAppController {

  private CreditCardAppService ccaServ;
  private CreditCardService ccServ;
  private UserService uServ;

  @GetMapping("/status/{status}")
  public List<CreditCardApp> getCreditCardAppsByStatus(@PathVariable("status") String status) {
    CreditCardAppStatus appStatus = CreditCardAppStatus.valueOf(status.toUpperCase());
    return ccaServ.getCreditCardAppsByStatus(appStatus);
  }

  @GetMapping("/applicationId/{applicationId}")
  public CreditCardApp getCreditCardAppByApplicationId(@PathVariable("applicationId") Integer applicationId) {
    return ccaServ.getCreditCardAppByApplicationId(applicationId);
  }

  @PostMapping("/create")
  public CreditCardApp createCreditCardApp(@RequestBody LinkedHashMap<String, String> body) {
    Integer age = Integer.parseInt(body.get("age"));
    UUID userId = UUID.fromString(body.get("userId"));
    User u = uServ.getUserByUserId(userId);
    String email = u.getEmail();

    Integer creditScore = Integer.parseInt(body.get("creditScore"));
    Double monthlyIncome = Double.parseDouble(body.get("monthlyIncome"));
    Double netWorth = Double.parseDouble(body.get("netWorth"));
    Double estDebt = Double.parseDouble(body.get("totalMiscPayments")) + Double.parseDouble(body.get("rent"))
        + Double.parseDouble(body.get("carPayment"));

    CreditCardApp app = new CreditCardApp();
    app.setStatus(CreditCardAppStatus.APPROVED);
    app.setAge(age);
    app.setCreditScore(creditScore);
    app.setMonthlyIncome(monthlyIncome);
    app.setNetWorth(netWorth);
    app.setEstimatedDebt(estDebt);
    app.setApprovedLimit(age, creditScore, monthlyIncome, estDebt);
    app.setApplicant(email);

    CreditCard card = new CreditCard();
    card.setUser(u);
    card.setCreditLimit(app.getApprovedLimit());
    card.setBalance(0.0);
    card.setApp(app);

    ccServ.createCreditCard(card);

    app.setCard(ccServ.getCreditCardByUser(u));

    return ccaServ.createCreditCardApp(app);
  }

}
