package com.group4T.homestaybooking.HomestayBooking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
	@PostMapping(value ="/addRoom")
	public void addRoom(@RequestBody AddRoomRequest addRoomRequest) {			
		
		roomService.saveRoom(addRoomRequest);
		
	}
	
	
	
	
	@GetMapping("/test")
	public String test() {
		return "Abc";
	}
	
	
}
