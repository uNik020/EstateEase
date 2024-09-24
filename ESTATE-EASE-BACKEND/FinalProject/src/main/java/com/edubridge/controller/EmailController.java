package com.edubridge.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edubridge.Entity.Email;
import com.edubridge.Service.EmailService;
import com.google.gson.Gson;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class EmailController {
	@Autowired
	private EmailService emailService;

	@PostMapping("/email/")
	public ResponseEntity<String> checkEmail(@RequestBody Email email) {
		emailService.sendEmail(email.getSetTo(), email.getSetSubject(), email.getSetText());
		Gson gson = new Gson();
		return new ResponseEntity<String>(gson.toJson("Message send"),HttpStatus.OK);
	}
}