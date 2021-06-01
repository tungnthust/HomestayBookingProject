package com.group4T.homestaybooking.HomestayBooking.repository;

import java.util.List;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group4T.homestaybooking.HomestayBooking.model.RoomDetail;

@Repository
public interface RoomRepository extends JpaRepository<RoomDetail, Integer>{
	RoomDetail findById(int id);
	
	@Query("select count(*) from room_detail r where r.location.province.id = ?1")
	long countByLocationProvinceId(int provinceId);
	
//	RoomDetail findRoomById(int roomId);
}
