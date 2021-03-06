package com.group4T.homestaybooking.HomestayBooking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.group4T.homestaybooking.HomestayBooking.model.District;

@Repository
public interface DistrictRepository extends JpaRepository<District, Integer>{
	
	
	List<District> getAllDistrictsByProvinceId(Integer provinceId);
	
	@Modifying
	@Query(value = "SELECT d.id FROM district d where d.name like %?1%", nativeQuery = true)
	List<Integer> findIdByNameContaining(String query);
}
