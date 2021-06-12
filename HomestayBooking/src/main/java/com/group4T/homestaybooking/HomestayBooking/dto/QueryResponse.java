package com.group4T.homestaybooking.HomestayBooking.dto;

import java.util.List;

public class QueryResponse {
	private List<Integer> wards;
	private List<Integer> districts;
	private List<Integer> provinces;
	private List<Integer> rooms;
	public List<Integer> getWards() {
		return wards;
	}
	public void setWards(List<Integer> wards) {
		this.wards = wards;
	}
	public List<Integer> getDistricts() {
		return districts;
	}
	public void setDistricts(List<Integer> districts) {
		this.districts = districts;
	}
	public List<Integer> getProvinces() {
		return provinces;
	}
	public void setProvinces(List<Integer> provinces) {
		this.provinces = provinces;
	}
	public List<Integer> getRooms() {
		return rooms;
	}
	public void setRooms(List<Integer> rooms) {
		this.rooms = rooms;
	}
	public QueryResponse() {
		super();
		// TODO Auto-generated constructor stub
	}
	public QueryResponse(List<Integer> wards, List<Integer> districts, List<Integer> provinces, List<Integer> rooms) {
		super();
		this.wards = wards;
		this.districts = districts;
		this.provinces = provinces;
		this.rooms = rooms;
	}
	
	
}
