package com.group4T.homestaybooking.HomestayBooking.repository;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group4T.homestaybooking.HomestayBooking.model.RoomDetail;
import com.group4T.homestaybooking.HomestayBooking.model.RoomPhoto;


@Repository
public interface RoomPhotoRepository extends JpaRepository<RoomPhoto, Integer>{
	
	@Query(value = "delete from room_photo rp where rp._room_id = ?1")
	void deleteByRoomId(RoomDetail room);

}
