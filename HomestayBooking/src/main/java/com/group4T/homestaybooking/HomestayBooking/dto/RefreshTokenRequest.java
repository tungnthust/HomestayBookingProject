package com.group4T.homestaybooking.HomestayBooking.dto;

public class RefreshTokenRequest {
	private String refreshToken;
	private String username;
	public String getRefreshToken() {
		return refreshToken;
	}
	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public RefreshTokenRequest(String refreshToken, String username) {
		super();
		this.refreshToken = refreshToken;
		this.username = username;
	}
	public RefreshTokenRequest() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
