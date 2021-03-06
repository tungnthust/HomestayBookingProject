package com.group4T.homestaybooking.HomestayBooking.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.group4T.homestaybooking.HomestayBooking.model.Location;

@Repository
public interface LocationRepository extends JpaRepository<Location, Integer>{
	
	List<Location> getAllWardsByDistrictId(Integer districtId);
	
	Location getLocationById(Integer locationId);
	@Modifying
	@Query(value = "SELECT w.id FROM ward w where w.name like %?1%", nativeQuery = true)
	List<Integer> findIdByNameContaining(String query);
}
