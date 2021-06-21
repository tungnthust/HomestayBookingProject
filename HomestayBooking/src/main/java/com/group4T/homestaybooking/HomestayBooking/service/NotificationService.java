package com.group4T.homestaybooking.HomestayBooking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.group4T.homestaybooking.HomestayBooking.model.Notification;
import com.group4T.homestaybooking.HomestayBooking.repository.NotificationRepository;

@Service
public class NotificationService {
	
	@Autowired
	private NotificationRepository notificationRepository;
		
	public int countUnCheckNotification(Integer id) {
		return notificationRepository.countUnCheckNotification(id);
	}
	
	@Transactional
	public void markAsRead(Integer id) {
		List<Notification> notifications = notificationRepository.findAllByHostId(id);
		for (Notification n: notifications) {
			n.setIsRead(1);
			notificationRepository.save(n);
		}
	}

}
