package com.edubridge.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.edubridge.Entity.Property;
import com.edubridge.Entity.User;
import com.edubridge.Entity.Wishlist;

public interface WishlistRepository extends JpaRepository<Wishlist, Integer> {

	@Query("SELECT w FROM Wishlist w WHERE w.user.id = ?1")
	public List<Wishlist> findByUserId(long ownerId);

	@Modifying
	@Transactional
	@Query("DELETE FROM Wishlist w WHERE w.user.id = ?1")
	public void deleteUserWishlist(long ownerId);
	
	 
    void deleteByPropertyAndUser(Property property, User user);
    
    Wishlist findByPropertyAndUser(Property property, User user);
}
