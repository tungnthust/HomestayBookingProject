package com.group4T.homestaybooking.HomestayBooking.controller;

import java.security.Principal;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.aspectj.weaver.patterns.IScope;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.group4T.homestaybooking.HomestayBooking.dto.AuthenticationResponse;
import com.group4T.homestaybooking.HomestayBooking.dto.LoginRequest;
import com.group4T.homestaybooking.HomestayBooking.dto.RefreshTokenRequest;
import com.group4T.homestaybooking.HomestayBooking.dto.RegisterRequest;
import com.group4T.homestaybooking.HomestayBooking.model.User;
import com.group4T.homestaybooking.HomestayBooking.service.AuthService;
import com.group4T.homestaybooking.HomestayBooking.service.RefreshTokenService;
import com.group4T.homestaybooking.HomestayBooking.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	@Autowired
	private AuthService authService;
	@Autowired
	private RefreshTokenService refreshTokenService;
	@Autowired
	private UserService userService;
	
	@PostMapping(value = "/signup")
	public ResponseEntity<String> registerUser(@RequestBody RegisterRequest registerRequest) {
		authService.signup(registerRequest);
		return new ResponseEntity<String>("User Registration Successfully", HttpStatus.OK);
	}
	
	@PostMapping(value = "/checkEmail")
	public boolean checkEmail(@RequestParam(name = "email") String email) {
		if (email.equals("") || email == null) {
			return false;
		}
		return authService.checkEmail(email);
	}
	
	@PostMapping(value = "/checkUsername")
	public boolean checkUsername(@RequestParam(name = "username") String username) {
		if (username.equals("") || username == null) {
			return false;
		}
		return authService.checkUsername(username);
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
	
//	@PostMapping("/logout")
//    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response, @Validated @RequestBody RefreshTokenRequest refreshTokenRequest) {
//        refreshTokenService.deleteRefreshToken(refreshTokenRequest.getRefreshToken());
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        if (auth != null){
//            new SecurityContextLogoutHandler().logout(request, response, auth);
//        }
//        return ResponseEntity.status(HttpStatus.OK).body("Refresh Token Deleted Successfully!!");
//    }
//	
	@GetMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null){
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return ResponseEntity.status(HttpStatus.OK).body("Log out successfully!");
    }
	
	@GetMapping(value = "/user")
    public Optional<User> currentUserName() {
		System.out.println("LOGIN");
		System.out.println(SecurityContextHolder.getContext());
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		System.out.println(authentication);
        return userService.getUserByUsername(authentication.getName());
    }
}
