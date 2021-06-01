package com.group4T.homestaybooking.HomestayBooking.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group4T.homestaybooking.HomestayBooking.model.Host;

@Repository
public interface HostRepository extends JpaRepository<Host, Integer> {

	Host findHostById(int hostId);
}
