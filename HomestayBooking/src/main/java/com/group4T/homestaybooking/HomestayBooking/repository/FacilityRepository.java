package com.group4T.homestaybooking.HomestayBooking.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group4T.homestaybooking.HomestayBooking.model.Facilitiy;


@Repository
public interface FacilityRepository extends JpaRepository<Facilitiy, Integer>{

	Facilitiy findFacilityById(int facilityId);
}
