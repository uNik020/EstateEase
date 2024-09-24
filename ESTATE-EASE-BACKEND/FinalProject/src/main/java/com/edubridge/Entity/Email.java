package com.edubridge.Entity;

public class Email {
	private String setTo;
	private String setSubject;
	private String setText;
	
	public Email() {
		super();
	}
	
	public Email(String setTo, String setSubject, String setText) {
		super();
		this.setTo = setTo;
		this.setSubject = setSubject;
		this.setText = setText;
	}
	public String getSetTo() {
		return setTo;
	}
	public void setSetTo(String setTo) {
		this.setTo = setTo;
	}
	public String getSetSubject() {
		return setSubject;
	}
	public void setSetSubject(String setSubject) {
		this.setSubject = setSubject;
	}
	public String getSetText() {
		return setText;
	}
	public void setSetText(String setText) {
		this.setText = setText;
	}
	
	

}
