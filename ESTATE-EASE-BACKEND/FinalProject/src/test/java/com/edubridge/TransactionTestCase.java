package com.edubridge;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.edubridge.Entity.Transaction;
import com.edubridge.Entity.User;
import com.edubridge.Service.TransactionService;
import com.edubridge.Service.UserService;

@SpringBootTest
class TransactionTestCase {

	@Autowired
	private TransactionService  transactionService;
	
	@Autowired
	private static UserService userService;
	
	private static Transaction transaction;

	private static User user;
	
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		User user=new User();
		user.setUserId(new Long(80));
		user.setUsername("akshay");
		user.setEmail("akshay@gmail.com");
		user.setPassword("Akshay@123");
		
		userService.registerUser(user);
		
		User buser=new User();
		buser.setUserId(new Long(20));
		buser.setUsername("priti");
		buser.setEmail("priti@gmail.com");
		buser.setPassword("Priti@123");
		
		userService.registerUser(buser);
		
		
		transaction=new Transaction(); 
		transaction.setAmount(new Double(940000.00));
		transaction.setOwner(user);
		transaction.setBuyer(buser);
		transaction.setDate(null);
		transaction.setTime(null);
		
		
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@AfterEach
	void tearDown() throws Exception {
	}

	
}
