package com.group4T.homestaybooking.HomestayBooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group4T.homestaybooking.HomestayBooking.model.PaymentMethod;

@Repository
public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Integer> {

	PaymentMethod findPaymentMethodById(int id);
}
