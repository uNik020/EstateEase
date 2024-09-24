package com.edubridge.controller;

import com.edubridge.Entity.Property;
import com.edubridge.Entity.User;
import com.edubridge.Service.PropertyService;
import com.edubridge.Service.UserService;
import com.edubridge.exception.ResourceNotFoundException;
import com.edubridge.repository.PropertyRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/properties")
@CrossOrigin(origins="http://localhost:4200")
public class PropertyController {

	@Autowired
	private UserService userService;
	
    @Autowired
    private PropertyService propertyService;
    
    @Autowired
    private PropertyRepository propertyRepository;

    @PostMapping("/create")
    public ResponseEntity<Property> createProperty(@RequestBody Property property, @RequestParam Long userId) {
        User owner = userService.findById(userId);
        
        property.setUser(owner); // Assuming there's a setOwner method to associate the user
        Property createdProperty = propertyService.createProperty(property, userId);

        return new ResponseEntity<>(createdProperty, HttpStatus.CREATED);
    }


    
    @GetMapping("/all")
    public List<Property> getAllProperties() {
        return propertyService.getAllProperties();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Long id) {
    	
        Property property = propertyService.getPropertyById(id);
        if (property != null) {
            return ResponseEntity.ok(property);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public List<Property> searchPropertiesByLocation(@RequestParam(required = false) String city,
                                                     @RequestParam(required = false) String state,
                                                     @RequestParam(required = false) String country,
                                                     @RequestParam(required = false) String pin) {
        return propertyRepository.findByLocation_CityOrLocation_StateOrLocation_CountryOrLocation_Pin(city, state, country, pin);
    }

    @PutMapping("/update/{propertyId}")
    public ResponseEntity<Property> updateProperty(@PathVariable Long propertyId, @RequestBody Property propertyDetails) {
        try {
            Property updatedProperty = propertyService.updateProperty(propertyId, propertyDetails);
            return ResponseEntity.ok(updatedProperty);
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        try {
            propertyService.deleteProperty(id);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/city/{city}")
    public List<Property> getPropertiesByCity(@PathVariable String city) {
        return propertyService.getPropertiesByCity(city);
    }

    @GetMapping("/state/{state}")
    public List<Property> getPropertiesByState(@PathVariable String state) {
        return propertyService.getPropertiesByState(state);
    }

    @GetMapping("/country/{country}")
    public List<Property> getPropertiesByCountry(@PathVariable String country) {
        return propertyService.getPropertiesByCountry(country);
    }
    
    // Get properties except those posted by the user (Owner)
    @GetMapping("/available")
    public List<Property> getAvailableProperties(@RequestParam("userId") Long userId) {
        return propertyService.getAllExceptOwner(userId);
    }
    
 //Endpoint to get properties by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Property>> getPropertiesByUserId(@PathVariable Long userId) {
        List<Property> properties = propertyService.getPropertiesByUserId(userId);
        return new ResponseEntity<>(properties, HttpStatus.OK);
    }


}
