package com.group4T.homestaybooking.HomestayBooking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.group4T.homestaybooking.HomestayBooking.model.Reservation;
import com.group4T.homestaybooking.HomestayBooking.repository.ReservationRepository;

@Service
public class ReservationService {
	@Autowired
	private ReservationRepository reservationRepository;
	
	public List<Reservation> getAllReservationsByRoomId(Integer roomId) {
		return reservationRepository.findAllByRoomIdId(roomId);
	}
}
