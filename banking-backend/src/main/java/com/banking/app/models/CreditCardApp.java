package com.banking.app.models;

import com.banking.app.utils.LimitCalculator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "credit_card_apps")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreditCardApp {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "application_id")
	private Integer applicationId;
	
	@Enumerated(EnumType.STRING)
	private CreditCardAppStatus status;
	
	@OneToOne(mappedBy = "app")
	private CreditCard card;
	
	private String applicant;
	
	private Integer age;

	@Column(name = "credit_score")
	private Integer creditScore;
	
	@Column(name = "monthly_income")
	private Double monthlyIncome;
	
	@Column(name = "net_worth")
	private Double netWorth;
	
	@Column(name = "estimated_debt")
	private Double estimatedDebt;
	
	@Column(name = "approved_limit")
	private Double approvedLimit;
	
	public void setApprovedLimit(Integer age, Integer creditScore, Double income, Double debt) {
		Double dti = LimitCalculator.calcMaxDti(age, creditScore);
		Double lim = LimitCalculator.calcCreditLimit(income, creditScore, dti);
		this.approvedLimit = lim;
	}
}
