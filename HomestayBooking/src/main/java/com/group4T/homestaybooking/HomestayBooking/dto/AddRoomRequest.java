package com.group4T.homestaybooking.HomestayBooking.dto;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.web.multipart.MultipartFile;

import com.group4T.homestaybooking.HomestayBooking.model.Facilitiy;
import com.group4T.homestaybooking.HomestayBooking.model.Host;
import com.group4T.homestaybooking.HomestayBooking.model.Location;

public class AddRoomRequest {

//	private int id;
	private int hostId;
	private String name;
	private int type;
	private int capacity;
	private double area;
	private String address;
	private int locationId;
	private int bedroomCount;
	private int bedCount;
	private int bathroomCount;
	private String description;
	private int pricePerDay;
	private String policy;
	private String thumbnailPhoto;
	private int[] facilitiesId;
	
//	public int getId() {
//		return id;
//	}
//
//	public void setId(int id) {
//		this.id = id;
//	}

	public int getHostId() {
		return hostId;
	}

	public void setHostId(int hostId) {
		this.hostId = hostId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public int getCapacity() {
		return capacity;
	}

	public void setCapacity(int capacity) {
		this.capacity = capacity;
	}

	public double getArea() {
		return area;
	}

	public void setArea(double area) {
		this.area = area;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public int getLocationId() {
		return locationId;
	}

	public void setLocationId(int locationId) {
		this.locationId = locationId;
	}

	public int getBedroomCount() {
		return bedroomCount;
	}

	public void setBedroomCount(int bedroomCount) {
		this.bedroomCount = bedroomCount;
	}

	public int getBedCount() {
		return bedCount;
	}

	public void setBedCount(int bedCount) {
		this.bedCount = bedCount;
	}

	public int getBathroomCount() {
		return bathroomCount;
	}

	public void setBathroomCount(int bathroomCount) {
		this.bathroomCount = bathroomCount;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getPricePerDay() {
		return pricePerDay;
	}

	public void setPricePerDay(int pricePerDay) {
		this.pricePerDay = pricePerDay;
	}

	public String getPolicy() {
		return policy;
	}

	public void setPolicy(String policy) {
		this.policy = policy;
	}

	public String getThumbnailPhoto() {
		return thumbnailPhoto;
	}

	public void setThumbnailPhoto(String thumbnailPhoto) {
		this.thumbnailPhoto = thumbnailPhoto;
	}

	public int[] getFacilitiesId() {
		return facilitiesId;
	}

	public void setFacilitiesId(int[] facilitiesId) {
		this.facilitiesId = facilitiesId;
	}
	
	

	public AddRoomRequest(int hostId, String name, int type, int capacity, double area, String address,
			int locationId, int bedroomCount, int bedCount, int bathroomCount, String description, int pricePerDay,
			String policy, String thumbnailPhoto, int[] facilitiesId) {
		this.hostId = hostId;
		this.name = name;
		this.type = type;
		this.capacity = capacity;
		this.area = area;
		this.address = address;
		this.locationId = locationId;
		this.bedroomCount = bedroomCount;
		this.bedCount = bedCount;
		this.bathroomCount = bathroomCount;
		this.description = description;
		this.pricePerDay = pricePerDay;
		this.policy = policy;
		this.thumbnailPhoto = thumbnailPhoto;
		this.facilitiesId = facilitiesId;
	}

	public AddRoomRequest() {
		
	}
	
	
	
	
	
	
	
	
}
