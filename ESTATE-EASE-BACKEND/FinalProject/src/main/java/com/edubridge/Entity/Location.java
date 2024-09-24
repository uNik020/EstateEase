package com.edubridge.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long locationId;
    
    @Column(name = "city", length = 20)
    private String city;
    
    @Column(name = "state", length = 20)
    private String state;
    
    @Column(name = "country", length = 20)
    private String country;

    @Column(name = "pin", length = 6)
    private String pin;
    

	@OneToMany(mappedBy = "location", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
    private List<Property> properties;

	public Long getId() {
		return locationId;
	}

	public void setId(Long id) {
		this.locationId = id;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}
	

	public List<Property> getProperties() {
		return properties;
	}

	public void setProperties(List<Property> properties) {
		this.properties = properties;
	}

	public String getPin() {
		return pin;
	}

	public void setPin(String pin) {
		this.pin = pin;
	}

	@Override
	public String toString() {
		return "Location [id=" + locationId + ", city=" + city + ", state=" + state + ", country=" + country + ", pin=" + pin
				+ "]";
	}

	
    
    
}
