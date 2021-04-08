package com.group4T.homestaybooking.HomestayBooking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group4T.homestaybooking.HomestayBooking.dto.AuthenticationResponse;
import com.group4T.homestaybooking.HomestayBooking.dto.LoginRequest;
import com.group4T.homestaybooking.HomestayBooking.dto.RefreshTokenRequest;
import com.group4T.homestaybooking.HomestayBooking.dto.RegisterRequest;
import com.group4T.homestaybooking.HomestayBooking.service.AuthService;
import com.group4T.homestaybooking.HomestayBooking.service.RefreshTokenService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	@Autowired
	private AuthService authService;
	@Autowired
	private RefreshTokenService refreshTokenService;
	
	@PostMapping(value = "/signup")
	public ResponseEntity<String> registerUser(@RequestBody RegisterRequest registerRequest) {
		authService.signup(registerRequest);
		return new ResponseEntity<String>("User Registration Successfully", HttpStatus.OK);
	}
	
	@GetMapping(value = "accountVerification/{token}")
	public ResponseEntity<String> verifyAccount(@PathVariable String token) {
		authService.verifyAccount(token);
		return new ResponseEntity<>("Account Activated Successfully", HttpStatus.OK);
	}
		
	@PostMapping(value = "/login")
	public AuthenticationResponse login(@RequestBody LoginRequest loginRequest) {
		return authService.login(loginRequest);
	}
	
	@PostMapping(value = "refresh/token")
	public AuthenticationResponse refreshTokens(@Validated @RequestBody RefreshTokenRequest refreshTokenRequest) {
		return authService.refreshToken(refreshTokenRequest);
	}
	
	@PostMapping("/logout")
    public ResponseEntity<String> logout(@Validated @RequestBody RefreshTokenRequest refreshTokenRequest) {
        refreshTokenService.deleteRefreshToken(refreshTokenRequest.getRefreshToken());
        return ResponseEntity.status(HttpStatus.OK).body("Refresh Token Deleted Successfully!!");
    }
}
