package com.group4T.homestaybooking.HomestayBooking.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "room_photo")
public class RoomPhoto {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@JoinColumn(name = "room_id")
	@JsonBackReference
	private RoomDetail roomId;
	private String url;
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
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public RoomPhoto(int id, RoomDetail roomId, String url) {
		super();
		this.id = id;
		this.roomId = roomId;
		this.url = url;
	}
	public RoomPhoto() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
