package com.group4T.homestaybooking.HomestayBooking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.group4T.homestaybooking.HomestayBooking.model.Host;
import com.group4T.homestaybooking.HomestayBooking.model.RoomDetail;

@Repository
public interface RoomRepository extends JpaRepository<RoomDetail, Integer>{
	RoomDetail findById(int id);
	
	long countByLocationProvinceId(int provinceId);

	List<RoomDetail> findByHost(Host findHostById);
	
	void deleteById(Integer id);
	
	@Modifying
	@Query(value = "SELECT d.id FROM room_detail d where d.name like %?1%", nativeQuery = true)
	List<Integer> findIdByNameContaining(String query);
	
	@Query(value = "SELECT r.host_id FROM room_detail r where r.id = ?1", nativeQuery = true)
	Integer findHostByRoomId(int id);
	
	long countByLocationDistrictId(Integer id);

	long countByLocationId(Integer id);
	
//	RoomDetail findRoomById(int roomId);
}
