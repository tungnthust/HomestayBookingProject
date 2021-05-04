package com.group4T.homestaybooking.HomestayBooking.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "ward")
public class Location {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;
	
	@Column(name = "_name")
	private String name;
	
	@Column(name = "_prefix")
	private String prefix;
	
	@ManyToOne
	@JoinColumn(name = "_district_id")
	private District district;
	
	@ManyToOne
	@JoinColumn(name = "_province_id")
	private Province province;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Location() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPrefix() {
		return prefix;
	}

	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}

	public District getDistrict() {
		return district;
	}

	public void setDistrict(District district) {
		this.district = district;
	}

	public Province getProvince() {
		return province;
	}

	public void setProvince(Province province) {
		this.province = province;
	}

	public Location(int id, String name, String prefix, District district, Province province) {
		super();
		this.id = id;
		this.name = name;
		this.prefix = prefix;
		this.district = district;
		this.province = province;
	}

	
	
	
}
