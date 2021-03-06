package com.group4T.homestaybooking.HomestayBooking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.group4T.homestaybooking.HomestayBooking.model.RoomDetail;
import com.group4T.homestaybooking.HomestayBooking.model.RoomPage;
import com.group4T.homestaybooking.HomestayBooking.model.RoomSearchCriteria;
import com.group4T.homestaybooking.HomestayBooking.service.SearchService;

@RestController
@RequestMapping("/search")
public class SearchController {
	
	@Autowired
	private SearchService searchService;
	
	@PostMapping
	public ResponseEntity<Page<RoomDetail>> getRooms(RoomPage roomPage,
            RoomSearchCriteria roomSearchCriteria){
		return new ResponseEntity<>(searchService.getRooms(roomPage, roomSearchCriteria),
					HttpStatus.OK);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<RoomDetail> getRoomById(@PathVariable int id) {
		return new ResponseEntity<RoomDetail>(searchService.getRoomById(id), HttpStatus.OK);
	}
	
	@GetMapping(value = "countRoom/{provinceId}")
	public long getRoomCountInProvince(@PathVariable Integer provinceId) {
		return searchService.countRoomInProvince(provinceId);
	}
	@GetMapping(value = "countRoom/district/{id}")
	public long countRoomInDistrict(@PathVariable Integer id) {
		return searchService.countRoomInDistrict(id);
	}
	
	@GetMapping(value = "countRoom/ward/{id}")
	public long countRoomInWard(@PathVariable Integer id) {
		return searchService.countRoomInWard(id);
	}
}
