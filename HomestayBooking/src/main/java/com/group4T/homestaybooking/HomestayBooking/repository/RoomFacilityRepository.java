package com.group4T.homestaybooking.HomestayBooking.repository;

import java.util.Set;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group4T.homestaybooking.HomestayBooking.model.RoomFacility;

@Repository
public interface RoomFacilityRepository extends JpaRepository<RoomFacility, Integer>{

}
