package com.group4T.homestaybooking.HomestayBooking.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.group4T.homestaybooking.HomestayBooking.dto.AddRoomRequest;
import com.group4T.homestaybooking.HomestayBooking.dto.HostRegister;
import com.group4T.homestaybooking.HomestayBooking.model.User;
import com.group4T.homestaybooking.HomestayBooking.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {
	@Autowired
	private UserService userService;
	
	@PostMapping(value ="/user/host", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	public int addHost(@RequestPart("hostInfo") String hostInfo, @RequestPart("images") MultipartFile[] images) throws JsonMappingException, JsonProcessingException {			
		HostRegister addHostRequest = new ObjectMapper().readValue(hostInfo, HostRegister.class);
		int id = userService.saveHost(addHostRequest, images);
		System.out.println(id);
		return id;
		
	}
	
	@GetMapping("/user/{id}")
	public Optional<User> getUserById(@PathVariable int id) {
		return userService.getUserById(id);
	}
	
	@GetMapping("/host/{id}")
	public Optional<User> getUserByHostId(@PathVariable int id) {
		return userService.getUserByHostId(id);
	}
	
	@GetMapping("/user/host/{id}")
	public Integer getHostByUserId(@PathVariable int id) {
		return userService.getHostByUserId(id);
	}
}
