package com.group4T.homestaybooking.HomestayBooking.model;

import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="token")
public class VerificationToken {
	@Id
	@GeneratedValue(strategy =  GenerationType.IDENTITY)
	private int id;
	private String token;
	@OneToOne(fetch = FetchType.LAZY)
	private User user;
	@Column(name = "expiryDate")
	private Instant expiryDate;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Instant getExpiryDate() {
		return expiryDate;
	}
	public void setExpiryDate(Instant expiryDate) {
		this.expiryDate = expiryDate;
	}
	public VerificationToken(int id, String token, User user, Instant expiryDate) {
		super();
		this.id = id;
		this.token = token;
		this.user = user;
		this.expiryDate = expiryDate;
	}
	public VerificationToken() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
