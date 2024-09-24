package com.edubridge.Service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edubridge.Entity.Location;
import com.edubridge.Entity.Property;
import com.edubridge.Entity.User;
import com.edubridge.exception.ResourceNotFoundException;
import com.edubridge.repository.LocationRepository;
import com.edubridge.repository.PropertyRepository;
import com.edubridge.repository.UserRepository;

@Service
public class PropertyServiceImpl implements PropertyService{

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private LocationRepository locationRepository;
    
    @Autowired
    private UserRepository userRepository;
    
	@Override
	public Property createProperty(Property property, long userId) {
		// TODO Auto-generated method stub
		System.out.println("Inside backend service");//testing
    	locationRepository.save(property.getLocation());
        System.out.println("location");    	
        System.out.println(property);    //testing	
        User owner = userRepository.findById(userId);
        property.setUser(owner); // Set the owner of the property
        return propertyRepository.save(property);
	}
    
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public Property getPropertyById(Long propertyId) {
        return propertyRepository.findById(propertyId).orElseThrow(()->new ResourceNotFoundException("Property","PropertyId",propertyId));
    }

    public List<Property> getPropertiesByCity(String city) {
        return propertyRepository.findByLocationCity(city);
    }

    public List<Property> getPropertiesByState(String state) {
        return propertyRepository.findByLocationState(state);
    }

    public List<Property> getPropertiesByCountry(String country) {
        return propertyRepository.findByLocationCountry(country);
    }

	@Override
	public Property saveProperty(Property property) {
		return propertyRepository.save(property);
	}

	@Override
	public Property updateProperty(Long propertyId, Property propertyDetails) throws ResourceNotFoundException {
		Property property = propertyRepository.findById(propertyId).orElseThrow(()->new ResourceNotFoundException("Property","PropertyId",propertyId));

        property.setPropertyType(propertyDetails.getPropertyType());
        property.setPrice(propertyDetails.getPrice());
        property.setPropertyStatus(propertyDetails.getPropertyStatus());
        property.setUser(propertyDetails.getUser());

        // Update location details if provided
        if (propertyDetails.getLocation() != null) {
            Location location = propertyDetails.getLocation();
            locationRepository.save(location);
            property.setLocation(location);
        }

        return propertyRepository.save(property);
	}

	 @Override
	    public void deleteProperty(Long propertyId) throws ResourceNotFoundException {
	        Property property = propertyRepository.findById(propertyId).orElseThrow(() -> new ResourceNotFoundException("Property","PropertyId",propertyId));
	        propertyRepository.delete(property);
	    }
	 
	 public List<Property> getAllExceptOwner(Long userId) {
	        return propertyRepository.findAllExceptByOwner(userId);
	    }


	// Method to get properties by user ID
	    public List<Property> getPropertiesByUserId(Long userId) {
	        User owner = userRepository.findById(userId)
	                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));
	        return propertyRepository.findByOwner(owner);
	    }

		@Override
		public Property findPropertyById(Long propertyId) {
	        return propertyRepository.findById(propertyId)
	                .orElseThrow(() -> new ResourceNotFoundException("Property not found with id: " + propertyId));
	    }

}