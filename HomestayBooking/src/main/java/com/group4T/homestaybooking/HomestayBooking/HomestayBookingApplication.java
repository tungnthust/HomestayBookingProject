package com.group4T.homestaybooking.HomestayBooking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class HomestayBookingApplication {

	public static void main(String[] args) {
		SpringApplication.run(HomestayBookingApplication.class, args);
	}

}
