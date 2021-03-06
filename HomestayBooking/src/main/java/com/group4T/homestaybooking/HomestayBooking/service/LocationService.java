package com.group4T.homestaybooking.HomestayBooking.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.group4T.homestaybooking.HomestayBooking.model.District;
import com.group4T.homestaybooking.HomestayBooking.model.Location;
import com.group4T.homestaybooking.HomestayBooking.model.Province;
import com.group4T.homestaybooking.HomestayBooking.repository.DistrictRepository;
import com.group4T.homestaybooking.HomestayBooking.repository.LocationRepository;
import com.group4T.homestaybooking.HomestayBooking.repository.ProvinceRepository;

@Service
public class LocationService {
	
	@Autowired
	private ProvinceRepository provinceRepository;
	@Autowired
	private DistrictRepository districtRepository;
	@Autowired
	private LocationRepository locationRepository;
	
	public List<Province> getAllProvinces() {
		return provinceRepository.findAll();
	}
	
	public List<District> getAllDistrictsByProvinceId(int provinceId) {
		return districtRepository.getAllDistrictsByProvinceId(provinceId);
	}
	
	public List<Location> getAllWardsByDistrictId(int districtId) {
		return locationRepository.getAllWardsByDistrictId(districtId);
	}

	public Optional<Province> getProvinceById(Integer id) {
		return provinceRepository.findById(id);
	}

	public Optional<District> getDistrictById(Integer id) {
		return districtRepository.findById(id);
	}
	
	public Optional<Location> getLocationById(Integer id) {
		return locationRepository.findById(id);
	}
}
