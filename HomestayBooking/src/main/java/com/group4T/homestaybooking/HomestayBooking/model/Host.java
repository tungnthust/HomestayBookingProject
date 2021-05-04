package com.group4T.homestaybooking.HomestayBooking.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "host")
public class Host {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@JoinColumn(name="user_id")
	@OneToOne(fetch = FetchType.LAZY)
	private User user_id;
	@Column(name="identity_card_num")
	private int identityCardNumber;
	@Column(name="date_issue")
	private Date dateIssue;
	@Column(name="identity_card_photo")
	private String identityCardPhoto;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public User getUser_id() {
		return user_id;
	}
	public void setUser_id(User user_id) {
		this.user_id = user_id;
	}
	public int getIdentityCardNumber() {
		return identityCardNumber;
	}
	public void setIdentityCardNumber(int identityCardNumber) {
		this.identityCardNumber = identityCardNumber;
	}
	public Date getDateIssue() {
		return dateIssue;
	}
	public void setDateIssue(Date dateIssue) {
		this.dateIssue = dateIssue;
	}
	public String getIdentityCardPhoto() {
		return identityCardPhoto;
	}
	public void setIdentityCardPhoto(String identityCardPhoto) {
		this.identityCardPhoto = identityCardPhoto;
	}
	public Host() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Host(int id, User user_id, int identityCardNumber, Date dateIssue, String identityCardPhoto) {
		super();
		this.id = id;
		this.user_id = user_id;
		this.identityCardNumber = identityCardNumber;
		this.dateIssue = dateIssue;
		this.identityCardPhoto = identityCardPhoto;
	}
	
	
}
