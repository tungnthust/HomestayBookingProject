package com.group4T.homestaybooking.HomestayBooking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group4T.homestaybooking.HomestayBooking.model.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer>{
	List<Reservation> findAllByRoomIdId(Integer roomId);

	List<Reservation> findAllByRoomIdHostIdOrderByIdDesc(Integer id);
}
