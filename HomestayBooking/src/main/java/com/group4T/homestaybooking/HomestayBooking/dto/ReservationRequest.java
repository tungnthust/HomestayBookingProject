package com.group4T.homestaybooking.HomestayBooking.dto;

import java.time.Instant;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.group4T.homestaybooking.HomestayBooking.model.PaymentMethod;
import com.group4T.homestaybooking.HomestayBooking.model.RoomDetail;
import com.group4T.homestaybooking.HomestayBooking.model.User;

public class ReservationRequest {
	
//	private int id;
	private int roomId;			// change RoomDetail --> int
	private int guestId;		// user --> int
	private Date checkinDate;
	private Date checkoutDate;
	private int guestCount;
	private int price;
	private Instant orderTime;
	private int paymentMethodId;		// paymentmethod --> int
	
	
	public Instant getOrderTime() {
		return orderTime;
	}
	public void setOrderTime(Instant orderTime) {
		this.orderTime = orderTime;
	}
	public int getRoomId() {
		return roomId;
	}
	public void setRoomId(int roomId) {
		this.roomId = roomId;
	}
	public int getGuestId() {
		return guestId;
	}
	public void setGuestId(int guestId) {
		this.guestId = guestId;
	}
	public Date getCheckinDate() {
		return checkinDate;
	}
	public void setCheckinDate(Date checkinDate) {
		this.checkinDate = checkinDate;
	}
	public Date getCheckoutDate() {
		return checkoutDate;
	}
	public void setCheckoutDate(Date checkoutDate) {
		this.checkoutDate = checkoutDate;
	}
	public int getGuestCount() {
		return guestCount;
	}
	public void setGuestCount(int guestCount) {
		this.guestCount = guestCount;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public int getPaymentMethodId() {
		return paymentMethodId;
	}
	public void setPaymentMethodId(int paymentMethodId) {
		this.paymentMethodId = paymentMethodId;
	}
	public ReservationRequest(int roomId, int guestId, Date checkinDate, Date checkoutDate, int guestCount, int price,
			Instant orderTime, int paymentMethodId) {
		super();
		this.roomId = roomId;
		this.guestId = guestId;
		this.checkinDate = checkinDate;
		this.checkoutDate = checkoutDate;
		this.guestCount = guestCount;
		this.price = price;
		this.orderTime = orderTime;
		this.paymentMethodId = paymentMethodId;
	}
		

}
