package com.edubridge.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edubridge.Entity.Property;
import com.edubridge.Entity.User;
import com.edubridge.Entity.Wishlist;
import com.edubridge.exception.ResourceNotFoundException;
import com.edubridge.repository.PropertyRepository;
import com.edubridge.repository.UserRepository;
import com.edubridge.repository.WishlistRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class WishlistServiceImpl implements WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private UserService userService;
    
    @Autowired
    private PropertyService propertyService; // Service to get property details
   
    @Override
    public Wishlist addToWishlist(Wishlist wishlist, Long propertyId, int userId) {
        Property property = propertyService.getPropertyById(propertyId);
        User user = userService.getUserById(userId); // Fetch user by ID
        wishlist.setProperty(property);
        wishlist.setUser(user); // Set the user in the wishlist
        
        return wishlistRepository.save(wishlist);
    }

    @Override
    public List<Wishlist> getAllPropertiesInWishlist() {
        return wishlistRepository.findAll();
    }

    @Override
    public List<Wishlist> getWishlistPropertiesByUserId(int userId) {
        return wishlistRepository.findByUserId(userId);
    }

    @Override
    public List<Wishlist> deleteByWishlistId(int wId) {
        Wishlist wl = wishlistRepository.findById(wId).orElseThrow(() -> new RuntimeException("Wishlist not found"));
        wishlistRepository.deleteById(wl.getwId());
        return wishlistRepository.findAll();
    }

    @Override
    public void deleteWishlistByUserId(int ownerId) {
        wishlistRepository.deleteById(ownerId);
    }

    @Override
    public Wishlist getWishlistById(int wId) {
        return wishlistRepository.findById(wId).orElseThrow(() -> new RuntimeException("Wishlist not found"));
    }
    
    @Override
    @Transactional
    public void deleteFromWishlist(Long propertyId, Long userId) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found with id: " + propertyId));
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        
        // Check if the wishlist entry exists
        Wishlist wishlistEntry = wishlistRepository.findByPropertyAndUser(property, user);
        if (wishlistEntry != null) {
            wishlistRepository.deleteByPropertyAndUser(property, user);
        } else {
            throw new EntityNotFoundException("Wishlist entry not found");
        }
    }
}
