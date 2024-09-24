package com.edubridge.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.edubridge.Entity.User;
import com.edubridge.Service.UserService;


@RestController
@RequestMapping("api/user")
@CrossOrigin(origins="http://localhost:4200")
public class UserController {

	private final UserService userService;
	
	public UserController(UserService userService) {
		this.userService=userService;
	}
	
	@PostMapping("/register")
	public ResponseEntity<User> registerUser(@Validated @RequestBody User user){
		System.out.println(user);
		User registeredUser=userService.registerUser(user);
		return new ResponseEntity<> (registeredUser,HttpStatus.CREATED);
	}
	
	@PostMapping("/login")
	public ResponseEntity<Object> loginUser(@RequestBody User user){
			User loggedInUser=userService.loginUser(user.getEmail(),user.getPassword());//user obj
			if(loggedInUser != null) {
				return new ResponseEntity<>(loggedInUser, HttpStatus.OK);
			}
			else {
				return new ResponseEntity<>("Login Failed! Invalid Email or Password.",HttpStatus.OK);
			}
			
	}
	
	@GetMapping("/userId/{userId}")
	public ResponseEntity<User> getUserById(@PathVariable("userId")int id)
	{
		return new ResponseEntity<User>(userService.getUserById(id),HttpStatus.OK);
	}
	
	
	@PutMapping("/{userId}")
	public ResponseEntity<User> updateUser(@PathVariable("userId")int id, @RequestBody User user)
	{
		return new ResponseEntity<User>(userService.updateUser(id,user),HttpStatus.OK);
	}
	
	@DeleteMapping("/{userId}")
	public List<User> getAllCustomers(@PathVariable ("userId") int id)
	{
		return userService.deleteUserById(id);
	}
	
	@GetMapping("/getByEmail/{email}")
	public ResponseEntity<User> getUserByEmail(@PathVariable("email")String email)
	{
		return new ResponseEntity<User>(userService.findByEmail(email),HttpStatus.OK);
	}
	
}
