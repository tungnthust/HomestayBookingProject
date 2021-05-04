package com.group4T.homestaybooking.HomestayBooking.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.group4T.homestaybooking.HomestayBooking.model.RoomDetail;
import com.group4T.homestaybooking.HomestayBooking.dto.RoomSearchResponse;
import com.group4T.homestaybooking.HomestayBooking.model.RoomPage;
import com.group4T.homestaybooking.HomestayBooking.model.RoomSearchCriteria;
import com.group4T.homestaybooking.HomestayBooking.repository.RoomCriteriaRepository;
import com.group4T.homestaybooking.HomestayBooking.repository.RoomRepository;

@Service
public class SearchService {
	@Autowired
	private RoomRepository roomRepository;
	@Autowired
	private RoomCriteriaRepository roomCriteriaRepository;
	
	public Page<RoomDetail> getRooms(RoomPage roomPage,
            RoomSearchCriteria roomSearchCriteria){
			return roomCriteriaRepository.findAllWithFilters(roomPage, roomSearchCriteria);
	}
	
	public RoomDetail getRoomById(int id) {
		return roomRepository.findById(id);
	}
	
	public long countRoomInProvince(Integer id) {
		return roomRepository.countByLocationProvinceId(id);
	}
}
