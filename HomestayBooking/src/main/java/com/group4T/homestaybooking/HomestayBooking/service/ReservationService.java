package com.group4T.homestaybooking.HomestayBooking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.group4T.homestaybooking.HomestayBooking.dto.ReservationRequest;
import com.group4T.homestaybooking.HomestayBooking.model.Notification;
import com.group4T.homestaybooking.HomestayBooking.model.Reservation;
import com.group4T.homestaybooking.HomestayBooking.repository.NotificationRepository;
import com.group4T.homestaybooking.HomestayBooking.repository.PaymentMethodRepository;
import com.group4T.homestaybooking.HomestayBooking.repository.ReservationRepository;
import com.group4T.homestaybooking.HomestayBooking.repository.RoomRepository;
import com.group4T.homestaybooking.HomestayBooking.repository.UserRepository;

@Service
public class ReservationService {
	@Autowired
	private ReservationRepository reservationRepository;
	
	@Autowired
	private NotificationRepository notificationRepository;
	
	@Autowired
	private RoomRepository room_repo;
	
	@Autowired
	private UserRepository user_repo;
	
	@Autowired
	private PaymentMethodRepository paymentMethod_repo;
	
	public List<Reservation> getAllReservationsByRoomId(Integer roomId) {
		return reservationRepository.findAllByRoomIdId(roomId);
	}

	@Transactional
	public void saveReservation(ReservationRequest reservationRequest) {
		Reservation reservation = new Reservation();
		Notification notification = new Notification();
		reservation.setRoomId(room_repo.findById(reservationRequest.getRoomId()));
		reservation.setGuestId(user_repo.findUserById(reservationRequest.getGuestId()));
		reservation.setCheckinDate(reservationRequest.getCheckinDate());
		reservation.setCheckoutDate(reservationRequest.getCheckoutDate());
		reservation.setGuestCount(reservationRequest.getGuestCount());
		reservation.setPrice(reservationRequest.getPrice());
		reservation.setPaymentMethod(paymentMethod_repo.findPaymentMethodById(reservationRequest.getPaymentMethodId()));
		reservationRepository.save(reservation);
		notification.setHostId(room_repo.findHostByRoomId(reservationRequest.getRoomId()));
		notification.setReservationId(reservation.getId());
		notification.setIsRead(0);
		notificationRepository.save(notification);
	}

	public List<Reservation> getAllReservation() {
		return reservationRepository.findAll();
	}

	public List<Reservation> getReservationsByHost(Integer id) {
		return reservationRepository.findAllByRoomIdHostIdOrderByIdAsc(id);
	}
}
