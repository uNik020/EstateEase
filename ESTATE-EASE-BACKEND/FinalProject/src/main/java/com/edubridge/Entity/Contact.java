package com.edubridge.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="contact_table")
public class Contact 
{

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "contact_id" )
	private int contact_id;
	@Column(length = 50)
	private String contact_name; 
	@Column(length = 50)
	private String contact_email;
	private String message;
	private boolean isActive;
	
	public int getContact_id() {
		return contact_id;
	}
	public void setContact_id(int contact_id) {
		this.contact_id = contact_id;
	}
	public String getContact_name() {
		return contact_name;
	}
	public void setContact_name(String contact_name) {
		this.contact_name = contact_name;
	}
	public String getContact_email() {
		return contact_email;
	}
	public void setContact_email(String contact_email) {
		this.contact_email = contact_email;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	public boolean isActive() {
		return isActive;
	}
	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}
	public Contact(int contact_id, String contact_name, String contact_email, String message, boolean isActive) {
		super();
		this.contact_id = contact_id;
		this.contact_name = contact_name;
		this.contact_email = contact_email;
		this.message = message;
		this.isActive = isActive;
	}
	public Contact() 
	{
		
	}
	@Override
	public String toString() {
		return "ConatctUs [contact_id=" + contact_id + ", contact_name=" + contact_name + ", contact_email=" + contact_email
				+ ", message=" + message + "]";
	}
	
}