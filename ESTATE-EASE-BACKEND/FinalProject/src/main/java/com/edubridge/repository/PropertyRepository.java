package com.edubridge.repository;

import com.edubridge.Entity.Property;
import com.edubridge.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long> {
    
	List<Property> findByLocationCity(String city);
	
    List<Property> findByLocationState(String state);
    
    List<Property> findByLocationCountry(String country);
	
	List<Property> findByLocation_CityOrLocation_StateOrLocation_CountryOrLocation_Pin(String city, String state,
			String country, String pin);
	
	List<Property> findAll();
	
	// Find properties that are not posted by the logged-in user
	@Query("SELECT p FROM Property p WHERE p.owner.id != :ownerId")
	List<Property> findAllExceptByOwner(@Param("ownerId") Long ownerId);

	List<Property> findByOwner(User owner);

}
