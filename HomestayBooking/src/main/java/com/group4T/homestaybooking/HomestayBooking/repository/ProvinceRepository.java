package com.group4T.homestaybooking.HomestayBooking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.group4T.homestaybooking.HomestayBooking.model.Province;

@Repository
public interface ProvinceRepository extends JpaRepository<Province, Integer>{
	@Modifying
	@Query(value = "SELECT d.id FROM province d where d.name like %?1%", nativeQuery=true)
	List<Integer> findIdByNameContaining(String query);

}
