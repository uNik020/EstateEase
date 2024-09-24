package com.edubridge;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.List;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.edubridge.Entity.Property;
import com.edubridge.Entity.User;
import com.edubridge.Service.PropertyService;
import com.edubridge.Service.UserService;

@SpringBootTest
class FinalProjectApplicationTests {

	@Autowired
	private UserService userService;
	
	@Autowired
	private PropertyService propertyService;
	
	@Disabled
	@Test
	void contextLoads() {
		User user=new User();
		
		user.setEmail("nikhil91289@gmail.com");
		user.setPassword("Nikhil@123");
		user.setPhone("1234567890");
		user.setUsername("nikhil");
		assertNotNull(userService.registerUser(user));
		
		System.out.println("message");
	}
	
	@Test
	void testGetAllProperties() {
		
		List<Property> plist= propertyService.getAllProperties();
		
		assertEquals(6, plist.size());
		
		System.out.println("message");
	}
	
}
