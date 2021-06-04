package com.group4T.homestaybooking.HomestayBooking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.group4T.homestaybooking.HomestayBooking.dto.AddRoomRequest;
import com.group4T.homestaybooking.HomestayBooking.model.RoomDetail;
import com.group4T.homestaybooking.HomestayBooking.service.RoomService;


@RestController
@RequestMapping("/api/room")
public class RoomRestController {

	// autowire the CustomerService
	@Autowired
	private RoomService roomService;
	
	
	
	// add mapping fr POST / rooms - add new room
	@PostMapping(value ="/addRoom", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	public void addRoom(@RequestPart("roomInfo") String roomInfo, @RequestPart("images") MultipartFile[] images) throws JsonMappingException, JsonProcessingException {			
		AddRoomRequest addRoomRequest = new ObjectMapper().readValue(roomInfo, AddRoomRequest.class);
		roomService.saveRoom(addRoomRequest, images);
		
	}
	
	
	
	
	@GetMapping("/test")
	public String test() {
		return "Abc";
	}
	
	
}
