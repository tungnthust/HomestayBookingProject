package com.group4T.homestaybooking.HomestayBooking.repository;

import java.util.List;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group4T.homestaybooking.HomestayBooking.model.Location;

@Repository
public interface LocationRepository extends JpaRepository<Location, Integer>{
	
	@Query("select * from ward w where w._district_id.id = ?1")
	List<Location> getAllWardsByDistrictId(Integer districtId);
}
