package com.group4T.homestaybooking.HomestayBooking.model;

import java.time.Instant;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "reservation")
public class Reservation {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@JoinColumn(name = "room_id")
	private RoomDetail roomId;
	
	@ManyToOne
	@JoinColumn(name = "guest_id")
	private User guestId;
	
	@Column(name = "checkin_date")
	private Date checkinDate;
	
	@Column(name = "checkout_date")
	private Date checkoutDate;
	
	@Column(name = "guest_count")
	private int guestCount;
	
	@Column(name = "price")
	private int price;
	
	@ManyToOne
	@JoinColumn(name = "payment_method")
	private PaymentMethod paymentMethod;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public RoomDetail getRoomId() {
		return roomId;
	}

	public void setRoomId(RoomDetail roomId) {
		this.roomId = roomId;
	}

	public User getGuestId() {
		return guestId;
	}

	public void setGuestId(User guestId) {
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

	public PaymentMethod getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(PaymentMethod paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public Reservation(int id, RoomDetail roomId, User guestId, Date checkinDate, Date checkoutDate,
			int guestCount, int price, PaymentMethod paymentMethod) {
		super();
		this.id = id;
		this.roomId = roomId;
		this.guestId = guestId;
		this.checkinDate = checkinDate;
		this.checkoutDate = checkoutDate;
		this.guestCount = guestCount;
		this.price = price;
		this.paymentMethod = paymentMethod;
	}

	public Reservation() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
}
