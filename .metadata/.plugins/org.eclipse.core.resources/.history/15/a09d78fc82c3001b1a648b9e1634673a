package com.group4T.homestaybooking.HomestayBooking.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name="room_detail")
public class RoomDetail {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@JoinColumn(name="host_id")
	@ManyToOne(fetch = FetchType.LAZY)
	private Host host;
	@Column(name="type")
	private int type;
	private int capacity;
	private double area;
	private String address;
	@JoinColumn(name="location")
	@ManyToOne(fetch = FetchType.LAZY)
	private Location location;
	@Column(name="bedroom_count")
	private int bedroomCount;
	@Column(name="bed_count")
	private int bedCount;
	@Column(name="bathroom_count")
	private int bathroomCount;
	private String description;
	@Column(name="price_per_day")
	private int pricePerDay;
	private String policy;
	@Column(name="thumbnail_photo")
	private String thumbnailPhoto;
	
	
	@OneToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "room_facility",
            joinColumns = @JoinColumn(name = "room_id"),
            inverseJoinColumns = @JoinColumn(name = "facility_id")
    )

	private Set<Facilitiy> facilities;
	
	@OneToMany(mappedBy = "roomId")
	@JsonManagedReference
	private Set<RoomPhoto> images;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Host getHost() {
		return host;
	}
	public void setHost(Host host) {
		this.host = host;
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
	public Location getLocation() {
		return location;
	}
	public void setLocation(Location location) {
		this.location = location;
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
	public RoomDetail() {
		super();
		// TODO Auto-generated constructor stub
	}
	public RoomDetail(int id, Host host, int type, int capacity, double area, String address, Location location,
			int bedroomCount, int bedCount, int bathroomCount, String description, int pricePerDay, String policy,
			String thumbnailPhoto) {
		super();
		this.id = id;
		this.host = host;
		this.type = type;
		this.capacity = capacity;
		this.area = area;
		this.address = address;
		this.location = location;
		this.bedroomCount = bedroomCount;
		this.bedCount = bedCount;
		this.bathroomCount = bathroomCount;
		this.description = description;
		this.pricePerDay = pricePerDay;
		this.policy = policy;
		this.thumbnailPhoto = thumbnailPhoto;
	}
	
	public Set<Facilitiy> getFacilities() {
		return facilities;
	}
	public void setFacilities(Set<Facilitiy> facilities) {
		this.facilities = facilities;
	}
	public Set<RoomPhoto> getImages() {
		return images;
	}
	public void setImages(Set<RoomPhoto> images) {
		this.images = images;
	}
	
	
	
	
	
}
