package com.edubridge.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Property {
	@Id
	@GeneratedValue (strategy=GenerationType.IDENTITY)
	@Column(name="Property_id")
	private Long propertyId;
	
	@Column(name = "Type", length = 30)
	//@Enumerated(EnumType.STRING)
	private String propertyType ;
	 
	@Column(name = "status", length = 30)
	//@Enumerated(EnumType.STRING)
    private String propertyStatus;
		
	@Column(name="ImagePath", length=100)
	private String propertyImgPath;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "location_id", nullable = false)
	private Location location;
    
	private Double price;
    
	@Column(name="Area")
	private Double area;

	@Column(name = "bedrooms", length = 30)
	//@Enumerated(EnumType.STRING)
	private String bedrooms;
	
	@Column(name = "bathrooms", length = 30)
	//@Enumerated(EnumType.STRING)
	private String bathrooms;
	
    @Column(name="Description", length=500)
    private String description;
	
    @Column(name="Owner_name", length=100)
    private String ownerName;
    
    @Column(name="owners_contact", length=100)
    private String contactNumber;
    
    @Column(name="owners_email", length=100)
    private String email;
    
    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    //@JsonIgnore
    private User owner;
	
	public Property() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Property(Long propertyId, String propertyType, String propertyStatus, String propertyImgPath,
			Location location, Double price, Double area, String bedrooms, String bathrooms, String description,
			String ownerName, String contactNumber, String email, User owner) {
		super();
		this.propertyId = propertyId;
		this.propertyType = propertyType;
		this.propertyStatus = propertyStatus;
		this.propertyImgPath = propertyImgPath;
		this.location = location;
		this.price = price;
		this.area = area;
		this.bedrooms = bedrooms;
		this.bathrooms = bathrooms;
		this.description = description;
		this.ownerName = ownerName;
		this.contactNumber = contactNumber;
		this.email = email;
		this.owner = owner;
	}

	public Long getPropertyId() {
		return propertyId;
	}

	public void setPropertyId(Long propertyId) {
		this.propertyId = propertyId;
	}

	public String getPropertyType() {
		return propertyType;
	}

	public void setPropertyType(String propertyType) {
		this.propertyType = propertyType;
	}

	public String getPropertyStatus() {
		return propertyStatus;
	}

	public void setPropertyStatus(String propertyStatus) {
		this.propertyStatus = propertyStatus;
	}

	public String getPropertyImgPath() {
		return propertyImgPath;
	}

	public void setPropertyImgPath(String propertyImgPath) {
		this.propertyImgPath = propertyImgPath;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Double getArea() {
		return area;
	}

	public void setArea(Double area) {
		this.area = area;
	}

	public String getBedrooms() {
		return bedrooms;
	}

	public void setBedrooms(String bedrooms) {
		this.bedrooms = bedrooms;
	}

	public String getBathrooms() {
		return bathrooms;
	}

	public void setBathrooms(String bathrooms) {
		this.bathrooms = bathrooms;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getOwnerName() {
		return ownerName;
	}

	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public User getUser() {
		return owner;
	}

	public void setUser(User user) {
		this.owner = user;
	}

	@Override
	public String toString() {
		return "Property [propertyId=" + propertyId + ", propertyType=" + propertyType + ", propertyStatus="
				+ propertyStatus + ", propertyImgPath=" + propertyImgPath + ", price="
				+ price + ", area=" + area + ", bedrooms=" + bedrooms + ", bathrooms=" + bathrooms + ", description="
				+ description + ", ownerName=" + ownerName + ", contactNumber=" + contactNumber + ", email=" + email
				+ "]";
	}


	
}

