package com.group4T.homestaybooking.HomestayBooking.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.group4T.homestaybooking.HomestayBooking.dto.HostRegister;
import com.group4T.homestaybooking.HomestayBooking.model.Host;
import com.group4T.homestaybooking.HomestayBooking.model.RoomDetail;
import com.group4T.homestaybooking.HomestayBooking.model.RoomFacility;
import com.group4T.homestaybooking.HomestayBooking.model.RoomPhoto;
import com.group4T.homestaybooking.HomestayBooking.model.User;
import com.group4T.homestaybooking.HomestayBooking.repository.HostRepository;
import com.group4T.homestaybooking.HomestayBooking.repository.LocationRepository;
import com.group4T.homestaybooking.HomestayBooking.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private HostRepository hostRepository;
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private LocationRepository locationRepository;
	
	public int saveHost(HostRegister addHostRequest, MultipartFile[] images) {
		Host host = new Host();
		User user = userRepository.findUserById(addHostRequest.getUserId());
		user.setFirst_name(addHostRequest.getFirst_name());
		user.setLast_name(addHostRequest.getLast_name());
		user.setPhone(addHostRequest.getPhone());
		user.setAddress(addHostRequest.getAddress());
		user.setLocation(locationRepository.getLocationById(addHostRequest.getLocation()));
		userRepository.save(user);
		
		host.setUser_id(user);
		
		host.setIdentityCardNumber(addHostRequest.getId_card_num());
		host.setDateIssue(addHostRequest.getDate_issue());

		hostRepository.save(host);

		String uploadDirectory = "./src/main/resources/static/images/host/" + host.getId();
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
		host.setIdentityCardPhoto(".." + uploadDirectory.substring(20) + "/");
		hostRepository.save(host);
		return host.getId();
	}

	public Optional<User> getUserById(int id) {
		return userRepository.findById(id);
	}
	
	public Optional<User> getUserByUsername(String name) {
		return userRepository.findByUsername(name);
	}

	public Integer getHostByUserId(int id) {
		return hostRepository.findByUserId(id);
	}

	public Optional<User> getUserByHostId(int id) {
		int userId = hostRepository.findUserIdById(id);
		return userRepository.findById(userId);
	}

}
