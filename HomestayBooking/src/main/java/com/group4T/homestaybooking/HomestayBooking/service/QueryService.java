package com.group4T.homestaybooking.HomestayBooking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.group4T.homestaybooking.HomestayBooking.dto.QueryResponse;
import com.group4T.homestaybooking.HomestayBooking.repository.DistrictRepository;
import com.group4T.homestaybooking.HomestayBooking.repository.LocationRepository;
import com.group4T.homestaybooking.HomestayBooking.repository.ProvinceRepository;
import com.group4T.homestaybooking.HomestayBooking.repository.RoomRepository;

@Service
public class QueryService {
	@Autowired
	private LocationRepository locationRepository;
	@Autowired
	private ProvinceRepository provinceRepository;
	@Autowired
	private DistrictRepository districtRepository;
	@Autowired
	private RoomRepository roomRepository;
	
	@Transactional
	public QueryResponse search(String query) {
		List<Integer> wardList = locationRepository.findIdByNameContaining(query);
		List<Integer> districList = districtRepository.findIdByNameContaining(query);
		List<Integer> provinceList = provinceRepository.findIdByNameContaining(query);
		List<Integer> roomList = roomRepository.findIdByNameContaining(query);
		
		QueryResponse response = new QueryResponse();
		response.setWards(wardList);
		response.setDistricts(districList);
		response.setProvinces(provinceList);
		response.setRooms(roomList);
		return response;
	}
	
	public boolean equals(String query, String obj) {
		query = query.trim();
		if ((query == null)|| (query.equals(""))) {
			return true;
		} else {
			return obj.toLowerCase().contains(query.toLowerCase());
		}
	}
}
