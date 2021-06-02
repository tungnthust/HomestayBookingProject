package com.group4T.homestaybooking.HomestayBooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group4T.homestaybooking.HomestayBooking.model.RoomPhoto;


@Repository
public interface RoomPhotoRepository extends JpaRepository<RoomPhoto, Integer>{

}