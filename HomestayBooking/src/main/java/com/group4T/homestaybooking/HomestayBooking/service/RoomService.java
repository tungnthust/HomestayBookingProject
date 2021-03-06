package com.group4T.homestaybooking.HomestayBooking.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import org.apache.commons.io.FileUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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

import antlr.StringUtils;


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
	public void saveRoom(AddRoomRequest addRoomRequest, MultipartFile[] images) {
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

		String uploadDirectory = "./src/main/resources/static/images/room/" + room.getId();
		Path uploadPath = Paths.get(uploadDirectory);
		System.out.println(uploadPath.toFile().getAbsolutePath());
		if (!Files.exists(uploadPath)) {
			try {
				Files.createDirectory(uploadPath);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		int indexImage = 1;
		ArrayList<String> imagesUrl = new ArrayList<String>();
		for (MultipartFile file : images) {			  
				String fileName = file.getOriginalFilename();
				System.out.println(fileName);
				String[] fileNameTokens = fileName.split("\\.");
				String fileExtension = fileNameTokens[fileNameTokens.length - 1];
			  Path fileNameAndPath = Paths.get(uploadDirectory, String.valueOf(indexImage++) + "." + fileExtension);
			  try {
				Files.write(fileNameAndPath, file.getBytes());
				String filePath = fileNameAndPath.toString();
				filePath = ".." + filePath.substring(20);
				imagesUrl.add(filePath);
			  } catch (IOException e) {
				e.printStackTrace();
			}
		  }
		
		
		
		int[] facilitiesId = addRoomRequest.getFacilitiesId();
		
		for(int faci: facilitiesId) {
			RoomFacility roomfacility = new RoomFacility();
			roomfacility.setRoomId(room_repo.findById(room.getId()));
			roomfacility.setFacilityId(facility_repo.findFacilityById(faci));
			roomFacility_repo.save(roomfacility);
		}
		
		
		for(String image: imagesUrl) {
			RoomPhoto roomPhoto = new RoomPhoto();
			roomPhoto.setRoomId(room_repo.findById(room.getId()));
			roomPhoto.setUrl(image);
			roomPhoto_repo.save(roomPhoto);
		}
		
		
	}
	
	@Transactional
	public void deleteRoom(int id) throws IOException {
		FileUtils.deleteDirectory(new File("./src/main/resources/static/images/room/" + id));
		room_repo.deleteById(id);
	}

	@Transactional
	public void updateRoom(int id, AddRoomRequest addRoomRequest, MultipartFile[] images) throws IOException {
		RoomDetail room = room_repo.findById(id);
		
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
		FileUtils.deleteDirectory(new File("./src/main/resources/static/images/room/" + id));

		String uploadDirectory = "./src/main/resources/static/images/room/" + id;
		Path uploadPath = Paths.get(uploadDirectory);
		System.out.println(uploadPath.toFile().getAbsolutePath());
		if (!Files.exists(uploadPath)) {
			try {
				Files.createDirectory(uploadPath);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		int indexImage = 1;
		ArrayList<String> imagesUrl = new ArrayList<String>();
		for (MultipartFile file : images) {			  
				String fileName = file.getOriginalFilename();
				System.out.println(fileName);
				String[] fileNameTokens = fileName.split("\\.");
				String fileExtension = fileNameTokens[fileNameTokens.length - 1];
			  Path fileNameAndPath = Paths.get(uploadDirectory, String.valueOf(indexImage++) + "." + fileExtension);
			  try {
				Files.write(fileNameAndPath, file.getBytes());
				String filePath = fileNameAndPath.toString();
				filePath = ".." + filePath.substring(20);
				imagesUrl.add(filePath);
			  } catch (IOException e) {
				e.printStackTrace();
			}
		  }
		
		
		
		int[] facilitiesId = addRoomRequest.getFacilitiesId();
		
		roomFacility_repo.deleteByRoomId(room);
				
		for(int faci: facilitiesId) {
			RoomFacility roomfacility = new RoomFacility();
			roomfacility.setRoomId(room_repo.findById(room.getId()));
			roomfacility.setFacilityId(facility_repo.findFacilityById(faci));
			roomFacility_repo.save(roomfacility);
		}
		
		roomPhoto_repo.deleteByRoomId(room);
		
		for(String image: imagesUrl) {
			RoomPhoto roomPhoto = new RoomPhoto();
			roomPhoto.setRoomId(room_repo.findById(room.getId()));
			roomPhoto.setUrl(image);
			roomPhoto_repo.save(roomPhoto);
		}
		
	}

	public List<RoomDetail> getRoomByHostId(int hostId) {
		return room_repo.findByHost(host_repo.findHostById(hostId));
	}

	

	//public void deleteRoom(int roomId);
}
