package com.group4T.homestaybooking.HomestayBooking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.group4T.homestaybooking.HomestayBooking.dto.AddRoomRequest;
import com.group4T.homestaybooking.HomestayBooking.model.RoomDetail;
import com.group4T.homestaybooking.HomestayBooking.model.RoomFacility;
import com.group4T.homestaybooking.HomestayBooking.model.RoomPhoto;
import com.group4T.homestaybooking.HomestayBooking.repository.FacilityRepository;
import com.group4T.homestaybooking.HomestayBooking.repository.HostRepository;
import com.group4T.homestaybooking.HomestayBooking.repository.LocationRepository;
import com.group4T.homestaybooking.HomestayBooking.repository.RoomFacilityRepository;
import com.group4T.homestaybooking.HomestayBooking.repository.RoomPhotoRepository;
import com.group4T.homestaybooking.HomestayBooking.repository.RoomRepository;


@Service
public class RoomService {
	@Autowired
	private RoomRepository room_repo;
	
	@Autowired
	private HostRepository host_repo;
	
	@Autowired
	private LocationRepository location_repo;
	
	@Autowired
	private RoomFacilityRepository roomFacility_repo;

	@Autowired
	private FacilityRepository facility_repo;
	
	@Autowired
	private RoomPhotoRepository roomPhoto_repo;

	//public List<RoomDetail> getRooms(){}

	

	//public RoomDetail getRoom(int theId);

	

//	public void saveRoom(RoomDetail theCustomer);
	public void saveRoom(AddRoomRequest addRoomRequest) {
		RoomDetail room = new RoomDetail();
		
		
//		room.setId(addRoomRequest.getId());
		room.setHost(host_repo.findHostById(addRoomRequest.getHostId()));
		room.setName(addRoomRequest.getName());
		room.setType(addRoomRequest.getType());
		room.setCapacity(addRoomRequest.getCapacity());
		room.setArea(addRoomRequest.getArea());
		room.setAddress(addRoomRequest.getAddress());
		room.setLocation(location_repo.getLocationById(addRoomRequest.getLocationId()));
		room.setBedroomCount(addRoomRequest.getBedroomCount());
		room.setBedCount(addRoomRequest.getBedCount());
		room.setBathroomCount(addRoomRequest.getBathroomCount());
		room.setDescription(addRoomRequest.getDescription());
		room.setPricePerDay(addRoomRequest.getPricePerDay());
		room.setPolicy(addRoomRequest.getPolicy());
		room.setThumbnailPhoto(addRoomRequest.getThumbnailPhoto());
		room_repo.save(room);
		
		
		int[] facilitiesId = addRoomRequest.getFacilitiesId();
		
		for(int faci: facilitiesId) {
			RoomFacility roomfacility = new RoomFacility();
			roomfacility.setRoomId(room_repo.findById(room.getId()));
			roomfacility.setFacilityId(facility_repo.findFacilityById(faci));
			roomFacility_repo.save(roomfacility);
		}
		
		String[] images = addRoomRequest.getImages();
		for(String image: images) {
			RoomPhoto roomPhoto = new RoomPhoto();
			roomPhoto.setRoomId(room_repo.findById(room.getId()));
			roomPhoto.setUrl(image);
			roomPhoto_repo.save(roomPhoto);
		}
		
		
	}

	

	//public void deleteRoom(int roomId);
}