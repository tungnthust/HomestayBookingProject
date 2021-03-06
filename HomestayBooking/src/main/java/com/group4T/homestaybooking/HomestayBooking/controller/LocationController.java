package com.group4T.homestaybooking.HomestayBooking.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group4T.homestaybooking.HomestayBooking.model.District;
import com.group4T.homestaybooking.HomestayBooking.model.Location;
import com.group4T.homestaybooking.HomestayBooking.model.Province;
import com.group4T.homestaybooking.HomestayBooking.service.LocationService;

@RestController
@RequestMapping("/api/location")
public class LocationController {
	
	@Autowired
	private LocationService locationService;
	
	@GetMapping("/provinces")
	public List<Province> getAllProvinces() {
		return locationService.getAllProvinces();
	}
	
	@GetMapping("/province/{id}")
	public Optional<Province> getProvinceById(@PathVariable Integer id) {
		return locationService.getProvinceById(id);
	}
	
	@GetMapping("/district/{id}")
	public Optional<District> getDistrictById(@PathVariable Integer id) {
		return locationService.getDistrictById(id);
	}
	
	@GetMapping("/ward/{id}")
	public Optional<Location> getLocationById(@PathVariable Integer id) {
		return locationService.getLocationById(id);
	}
	
	@GetMapping("/districts/{provinceId}")
	public List<District> getAllDistrictsByProvinceId(@PathVariable Integer provinceId) {
		return locationService.getAllDistrictsByProvinceId(provinceId);
	}
	
	@GetMapping("/wards/{districtId}")
	public List<Location> getAllWardsByDistrictId(@PathVariable Integer districtId) {
		return locationService.getAllWardsByDistrictId(districtId);
	}

}
