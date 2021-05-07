package com.group4T.homestaybooking.HomestayBooking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group4T.homestaybooking.HomestayBooking.model.Reservation;
import com.group4T.homestaybooking.HomestayBooking.service.ReservationService;

@RestController
@RequestMapping("/api/reservation")
public class ReservationController {
	
	@Autowired
	private ReservationService reservationService;
	@GetMapping("/room/{roomId}")
	public List<Reservation> getAllReservationsByRoomId(@PathVariable Integer roomId) {
		return reservationService.getAllReservationsByRoomId(roomId);
	}
}
