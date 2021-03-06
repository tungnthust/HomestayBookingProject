package com.group4T.homestaybooking.HomestayBooking.dto;

import java.sql.Date;

public class HostRegister {
	private int userId;
	private String first_name;
	private String last_name;
	private String phone;
	private String address;
	private int location;
	private String id_card_num;
	private Date date_issue;
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getFirst_name() {
		return first_name;
	}
	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}
	public String getLast_name() {
		return last_name;
	}
	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public int getLocation() {
		return location;
	}
	public void setLocation(int location) {
		this.location = location;
	}
	public String getId_card_num() {
		return id_card_num;
	}
	public void setId_card_num(String id_card_num) {
		this.id_card_num = id_card_num;
	}
	public Date getDate_issue() {
		return date_issue;
	}
	public void setDate_issue(Date date_issue) {
		this.date_issue = date_issue;
	}
	public HostRegister() {
		super();
		// TODO Auto-generated constructor stub
	}
	public HostRegister(int userId, String first_name, String last_name, String phone, String address, int location,
			String id_card_num, Date date_issue) {
		super();
		this.userId = userId;
		this.first_name = first_name;
		this.last_name = last_name;
		this.phone = phone;
		this.address = address;
		this.location = location;
		this.id_card_num = id_card_num;
		this.date_issue = date_issue;
	}
	
	
}
