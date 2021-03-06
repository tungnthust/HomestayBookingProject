package com.group4T.homestaybooking.HomestayBooking.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.group4T.homestaybooking.HomestayBooking.model.Host;
import com.group4T.homestaybooking.HomestayBooking.model.User;

@Repository
public interface HostRepository extends JpaRepository<Host, Integer> {

	Host findHostById(int hostId);

	@Query(value = "SELECT h.id FROM host h where h.user_id = ?1", nativeQuery = true)
	Integer findByUserId(int id);
	@Query(value = "SELECT h.user_id FROM host h where h.id = ?1", nativeQuery = true)
	Integer findUserIdById(int id);
}
