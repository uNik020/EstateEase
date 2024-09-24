package com.edubridge.Service;

import java.util.List;

import com.edubridge.Entity.Wishlist;

public interface WishlistService {

    // Modified method to take propertyId as parameter
    Wishlist addToWishlist(Wishlist wishlist, Long propertyId,int userId);

    List<Wishlist> getAllPropertiesInWishlist();

    List<Wishlist> getWishlistPropertiesByUserId(int uId);

    Wishlist getWishlistById(int wId);

    List<Wishlist> deleteByWishlistId(int wId);

    public void deleteWishlistByUserId(int ownerId);
    
    void deleteFromWishlist(Long propertyId, Long userId);
}
