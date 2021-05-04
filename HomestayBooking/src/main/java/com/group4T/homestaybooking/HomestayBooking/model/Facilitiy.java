package com.group4T.homestaybooking.HomestayBooking.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "facility")
public class Facilitiy {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Facilitiy(int id, String name) {
		super();
		this.id = id;
		this.name = name;
	}
	public Facilitiy() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
