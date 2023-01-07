package com.banking.app;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import com.banking.app.repositories.TransactionRepository;
import com.banking.app.services.TransactionDataService;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK, classes= AppApplication.class)
@AutoConfigureTestDatabase
@AutoConfigureMockMvc
class TransactionControllerTest {
	
	@Autowired
	private MockMvc mockMvc;
	
	@Autowired
	TransactionDataService tServ;
	
	@Autowired
	TransactionRepository tRepo;
	
	private ObjectMapper om = new ObjectMapper();
	
	@BeforeEach
	public void resetDatabase() {
		System.out.println("Run before each test");
		tRepo.deleteAll();
		}

}
