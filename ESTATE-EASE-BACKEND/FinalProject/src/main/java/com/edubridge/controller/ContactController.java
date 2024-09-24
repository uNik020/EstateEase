package com.edubridge.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.edubridge.Entity.Contact;
import com.edubridge.Service.ContactService;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/contact/")
public class ContactController {

	@Autowired
	private ContactService contactService;
	
	@PostMapping
	public ResponseEntity<Contact> saveContactUs(@RequestBody @Validated Contact contact)
	{
		return new ResponseEntity<Contact>(contactService.saveContact(contact),HttpStatus.CREATED);
	}
	
	@GetMapping
	public List<Contact> getAllContactUss()
	{
		return contactService.getAllContactUss();
	}
	
	@GetMapping("{contactId}")
	public ResponseEntity<Contact> getContactUsById(@PathVariable("contactId")int id)
	{
		return new ResponseEntity<Contact>(contactService.getContactById(id),HttpStatus.OK);
	}
	
	@PutMapping("{contactId}/{isActive}")
	public ResponseEntity<Contact> updateContactUs(@PathVariable("contactId")int id,@PathVariable("isActive")boolean isActive)
	{
		return new ResponseEntity<Contact>(contactService.updateContact(id, isActive),HttpStatus.OK);
	}
	
	@DeleteMapping("{contactId}")
	public List<Contact> getAllContactUss(@PathVariable ("contactId") int id)
	{
		return contactService.deleteContactById(id);
	}
	
	@GetMapping("getContactUsByStatus/{isActive}")
	public List<Contact> getContactUsByStatus(@PathVariable("isActive")boolean isActive)
	{
		return contactService.findByIsActive(isActive);
	}
	
}