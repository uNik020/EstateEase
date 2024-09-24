package com.edubridge.Service;

import java.util.List;

import com.edubridge.Entity.Property;
import com.edubridge.exception.ResourceNotFoundException;

public interface PropertyService {

	public List<Property> getAllProperties();

	public Property createProperty(Property property, long userId);

	Property getPropertyById(Long id);

	public Property saveProperty(Property property);
	
	public List<Property> getPropertiesByCity(String city);
	
	public List<Property> getPropertiesByState(String state);
	
	public List<Property> getPropertiesByCountry(String country);	
	
	public List<Property> getAllExceptOwner(Long userId);

	 Property updateProperty(Long propertyId, Property propertyDetails) throws ResourceNotFoundException;

	public void deleteProperty(Long propertId) throws ResourceNotFoundException;

	public List<Property> getPropertiesByUserId(Long userId);
	
	public Property findPropertyById(Long propertyId);
	
}
