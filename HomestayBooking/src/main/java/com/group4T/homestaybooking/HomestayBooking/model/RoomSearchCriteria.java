package com.group4T.homestaybooking.HomestayBooking.model;

import java.util.List;

public class RoomSearchCriteria {
	private Integer location;
	private Integer districtId;
	private Integer provinceId;
	private Integer type;
	private Integer min_price;
	private Integer max_price;
	private Integer bedCount;
	private Integer bedroomCount;
	private Integer bathroomCount;
	private String sort;
	private List<Integer> facilities;
	public Integer getLocation() {
		return location;
	}
	public void setLocation(Integer location) {
		this.location = location;
	}
	public Integer getDistrictId() {
		return districtId;
	}
	public void setDistrictId(Integer districtId) {
		this.districtId = districtId;
	}
	public Integer getProvinceId() {
		return provinceId;
	}
	public void setProvinceId(Integer provinceId) {
		this.provinceId = provinceId;
	}
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	public Integer getMin_price() {
		return min_price;
	}
	public void setMin_price(Integer min_price) {
		this.min_price = min_price;
	}
	public Integer getMax_price() {
		return max_price;
	}
	public void setMax_price(Integer max_price) {
		this.max_price = max_price;
	}
	public Integer getBedCount() {
		return bedCount;
	}
	public void setBedCount(Integer bedCount) {
		this.bedCount = bedCount;
	}
	public Integer getBedroomCount() {
		return bedroomCount;
	}
	public void setBedroomCount(Integer bedroomCount) {
		this.bedroomCount = bedroomCount;
	}
	public Integer getBathroomCount() {
		return bathroomCount;
	}
	public void setBathroomCount(Integer bathroomCount) {
		this.bathroomCount = bathroomCount;
	}
	public List<Integer> getFacilities() {
		return facilities;
	}
	public void setFacilities(List<Integer> facilities) {
		this.facilities = facilities;
	}
	public String getSort() {
		return sort;
	}
	public void setSort(String sort) {
		this.sort = sort;
	}
	
	
	
	
}
