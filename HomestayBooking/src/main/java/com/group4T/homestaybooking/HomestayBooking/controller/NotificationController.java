package com.group4T.homestaybooking.HomestayBooking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group4T.homestaybooking.HomestayBooking.service.NotificationService;

@RestController
@RequestMapping("/api/notification")
public class NotificationController {
	@Autowired
	private NotificationService notificationService;
	
	@GetMapping("host/{id}")
	public int countUnCheckNotification(@PathVariable Integer id) {
		return notificationService.countUnCheckNotification(id);
	}
	
	@PutMapping("host/{id}")
	public void markAsRead(@PathVariable Integer id) {
		notificationService.markAsRead(id);
	}
}
