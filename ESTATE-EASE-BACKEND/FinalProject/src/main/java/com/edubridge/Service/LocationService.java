package com.edubridge.Service;

import java.util.List;

import com.edubridge.Entity.Location;

public interface LocationService {

	Location createLocation(Location location);

	List<Location> getAllLocations();

	Location getLocationById(Long id);

	Location updateLocation(Long id, Location locationDetails);

	boolean deleteLocation(Long id);

}
