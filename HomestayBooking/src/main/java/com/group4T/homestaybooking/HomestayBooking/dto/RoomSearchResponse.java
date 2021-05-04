package com.group4T.homestaybooking.HomestayBooking.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RoomSearchResponse {
	private int id;
	private String name;
	private int roomType;
	private int bedCount;
	private int price;
}
