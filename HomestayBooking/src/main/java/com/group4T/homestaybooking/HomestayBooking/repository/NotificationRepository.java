package com.group4T.homestaybooking.HomestayBooking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.group4T.homestaybooking.HomestayBooking.model.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {
	
	@Query(value = "SELECT count(n.host_id) FROM notification n where n.host_id = ?1 and n.is_read = 0", nativeQuery = true)
	int countUnCheckNotification(Integer id);

	List<Notification> findAllByHostId(Integer id);

}
