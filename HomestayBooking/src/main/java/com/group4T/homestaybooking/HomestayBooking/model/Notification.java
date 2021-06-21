package com.group4T.homestaybooking.HomestayBooking.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "notification")
public class Notification {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "host_id")
	private int hostId;
	@Column(name = "reservation_id")
	private int reservationId;
	private int isRead;
	public int getHostId() {
		return hostId;
	}
	public void setHostId(int hostId) {
		this.hostId = hostId;
	}
	public int getReservationId() {
		return reservationId;
	}
	public void setReservationId(int reservationId) {
		this.reservationId = reservationId;
	}
	public int getIsRead() {
		return isRead;
	}
	public void setIsRead(int isRead) {
		this.isRead = isRead;
	}
	public Notification(int hostId, int reservationId, int isRead) {
		super();
		this.hostId = hostId;
		this.reservationId = reservationId;
		this.isRead = isRead;
	}
	public Notification() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
