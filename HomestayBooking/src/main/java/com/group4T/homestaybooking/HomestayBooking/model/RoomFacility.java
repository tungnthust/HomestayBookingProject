package com.group4T.homestaybooking.HomestayBooking.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "room_facility")
public class RoomFacility {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@ManyToOne
	@JoinColumn(name = "room_id", nullable = false)
	@JsonBackReference
	private RoomDetail roomId;
	@ManyToOne
	@JoinColumn(name = "facility_id")
	private Facilitiy facilityId;
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
	public Facilitiy getFacilityId() {
		return facilityId;
	}
	public void setFacilityId(Facilitiy facilityId) {
		this.facilityId = facilityId;
	}
	public RoomFacility() {
		super();
		// TODO Auto-generated constructor stub
	}
	public RoomFacility(int id, RoomDetail roomId, Facilitiy facilityId) {
		super();
		this.id = id;
		this.roomId = roomId;
		this.facilityId = facilityId;
	}
	
	
}
