package com.group4T.homestaybooking.HomestayBooking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.group4T.homestaybooking.HomestayBooking.dto.QueryResponse;
import com.group4T.homestaybooking.HomestayBooking.service.QueryService;

@RestController
@RequestMapping("/api/search")
public class QueryController {
	
	@Autowired
	private QueryService queryService;
	@PostMapping
	public QueryResponse search(@RequestParam(name = "query") String query) {
		return queryService.search(query);
	}
}
