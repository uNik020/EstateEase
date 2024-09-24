package com.edubridge.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.edubridge.Entity.User;
import com.edubridge.Entity.Wishlist;
import com.edubridge.Service.WishlistService;
import com.edubridge.repository.UserRepository;
import com.google.gson.Gson;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/wishlist")
public class WishlistController {
    
    @Autowired
    private WishlistService wishlistService;
    
    @Autowired
    private UserRepository userRepository;
    
    // Modify addToWishlist method to accept propertyId and pass it to the service layer
    @PostMapping("/{propertyId}/{userId}")
    public ResponseEntity<Wishlist> addToWishlist(@RequestBody Wishlist wishlist, @PathVariable("propertyId") Long propertyId, @PathVariable("userId") int userId) {
        return new ResponseEntity<Wishlist>(wishlistService.addToWishlist(wishlist, propertyId, userId), HttpStatus.CREATED);
    }
    
    @GetMapping
    public List<Wishlist> getAllPropertiesInWishlist() {
        return wishlistService.getAllPropertiesInWishlist();
    }
    
    @GetMapping("/{ownerId}")
    public List<Wishlist> getWishlistPropertiesByOwnerId(@PathVariable("ownerId") int ownerId) {
        return wishlistService.getWishlistPropertiesByUserId(ownerId);
    }
    
    @DeleteMapping("/deleteById/{wId}")
    public List<Wishlist> deleteWishlistById(@PathVariable("wId") int wId) {
        return wishlistService.deleteByWishlistId(wId);
    }
    
    @DeleteMapping("/deleteByOwnerId/{ownerId}")
    public ResponseEntity<String> deleteWishlistByOwnerId(@PathVariable("ownerId") int ownerId) {
        wishlistService.deleteWishlistByUserId(ownerId);
        Gson gson = new Gson();
        return new ResponseEntity<>(gson.toJson("Wishlist items deleted"), HttpStatus.OK);
    }
    
    @DeleteMapping("/delete")
    public ResponseEntity<Map<String, String>> deleteFromWishlist(@RequestParam Long propertyId, @RequestParam Long userId) {
        wishlistService.deleteFromWishlist(propertyId, userId);
        Map<String, String> response = new HashMap<>();
        response.put("message","Property removed from wishlist successfully");
        return ResponseEntity.ok(response);
    }
}
