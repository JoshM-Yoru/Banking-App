package com.banking.app.utils;

public class LimitCalculator {

	public static Double calcCreditLimit(double income, double debt, double dti) {
		double cDti = debt/income;
		double dDti = dti - cDti;
		double limit = income*dDti;
		return limit;
	}
	
	public static double calcMaxDti(int age, int score) {
		int[] ageRange = {19, 24, 29, 39, 59, 79};
		int[] scoreRange = {579, 669, 739, 799, 850};
		if(score>850) 
			score = 850;
		
		double[][] maxDtiTable = 
				{{0.18,   0.36,  0.48,  0.54,  0.6}, 
				{0.198,  0.396, 0.528, 0.594, 0.66}, 
				{0.27,   0.54,  0.72,  0.81,  0.9}, 
				{0.324,  0.648, 0.864, 0.972, 1.08}, 
				{0.36,   0.72,  0.96,  1.08,  1.2}, 
				{0.288,  0.576, 0.768, 0.864, 0.96}, 
				{0.252,  0.504, 0.672, 0.756, 0.84}};
		
		
		
		int x = findIndex(age, ageRange);
		int y = findIndex(score, scoreRange);
		
		double maxDti = maxDtiTable[x][y];
		return maxDti;
	}
	
	public static int findIndex(int num, int[] arr) {
		int index = 0;
		for(int i : arr) {
			if (num > i)
				index += 1;
			else 
				break;
		}
		
		return index;
	}
	
	
	public static Double easyCalc(Double income, Double debt, Integer score) {
		double net = income - debt;
		double perScore = (double) (score/100);
		if(net<= 0) {
			return 0.0;
		}else {
			return net*perScore;
		}
	}
	
}
