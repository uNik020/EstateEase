package com.edubridge.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="wishlist")
public class Wishlist {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="wishlist_id")
	private int wId;
    
    @ManyToOne // Many wishlists can reference the same property
    @JoinColumn(name = "property_id") // Foreign key to the Property entity
    private Property property; // Reference to the Property object

    
    @ManyToOne // Many wishlists can belong to one user
    @JoinColumn(name = "user_id") // Foreign key to the User entity
    private User user; // Reference to the User object
    
	public Wishlist() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Wishlist(int wId, Property property, User user) {
		super();
		this.wId = wId;
		this.property = property;
		this.user = user;
	}

	public int getwId() {
		return wId;
	}

	public void setwId(int wId) {
		this.wId = wId;
	}

	public Property getProperty() {
		return property;
	}

	public void setProperty(Property property) {
		this.property = property;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Wishlist [wId=" + wId + ", property=" + property + ", user=" + user + "]";
	}
	
}
